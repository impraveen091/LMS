import {
  FlatList,
  StyleSheet,
  PermissionsAndroid,
  SafeAreaView,
  Button,
  Text,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  View,
  scrollEnabled,
} from 'react-native';
import React, {useEffect} from 'react';
import {lessonArray} from '../../../../api/constant';
import LessonComponent from '../../../../components/lessonComponent/LessonComponent';
import {moderateScale} from '../../../../common/constants';
import {colors, styles} from '../../../../themes';
import RNFetchBlob from 'rn-fetch-blob';
import CText from '../../../../components/common/CText';

const Content = ({pdfs}) => {
  const checkPermission = (pdf, name) => {
    let pdf_URL = pdf;
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
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show('File downloaded', ToastAndroid.LONG);
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  return (
    <SafeAreaView>
      {pdfs ? (
        <View>
          {pdfs?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <CText type={'b16'}>{item?.name}</CText>
                <TouchableOpacity
                  key={index}
                  style={localStyles.button}
                  onPress={() => checkPermission(item?.url, item?.name)}>
                  <CText style={{color: 'white', textAlign: 'center'}}>
                    Download Pdf
                  </CText>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      ) : (
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
              marginTop: 30,
              fontSize: 20,
            }}>
            No PDF exists
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Content;

const localStyles = StyleSheet.create({
  videoDetails: {
    ...styles.pv25,
    gap: moderateScale(25),
  },
  button: {
    width: '30%',
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 20,
  },
});
