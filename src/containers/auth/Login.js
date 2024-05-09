import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Image,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {styles} from '../../themes';
import {
  CloseEye_Icon,
  Facebook_Icon,
  Google_Icon,
  Logo_Icon,
  OpenEye_Icon,
} from '../../assets/svgs';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../common/constants';
import CInput from '../../components/common/CInput';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import CButton from '../../components/common/CButton';
// import {useNavigation} from '@react-navigation/native';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';
import {Login_URL} from '../../api/Url';
import axios from '../../api/axios';
import CheckBox from '@react-native-community/checkbox';

const Login = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  // const navigation = useNavigation();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isSelected, setSelection] = useState(false);

  // const onChangedPhoneNo = text => setContact(text);
  const onPressGetStarted = async () => {
    console.log('data', contact, password);
    try {
      const request = {
        email: contact,
        password: password,
      };

      // setIsLoading(true);
      const response = await axios.post(Login_URL, request, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      // setIsLoading(false);
      console.log('response:::::', response.data);
      if (response && response.data) {
        const user = response.data.user;
        const token = response?.data?.token;
        const passwordReset = response.data.password_reset;

        if (user) {
          console.log('UserID & UserName', response.data.user.id, user?.name);
          await AsyncStorage.setItem(
            'userid',
            JSON.stringify(response?.data?.user?.id),
          );
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(response?.data?.user?.name),
          );
          await AsyncStorage.setItem(
            'userPic',
            JSON.stringify(response?.data?.profile_img),
          );
          await AsyncStorage.setItem(
            'userDOB',
            JSON.stringify(response?.data?.user?.dob),
          );
          await AsyncStorage.setItem(
            'userMail',
            JSON.stringify(response?.data?.user?.email),
          );
          await AsyncStorage.setItem(
            'gender',
            JSON.stringify(response?.data?.user?.gender),
          );
          await AsyncStorage.setItem(
            'phone',
            JSON.stringify(response?.data?.user?.phone),
          );
        }

        if (passwordReset === '0') {
          navigation.navigate('PasswordReset');
        } else {
          if (token) {
            console.log('userToken:::::::::::::::::', token);
            await AsyncStorage.setItem('tokenStudent', token);
            ToastAndroid.show('Signed In Successully.', ToastAndroid.LONG);
            // navigation.navigate(StackNav.TabBar);
            navigation.goBack();
          }
        }
      }
    } catch (error) {
      // setIsLoading(false);

      console.error('Error while logging in:', error.response?.data?.message);
      Alert.alert('Error while logging in:', error.response?.data?.message);
      if (error.response?.status == 401) {
        Alert.alert('Error', error.response?.data?.message);
      } else if (error.response?.status == 422) {
        Alert.alert('Error', error.response?.data?.message);
      } else if (error.response?.status == 403) {
        Alert.alert('Error 403', error.response?.data?.errors);
      }
    }
  };

  // const onPressGetStarted = () => {
  //   console.log('credentials', contact, password);
  //   navigation.navigate(TabNav.HomeTab);
  // };

  return (
    <CSafeAreaView style={localStyles.mainContainer}>
      <CKeyBoardAvoidWrapper containerStyle={styles.ph20}>
        <View style={localStyles.titleContainer}>
          <Logo_Icon
            style={localStyles.logo}
            width={moderateScale(250)}
            height={moderateScale(100)}
          />
          <CText type={'B24'} align={'center'} style={styles.mt30}>
            {strings.signinTitle}
          </CText>
          <CText
            type={'R14'}
            align={'center'}
            style={styles.mt15}
            color={colors.textColor2}>
            {strings.signinSubtitle}
          </CText>
        </View>
        <View style={styles.mt30}>
          <CInput
            required
            label={'Email or Phone Number'}
            placeHolder={strings.contact}
            _value={contact}
            toGetTextFieldValue={text => setContact(text)}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
        </View>
        <View
          style={[
            styles.mt0,
            {
              flexDirection: 'row',
              alignItems: 'center',
              height: getHeight(70),
              width: getWidth(193),
              marginBottom: 20,
            },
          ]}>
          <CInput
            required
            label={'Password'}
            placeHolder={strings.enterYourPassword}
            _value={password}
            maxLength={30}
            toGetTextFieldValue={text => setPassword(text)}
            secureTextEntry={passwordVisible}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? (
              <CloseEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: getHeight(40),
                  marginLeft: -getWidth(40),
                }}
              />
            ) : (
              <OpenEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: getHeight(40),
                  marginLeft: -getWidth(40),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              style={{marginRight: 1}}
              tintColors={{true: "'#368098'", false: '#505050'}}
              onCheckColor="#000"
              value={isSelected}
              onValueChange={setSelection}
            />
            <Text style={{color: colors.labelText, fontSize: 13}}>
              Remember Me
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <View>
              <Text style={{color: colors.labelText, fontSize: 13}}>
                Forgot Password?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <CButton
          title={strings.loginNow}
          containerStyle={localStyles.submitButton}
          type={'M18'}
          color={colors.white}
          onPress={onPressGetStarted}
        />
        <View style={styles.rowCenter}>
          <CText
            type={'R14'}
            align={'center'}
            style={styles.mt15}
            color={colors.textColor2}>
            {strings.noAccount}
          </CText>
          <TouchableOpacity
            onPress={() => navigation.navigate(StackNav.SignUp)}>
            <CText
              type={'B14'}
              align={'center'}
              style={styles.mt15}
              color={colors.textSpecial}>
              Sign Up
            </CText>
          </TouchableOpacity>
        </View>
        {/* <View style={localStyles.socialContainer}>
          <CButton
            title={strings.facebook}
            type={'M16'}
            color={colors.textColor}
            frontIcon={
              <Facebook_Icon
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            }
            containerStyle={localStyles.socialButton}
            bgColor={colors.socialButtonBackground}
            style={styles.ml10}
            // onPress={onPressRightArrow}
          />
          <CButton
            title={strings.google}
            type={'M16'}
            color={colors.textColor}
            frontIcon={
              <Google_Icon
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            }
            containerStyle={localStyles.socialButton}
            bgColor={colors.socialButtonBackground}
            style={styles.ml10}
            // onPress={onPressRightArrow}
          />
        </View> */}
      </CKeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
  },
  titleContainer: {
    marginTop: getHeight(50),
  },
  logo: {
    ...styles.selfCenter,
  },
  submitButton: {
    ...styles.mt50,
  },
  socialContainer: {
    ...styles.mt40,
    ...styles.rowSpaceBetween,
  },
  socialButton: {
    width: moderateScale(156),
    //shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 0.5,
  },
});

export default Login;
