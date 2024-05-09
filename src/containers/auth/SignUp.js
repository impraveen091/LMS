import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../themes';
import {
  Facebook_Icon,
  Google_Icon,
  Logo_Icon,
  calender,
  openeye_icon,
  closeeye_icon,
  CloseEye_Icon,
  OpenEye_Icon,
} from '../../assets/svgs';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import {getHeight, getWidth, moderateScale} from '../../common/constants';
import CInput from '../../components/common/CInput';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import CButton from '../../components/common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from '../../api/axios';
import {Signup_URL} from '../../api/Url';
import NetInfo from '@react-native-community/netinfo';
import {customRequest} from '../../api/customRequest';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  // const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [date, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState('');
  const [inputFieldDate, setInputFieldDate] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [formValue, setFormValue] = useState('0');

  // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validateEmail = email => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const onPressGetStarted = async () => {
    try {
      const request = {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        phone: phone,
        gender: formValue,
        dob: newDate,
      };

      await customRequest(Signup_URL, 'POST', request).then(response => {
        console.log('signUpResponse', response);
        if (response.user.password_reset == '1') {
          navigation.navigate(StackNav.Login);
          ToastAndroid.show('Sign Up Successfull', ToastAndroid.SHORT);
        }
      });
    } catch (error) {
      console.error('Error while logging in:', error.response?.data?.message);
      Alert.alert('Error while logging in:', error.response?.data?.message);
    }
  };

  const checkConnection = () => {
    NetInfo.fetch().then(({isConnected}) => {
      if (isConnected) {
        onPressGetStarted();
      } else {
        Alert.alert('No internet Connection');
      }
    });
  };

  const formValidation = () => {
    if (name.length < 3) {
      setNameError('Please Enter Your Name Correctly');

      return;
    } else if (phone.length < 10) {
      setPhoneError('Please provide a valid number');

      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please Enter a Valid Email');

      return;
    } else if (password.length < 8) {
      setPasswordError('Password must contain minimum 8 characters');
      console.log('valdation password');
      return;
    } else {
      console.log('Validation done');
      checkConnection();
    }
  };

  const listData = [
    {label: 'Male', value: '0'},
    {label: 'Female', value: '1'},
    {label: 'Other', value: '2'},
  ];

  useEffect(() => {
    var modifieddate = date;
    var newDate = moment(modifieddate).format('YYYY-MM-DD');
    var inputFieldDate = moment(modifieddate).format('DD-MM-YYYY');
    setNewDate(newDate);
    setInputFieldDate(inputFieldDate);
  }, [date]);

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
            {strings.signupTitle}
          </CText>
          <CText
            type={'R14'}
            align={'center'}
            style={styles.mt15}
            color={colors.textColor2}>
            {strings.signupSubTitle}
          </CText>
        </View>
        <View style={styles.mt30}>
          <CInput
            required
            label={'Name'}
            placeHolder={strings.name}
            _value={name}
            maxLength={35}
            toGetTextFieldValue={text => {
              setName(text);
              console.log('name', name);
            }}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          {nameError && <CText style={{color: 'red'}}>{nameError}</CText>}
          <CInput
            required
            label={'Phone Number'}
            placeHolder={strings.phoneNumber}
            _value={phone}
            keyboardType="numeric"
            maxLength={10}
            toGetTextFieldValue={text => {
              setPhone(text);
              console.log('phone', phone);
            }}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          {phoneError && <CText style={{color: 'red'}}>{phoneError}</CText>}

          <View style={{paddingTop: 10}}>
            <Text
              style={[
                styles.ml20,
                {
                  marginBottom: 5,
                  fontWeight: 600,
                  fontFamily: 'Urbanist-Regular',
                  fontSize: 16,
                  color: '#43536B',
                },
              ]}>
              Date of Birth
            </Text>
            <View
              style={{
                backgroundColor: colors.inputBg,
                flexDirection: 'row',
                borderRadius: 30,
                padding: 10,
                height: 50,
              }}>
              <View>
                <Text
                  style={[
                    styles.ml20,
                    {marginTop: 5, fontSize: 16, color: 'black'},
                  ]}>
                  {inputFieldDate}
                </Text>
              </View>

              <View>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: 50,
                      width: 50,
                      justifyContent: 'flex-end',
                      marginLeft: Dimensions.get('window').width - 250,
                      marginTop: -10,
                    }}
                    source={require('../../assets/images/calendar.png')}
                  />
                </TouchableOpacity>
              </View>

              {/* <Button title="Open" /> */}
              <DatePicker
                style={{color: colors.primary}}
                textColor={colors.primary}
                modal
                minimumDate={new Date('1980-01-01')}
                maximumDate={new Date('2011-01-01')}
                mode="date"
                open={open}
                date={date}
                theme="light"
                onConfirm={date => {
                  setOpen(false);
                  setDate(date);
                  // setDate({moment(date).format('DD MMM YYYY')})
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
          <View
            style={{
              padding: 10,
              height: 50,
              marginTop: 10,
              marginBottom: 30,
            }}>
            <Text
              style={[
                styles.ml20,
                {
                  marginBottom: 5,
                  fontWeight: 600,
                  fontFamily: 'Urbanist-Regular',
                  fontSize: 16,
                  textAlign: 'left',
                  color: '#43536B',
                },
              ]}>
              Gender
            </Text>
            <DropDownPicker
              style={{
                backgroundColor: colors.inputBg,
                borderRadius: 30,
                borderColor: colors.inputBg,
              }}
              // style={{backgroundColor: colors.inputBg}}
              dropDownContainerStyle={{
                width: Dimensions.get('window').width - 70,
                marginTop: 20,
                zIndex: 1,
                backgroundColor: colors.inputBg,
                borderRadius: 30,
                borderColor: colors.inputBg,
              }}
              placeholder="Select your gender"
              placeholderStyle={{color: colors.grey}}
              onFocus={() => setFocusedInput(5)}
              onBlur={() => setFocusedInput(0)}
              open={listOpen}
              setOpen={itemValue => setListOpen(itemValue)}
              items={listData}
              value={formValue}
              setValue={item => setFormValue(item())}
            />
          </View>
          <CInput
            required
            label={'Email'}
            placeHolder={strings.email}
            _value={email}
            toGetTextFieldValue={text => {
              setEmail(text);
              console.log('email', email);
            }}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          {emailError && <CText style={{color: 'red'}}>{emailError}</CText>}
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
              secureTextEntry={passwordVisible}
              toGetTextFieldValue={text => setPassword(text)}
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

            {passwordError < 6 && (
              <CText style={{color: 'red'}}>{passwordError}</CText>
            )}
          </View>
          <View
            style={[
              styles.mt0,
              {
                flexDirection: 'row',
                alignItems: 'center',
                height: getHeight(70),
                width: getWidth(193),
              },
            ]}>
            <CInput
              required
              label={'Confirm Password'}
              placeHolder={strings.enterYourPassword}
              _value={confirmPassword}
              maxLength={30}
              secureTextEntry={confirmPasswordVisible}
              toGetTextFieldValue={text => setConfirmPassword(text)}
              inputContainerStyle={[{backgroundColor: colors.inputBg}]}
              labelStyle={styles.ml20}
              inputBoxStyle={styles.ml15}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                setConfirmPasswordVisible(!confirmPasswordVisible)
              }>
              {confirmPasswordVisible ? (
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

          {confirmPassword !== password && (
            <CText style={{color: 'red'}}>Passwords do not match</CText>
          )}
        </View>

        <CButton
          title={strings.signupNow}
          containerStyle={localStyles.submitButton}
          type={'M18'}
          onPress={formValidation}
        />
        <View style={styles.rowCenter}>
          <CText
            type={'R14'}
            align={'center'}
            style={styles.mt15}
            color={colors.textColor2}>
            {strings.haveAccount}
          </CText>
          <TouchableOpacity onPress={() => navigation.navigate(StackNav.Login)}>
            <CText
              type={'B14'}
              align={'center'}
              style={styles.mt15}
              color={colors.textSpecial}>
              Login
            </CText>
          </TouchableOpacity>
        </View>
      </CKeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
    paddingBottom: 10,
  },
  titleContainer: {
    marginTop: getHeight(64),
  },
  logo: {
    ...styles.selfCenter,
  },
  submitButton: {
    ...styles.mt40,
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

export default SignUp;
