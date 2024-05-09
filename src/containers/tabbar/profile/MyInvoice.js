import {
  StyleSheet,
  View,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getWidth} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {colors as themeColor, styles} from '../../../themes';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import moment from 'moment';
import CButton from '../../../components/common/CButton';
import {customRequest} from '../../../api/customRequest';
import {StackNav} from '../../../navigation/NavigationKeys';
import CHeader from '../../../components/common/CHeader';
import RNFetchBlob from 'rn-fetch-blob';
import LoginButton from '../../../components/common/LoginButton';
import LottieView from 'lottie-react-native';

const MyInvoice = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [invoiceData, setInvoiceData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const today = moment(new Date()).format('YYYY-MM-DD');
  console.log('today', today, typeof today);

  const tokenCheck = async () => {
    console.log('Token', await AsyncStorage.getItem('tokenStudent'));
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const invoiceApi = async () => {
    await customRequest('get-student-InvoiceList', 'GET').then(res => {
      console.log('invoiceApi', res);
      setInvoiceData(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      invoiceApi();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    invoiceApi();
    setRefreshing(false);
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadInvoice = async (id, name) => {
    await customRequest(`invoice/pdf/${id}`, 'GET').then(res => {
      console.log('invoicepsf', res);
      let pdf_URL = res?.message;
      console.log('pdfUrl', pdf_URL);
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
    });
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      {authenticated ? (
        <View>
          <CHeader
            title={'My Invoices'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                padding={10}
              />
            }>
            {invoiceData?.map((item, index) => {
              console.log('item', item);
              return (
                <View
                  key={index}
                  style={{
                    width: getWidth(357),
                    marginHorizontal: 10,
                    marginTop: 10,
                    padding: 10,
                    elevation: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      colors.backgroundColor == '#F8F9FA' ? 'white' : 'gray',
                    backgroundColor: colors.backgroundColor,
                  }}>
                  <View>
                    <CText type={'b16'} style={{fontWeight: 'bold'}}>
                      {item?.courses?.name}
                    </CText>

                    <CText type={'r14'}>
                      DOP:
                      <CText type={'b16'}>{item?.inv_date}</CText>
                    </CText>
                    <CText type={'r14'}>
                      Amount: ₹<CText type={'b16'}>{item?.total_amount}</CText>
                    </CText>
                  </View>

                  <TouchableOpacity
                    style={[localStyles.button, {marginVertical: 20}]}
                    onPress={() =>
                      downloadInvoice(item?.id, item?.courses?.name)
                    }>
                    <CText type={'m16'} color={'white'}>
                      Download
                    </CText>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 10,
              marginRight: 20,
            }}>
            <CHeader
              title={'My Invoices'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <LottieView
            source={require('../../../assets/lottie/login.json')}
            autoPlay // Start playing automatically
            loop // Repeat the animation
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }} // Adjust dimensions as needed
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default MyInvoice;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },

  submitButton: {
    ...styles.mt20,
    width: '30%',
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    width: getWidth(100),
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 6,
    elevation: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
