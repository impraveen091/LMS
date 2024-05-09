import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Logo_Icon} from '../../assets/svgs';
import React, {useState, useEffect} from 'react';
import {CHANGEPASSWORD} from '../../api/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {getHeight, moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import CText from '../../components/common/CText';
import axios from '../../api/axios';
import typography from '../../themes/typography';
import CButton from '../../components/common/CButton';
import {useSelector} from 'react-redux';

export default function PasswordReset({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [passwordError, setpasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(true);

  const [tokenStudent, setTokenStudent] = useState('');

  const [userId, setUserId] = useState('');

  const token = AsyncStorage.getItem('tokenStudent');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');
      const value2 = await AsyncStorage.getItem('tokenStudent');
      console.log('value::::::::::::::::: ', value, value2);
      setUserId(value);
      setTokenStudent(value2);
    } catch (e) {
      // error reading value
    }
  };

  const config = {
    headers: {Authorization: `Bearer ${tokenStudent}`},
  };

  const changePass = async () => {
    formValidation();

    const values = {
      password: password,
      new_password: confirmPassword,
    };
    try {
      const response = await axios.put(`${CHANGEPASSWORD}/${userId}`, values, {
        config,
      });
      Alert.alert('Success', 'Password Changed', [
        {
          text: 'Okay',
          onPress: () => {
            navigation.navigate('Login');
          },
          style: 'cancel',
        },
      ]);
    } catch (error) {
      console.log(error?.response?.data?.message);
      if (error.response?.status == 422) {
        Alert.alert('Error', error?.response?.data?.message);
      }
      if (error.response?.status == 403) {
        Alert.alert('Error 403', error?.response?.data?.errors);
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

  const formValidation = () => {
    if (!validatePassword()) {
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
    <ScrollView>
      <View>
        <View>
          <View style={{paddingTop: 150}}>
            <Logo_Icon
              style={s.logo}
              width={moderateScale(250)}
              height={moderateScale(100)}
            />
            <View
              style={[styles.flexRow, {paddingHorizontal: moderateScale(20)}]}>
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
              style={[styles.flexRow, {paddingHorizontal: moderateScale(20)}]}>
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
                secureTextEntry={confirmPasswordVisible}
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
                    confirmPasswordVisible
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
        <CButton
          title={'Continue'}
          containerStyle={s.submitButton}
          type={'M18'}
          color={colors.white}
          onPress={() => {
            changePass();
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
    ...styles.mt20,
    // marginHorizontal: 20,
    width: '100%',
  },
  inputBox: {
    paddingHorizontal: moderateScale(25),
    ...typography.fontSizes.f16,
    ...typography.fontWeights.Regular,
    // ...styles.ph20,
    ...styles.flex,
    color: '#000000',
  },
  labelText: {
    textAlign: 'left',
    opacity: 0.9,
  },
  submitButton: {
    ...styles.mt40,
    ...styles.mh25,
  },
  logo: {
    ...styles.selfCenter,
    marginBottom: 100,
  },
});
