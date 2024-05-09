import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {getWidth} from '../../../common/constants';
import CText from '../../../components/common/CText';
import Base64 from 'react-native-base64';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNav} from '../../../navigation/NavigationKeys';
import {customRequest} from '../../../api/customRequest';
import axios from '../../../api/axios';
import {TextEncoder} from 'text-encoding';
import {sha256} from 'react-native-sha256';
import {encode as base64Encode} from 'base-64';
import axiosdata from 'axios';
import WebView from 'react-native-webview';
import RNFetchBlob from 'rn-fetch-blob';

const Payment = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [initialize, setinitialize] = useState('');
  const [mechantTId, setMerchantTId] = useState('');
  const environment = 'PRODUCTION';
  const appId = 'null';
  const merchantId = 'CHAHALPGONLINE';
  const isDebuggingEnabled = true;
  const apiEndPoint = '/pg/v1/pay';
  const salt = '698ed8ad-baa6-4890-8efb-fe21a8e9c797';
  const saltIndex = 1;
  const packageName = 'null';
  const appSchema = 'null';

  // console.log('MTID', mechantTId);

  // Phonepe Initialization
  useEffect(() => {
    (async () => {
      try {
        const response = await PhonePePaymentSDK.init(
          environment,
          appId,
          merchantId,
          isDebuggingEnabled,
        );
        console.log('initilised Response', response);
        setinitialize(response);
      } catch (err) {
        console.log('could not initialize', err);
      }
    })();
  }, []);

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadInvoice = async (pdf, name) => {
    let pdf_URL = pdf;
    // console.log('pdfUrl', pdf_URL);
    let ext = getExtention(pdf_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PdfDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PdfDir + `/${name}.pdf`,
        // '/lms' +
        // '.pdf',
        description: 'pdf',
      },
    };
    config(options)
      .fetch('GET', pdf_URL)
      .then(res => {
        console.log('res -> ', res);
        ToastAndroid.show('File downloaded', ToastAndroid.LONG);
      });
  };

  const backendCall = async (
    amount,
    transactionId,
    merchantId,
    status,
    courseId,
  ) => {
    let userid = await AsyncStorage.getItem('userid');
    // console.log(
    //   'BackendData',
    //   amount,
    //   transactionId,
    //   merchantId,
    //   status,
    //   courseId,
    //   userid,
    // );
    const body = {
      transactionId: transactionId,
      merchantTransactionId: merchantId,
      amount: amount,
      course_id: courseId,
      user_id: userid,
      payment_status: status,
    };
    try {
      const response = await customRequest(
        'transaction/payment/redirect',
        'POST',
        body,
      );
      console.log('backendresponse', response);
      if (response.status == 'sucess') {
        downloadInvoice(response.url, response.name);
      }
      return;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  };

  // Api for checking transaction Status
  const checkTransactionStatusApi = async id => {
    const merchantId = 'CHAHALPGONLINE';
    // console.log('merchantTid', id, 'salt', salt);
    const dataToCheck = await sha256(
      `/pg/v1/status/${merchantId}/${id}${salt}`,
    );

    const dataToCheckStatus = dataToCheck + '###' + saltIndex;
    // console.log('dataCheck', dataToCheck, dataToCheckStatus);
    try {
      const response = await axios.get(
        `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': dataToCheckStatus,
            'X-MERCHANT-ID': 'PGTESTPAYUAT',
          },
        },
      );
      // console.log('axiosCall', response?.data);
      backendCall(
        response?.data.data.amount,
        response?.data.data.transactionId,
        response?.data.data.merchantTransactionId,
        response?.data.data.state,
        route.params?.id,
      );
    } catch (error) {
      console.error('Axios error:', error);
    }
  };

  // function for merchantTransationId
  const generateMerchantTransactionId = () => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
    const idLength = 15; // Maximum length allowed for merchantTransactionId
    let merchantTransactionId = '';

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      merchantTransactionId += characters.charAt(randomIndex);
    }
    setMerchantTId(merchantTransactionId);
    return merchantTransactionId;
  };

  //Payment Transaction
  const paymentData = async (amount, courseid) => {
    let userid = await AsyncStorage.getItem('userid');
    if (initialize) {
      const body = {
        merchantId: 'CHAHALPGONLINE',
        merchantTransactionId: generateMerchantTransactionId(),
        merchantUserId: '698ed8ad-baa6-4890-8efb-fe21a8e9c797',
        amount: +(amount * 100),
        redirectUrl: `https://lmscode.chahalacademy.com/api/transaction/redirect?course=${courseid}&user=${userid}`,
        redirectMode: 'POST',
        callbackUrl: `https://lmscode.chahalacademy.com/api/transaction/redirect?course=${courseid}&user=${userid}`,
        mobileNumber: '8826776149',
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };

      const base64String = Base64.encode(JSON.stringify(body));

      await sha256(base64String + apiEndPoint + salt).then(hash => {
        const checkSum = hash + '###' + saltIndex;

        PhonePePaymentSDK.startTransaction(
          base64String,
          checkSum,
          packageName,
          appSchema,
        )
          .then(transactionResponse => {
            console.log(
              'Transaction initiated successfully:',
              transactionResponse,
            );
            checkTransactionStatusApi(body?.merchantTransactionId);
            // Handle successful transaction response (e.g., display confirmation message)
          })
          .catch(error => {
            console.error('Error initiating transaction:', error);
            // Handle transaction error (e.g., display error message to user)
          });
      });
    }
  };

  return (
    <CSafeAreaView
      style={{
        flex: 1,
        padding: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: getWidth(355),
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          elevation: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Image
          style={{width: 100, aspectRatio: 1}}
          source={{uri: route.params.detail?.image}}
        />
        <View
          style={{justifyContent: 'flex-start', width: '70%', marginLeft: 20}}>
          <CText type={'r16'}>course: {route.params.detail?.name}</CText>
          <CText type={'r16'}>amount: ₹{route.params.detail?.amount}</CText>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: getWidth(355),
          backgroundColor: '#5F5CF0',
          padding: 10,
          borderRadius: 10,
          elevation: 5,
          marginTop: 50,
        }}
        onPress={() =>
          paymentData(route.params.detail?.amount, route.params.detail?.id)
        }>
        <CText type={'m16'} style={{alignSelf: 'center', color: 'white'}}>
          Pay Now
        </CText>
      </TouchableOpacity>
    </CSafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
