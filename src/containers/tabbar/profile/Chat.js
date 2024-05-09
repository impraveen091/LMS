import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  Alert,
  ToastAndroid,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  THEME,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {MyProfile} from '../../../api/constant';
import CText from '../../../components/common/CText';
import {colors as themeColor, styles} from '../../../themes';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import CButton from '../../../components/common/CButton';
import {customRequest} from '../../../api/customRequest';
import {Document} from 'react-native-render-html';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {StackNav} from '../../../navigation/NavigationKeys';
import CHeader from '../../../components/common/CHeader';
import {encode, decode} from 'base-64';
import WebView from 'react-native-webview';
import LoginButton from '../../../components/common/LoginButton';
import LottieView from 'lottie-react-native';

const Chat = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [teacherListData, setTeacherListData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const base64String = encode(token);

  const tokenCheck = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    console.log('token', token);
    setToken(token);
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  // const teacherListApi = () => {
  //   customRequest('student/teacher/list', 'GET').then(res => {
  //     console.log('teacherListApi', res);
  //     setTeacherListData(res);
  //   });
  // };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);

  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        <WebView
          source={{
            uri: `https://lmsvideos.chahalacademy.com/student/teacher_list?data=${base64String}`,
          }}
        />
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
              title={'My Chat'}
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

export default Chat;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  container: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    top: moderateScale(-30),
  },
  profileCover: {
    width: '100%',
    height: moderateScale(170),
  },

  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: moderateScale(2),
    top: moderateScale(-50),
    ...styles.selfCenter,
    position: 'absolute',
  },
  innerContainer: {
    ...styles.pl10,
    ...styles.pr10,
  },

  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
