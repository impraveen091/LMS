import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../api/axios';
import {SENDEMAIL} from '../../api/Url';
import {colors, styles} from '../../themes';
import CInput from '../../components/common/CInput';
import {useSelector} from 'react-redux';
import CButton from '../../components/common/CButton';
import CText from '../../components/common/CText';
import typography from '../../themes/typography';
import {getHeight, moderateScale} from '../../common/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../navigation/NavigationKeys';

export default function ForgotPassword({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [passwordError, setpasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const [otp, setOtp] = useState('');
  const [otpVisible, setOtpVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [compVisible, setCompVisible] = useState(false);

  const sendEmail = async () => {
    if (!email) {
      setEmailError('Please Enter Email');
      return;
    }

    try {
      const response = await axios.post(
        SENDEMAIL,
        {email: email},
        {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        },
      );
      console.log('FPResponce::1', response);
      if (response.status == 200) {
        setCompVisible(true);

        Alert.alert('Success', response?.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status == 403) {
        Alert.alert('Error', error?.response);
      }
    }
  };

  const changePass = async () => {
    formValidation();
    const values = {
      otp: otp,
      password: password,
      confirm_password: confirmPassword,
    };
    try {
      const response = await axios.put(`${SENDEMAIL}`, values, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      console.log('FPResponce::2', response);
      Alert.alert('Success', 'Password Changed', [
        {
          text: 'Okay',
          onPress: () => {
            navigation.navigate('Login');
          },
          style: 'cancel',
        },
      ]);
    } catch (err) {
      console.log(err);
      if (err.response?.status == 403) {
        Alert.alert('Error', err.response?.data?.errors);
      }
    }
  };

  const validatePassword = () => {
    try {
      return password?.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      );
    } catch (err) {
      Alert.alert(err);
    }
  };

  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const formValidation = () => {
    if (!email) {
      setEmailError('Please Enter Email');
      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please Enter a Valid Email');
      return;
    } else if (!validatePassword()) {
      setpasswordError(true);
      return;
    }
    checkConnection();
  };

  const checkConnection = () => {
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        // signupUser();
      } else {
        Alert.alert('No internet Connection');
        // setShowModal(true);
      }
    });
  };
  return (
    <ScrollView style={styles.ph20}>
      <View>
        <View>
          <Text style={s.logintextbold}>Please Change Password</Text>
          <Text style={s.logintextsmall}>
            Create a new password for your account
          </Text>
        </View>

        <View style={styles.mt30}>
          <CInput
            required
            label={'Enter e-mail'}
            placeHolder={'Enter e-mail'}
            _value={email}
            toGetTextFieldValue={text => setEmail(text)}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
        </View>

        {compVisible && (
          <View style={{}}>
            <View style={{paddingTop: 10}}>
              <View style={{}}>
                <CInput
                  required
                  label={'Please Enter OTP'}
                  placeHolder={'OTP'}
                  _value={otp}
                  toGetTextFieldValue={text => setOtp(text)}
                  inputContainerStyle={[{backgroundColor: colors.inputBg}]}
                  labelStyle={styles.ml20}
                  inputBoxStyle={styles.ml15}
                />
              </View>
            </View>

            <View style={{paddingTop: 10}}>
              <View
                style={[
                  styles.flexRow,
                  {paddingHorizontal: moderateScale(20)},
                ]}>
                <CText
                  style={[s.labelText]}
                  type={'m14'}
                  color={colors.labelText}>
                  Enter new password
                </CText>
                <CText style={{color: colors.error}}>{' *'}</CText>
              </View>
              <View
                style={[
                  s.inputContainer,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.inputBg,
                    borderRadius: getHeight(25),
                    height: getHeight(50),
                    // backgroundColor: 'red',
                  },
                ]}>
                <TextInput
                  style={s.inputBox}
                  placeholderTextColor={'#D4D6DB'}
                  placeholder="New Password"
                  secureTextEntry={passwordVisible}
                  value={password}
                  onChangeText={value => {
                    [setpasswordError(false), setPassword(value)];
                  }}
                />

                <TouchableOpacity
                  style={{marginHorizontal: 15}}
                  activeOpacity={0.9}
                  onPress={() => setPasswordVisible(!passwordVisible)}>
                  <Image
                    resizeMode="contain"
                    source={
                      passwordVisible
                        ? require('../../assets/images/eye.png')
                        : require('../../assets/images/eyeClosed.png')
                    }
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {passwordError ? (
              <Text style={{color: colors.error}}>
                Password must contain minimum 8 characters, at least 1 letter, 1
                number and 1 special character.
              </Text>
            ) : null}

            <View style={{paddingTop: 20}}>
              <View
                style={[
                  styles.flexRow,
                  {paddingHorizontal: moderateScale(20)},
                ]}>
                <CText
                  style={[s.labelText]}
                  type={'m14'}
                  color={colors.labelText}>
                  Enter Confirm password
                </CText>
                <CText style={{color: colors.error}}>{' *'}</CText>
              </View>
              <View
                style={[
                  s.inputContainer,
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.inputBg,
                    borderRadius: getHeight(25),
                    height: getHeight(50),
                    // backgroundColor: 'red',
                  },
                ]}>
                <TextInput
                  style={s.inputBox}
                  placeholderTextColor={'#D4D6DB'}
                  placeholder="Confirm Password"
                  secureTextEntry={passwordVisible}
                  value={confirmPassword}
                  onChangeText={value => {
                    [setpasswordError(false), setConfirmPassword(value)];
                  }}
                />

                <TouchableOpacity
                  style={{marginHorizontal: 15}}
                  activeOpacity={0.9}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }>
                  <Image
                    resizeMode="contain"
                    source={
                      passwordVisible
                        ? require('../../assets/images/eye.png')
                        : require('../../assets/images/eyeClosed.png')
                    }
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {passwordError ? (
              <Text style={{color: colors.error}}>
                Password must contain minimum 8 characters, at least 1 letter, 1
                number and 1 special character.
              </Text>
            ) : null}
          </View>
        )}

        <CButton
          title={'Continue'}
          containerStyle={s.submitButton}
          type={'M18'}
          color={colors.white}
          onPress={() => {
            compVisible === false ? sendEmail() : changePass();
          }}
        />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  inputContainer: {
    borderRadius: moderateScale(100),
    ...styles.rowSpaceBetween,
    ...styles.mt5,
    width: '100%',
  },
  inputBox: {
    paddingLeft: moderateScale(25),
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    ...styles.ph10,
    ...styles.flex,
    color: '#000000',
  },
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  logintextbold: {
    // fontFamily: boldFontFamily,
    color: 'black',
    fontSize: 24,
    // marginHorizontal: 30,
    marginTop: 60,
  },

  submitButton: {
    ...styles.mt40,
  },
  input: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    height: 60,
    // fontFamily: primaryFontFamily,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    height: 20,
    width: 20,
    tintColor: '#505050',
    // marginLeft: 220,
    justifyContent: 'flex-end',
  },
  lockicon: {
    height: 20,
    width: 20,
    tintColor: '#505050',
    // marginRight: ,
  },
  emailicon: {
    height: 20,
    width: 20,
    tintColor: '#505050',
  },
  signin: {
    marginTop: 30,
    // backgroundColor: '#0961F5',
    // borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 20,
  },
  logo: {
    // height: height / 10,
    width: 1,
    alignSelf: 'center',
    marginTop: 60,
  },
  //   logintextbold: {
  //     // fontFamily: boldFontFamily,
  //     color: 'black',
  //     fontSize: 24,
  //     marginHorizontal: 30,
  //     marginTop: 60,
  //   },
  logintextsmall: {
    // fontFamily: primaryFontFamily,
    color: 'black',
    fontSize: 14,
    // marginHorizontal: 30,
    marginTop: 10,
  },
  focusedInput: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    height: 60,
    // fontFamily: primaryFontFamily,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    height: 60,
    // fontFamily: primaryFontFamily,
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    height: 20,
    width: 20,
    tintColor: '#505050',
    // marginLeft: 220,
    justifyContent: 'flex-end',
  },
  lockicon: {
    height: 20,
    width: 20,
    tintColor: '#505050',
    // marginRight: ,
  },
  emailicon: {
    height: 20,
    width: 20,
    tintColor: '#505050',
  },
  signin: {
    marginTop: 30,
    // backgroundColor: '#0961F5',
    // borderRadius: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 20,
  },
});
