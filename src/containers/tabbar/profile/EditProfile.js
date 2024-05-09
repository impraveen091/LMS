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
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  THEME,
  deviceWidth,
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
import {Cross_Close_Dark_Icon, Cross_Close_Icon} from '../../../assets/svgs';

const EditProfile = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [date, setDate] = useState(new Date());
  const [inputFieldDate, setInputFieldDate] = useState('');
  const [listOpen, setListOpen] = useState(false);
  const [formValue, setFormValue] = useState('0');
  const [userID, setUserID] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const ProfileImage = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    console.log('token:::', token);
    if (token === null) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
    const user = await AsyncStorage.getItem('user');
    const userId = await AsyncStorage.getItem('userid');
    const userPic = await AsyncStorage.getItem('userPic');
    const userMail = await AsyncStorage.getItem('userMail');
    const userDOB = await AsyncStorage.getItem('userDOB');
    const gender = await AsyncStorage.getItem('gender');
    const phone = await AsyncStorage.getItem('phone');
    console.log('gender:::', phone);
    setImage(JSON.parse(userPic));
    setName(JSON.parse(user));
    setEmail(JSON.parse(userMail));
    setInputFieldDate(JSON.parse(userDOB));
    setUserID(JSON.parse(userId));
    setFormValue(JSON.parse(gender));
    console.log('Image', userPic);
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      ProfileImage();
    }
  }, [isFocused]);

  useEffect(() => {
    var modifieddate = date;
    var newDate = moment(modifieddate).format('YYYY-MM-DD');
    setInputFieldDate(newDate);
  }, [date]);

  const profilePhoto = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
      });
      console.log(doc[0]);
      const base64 = await RNFS.readFile(doc[0].uri, 'base64');
      const data = `data:${doc[0].type};base64,${base64}`;
      const response = await customRequest(
        'student/userprofile-image-app',
        'POST',
        {image: data, userId: userID},
      );
      console.log('DocResponse', response);
      {
        response?.success &&
          ToastAndroid.show('Image updated', ToastAndroid.SHORT);
      }
      setImage(response?.url);
      await AsyncStorage.setItem('userPic', JSON.stringify(response?.url));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) console.log('User Side Cancel', err);
      else {
        console.log(err);
      }
    }
  };
  const validateEmail = email => {
    return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  };

  const removePhoto = async () => {
    try {
      const response = await customRequest('remove-profile', 'GET');
      console.log('ProfilePhoto:::::', response);
      {
        response?.success &&
          ToastAndroid.show('Image removed', ToastAndroid.SHORT);
      }
      AsyncStorage.removeItem('userPic');
      setImage('');
    } catch (error) {
      Alert.alert('Error while logging in:', error.response?.data?.message);
    }
  };
  const onPressGetStarted = async () => {
    try {
      const request = {
        name: name,
        email: email,
        gender: formValue,
        dob: inputFieldDate,
        userId: userID,
      };

      const response = await customRequest(
        'student/edit-user-profile-save',
        'POST',
        request,
      );
      console.log('responseFromProfileUpdateScreen:::::', response);
      if (response.success) {
        ToastAndroid.show('Updated', ToastAndroid.SHORT);
        await AsyncStorage.setItem('user', JSON.stringify(name));
        await AsyncStorage.setItem('userDOB', JSON.stringify(inputFieldDate));
        await AsyncStorage.setItem('userMail', JSON.stringify(email));
        await AsyncStorage.setItem(
          'genderimpraveen',
          JSON.stringify(formValue),
        );
      }
    } catch (error) {
      console.error('Error while logging in:', error.response?.data?.message);
      Alert.alert('Error while logging in:', error.response?.data?.message);
    }
  };

  const formValidation = () => {
    if (name.length <= 5) {
      setNameError('Please Enter Valid Full Name');

      return;
    } else if (!validateEmail(email)) {
      setEmailError('Please Enter a Valid Email');

      return;
    } else {
      console.log('Validation done');
      onPressGetStarted();
    }
  };

  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          style={[localStyles.root, {backgroundColor: colors.backgroundColor}]}>
          <Image
            resizeMode="cover"
            source={MyProfile.cover_image}
            style={localStyles.profileCover}
          />

          <View
            style={[
              localStyles.container,
              {backgroundColor: colors.backgroundColor},
            ]}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                resizeMode="contain"
                source={
                  image == '' || image == null
                    ? require('../../../assets/images/male.jpg')
                    : {uri: image}
                }
                style={[localStyles.profileImage, {borderColor: colors.white}]}
              />
            </TouchableOpacity>
            <View>
              <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <TouchableOpacity
                      style={{alignSelf: 'flex-end'}}
                      onPress={() => setModalVisible(!modalVisible)}>
                      {colors.dark == 'dark' ? (
                        <Cross_Close_Dark_Icon
                          width={moderateScale(25)}
                          height={moderateScale(25)}
                        />
                      ) : (
                        <Cross_Close_Icon
                          width={moderateScale(25)}
                          height={moderateScale(25)}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      source={
                        image == '' || image == null
                          ? require('../../../assets/images/male.jpg')
                          : {uri: image}
                      }
                      resizeMode="cover"
                      style={{width: getWidth(375), height: getWidth(375)}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity
                        style={localStyles.button}
                        onPress={() => profilePhoto()}>
                        <CText type={'m16'} color={'white'}>
                          Update Image
                        </CText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={localStyles.button}
                        onPress={() => removePhoto()}>
                        <CText type={'m16'} color={'white'}>
                          Remove Image
                        </CText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View style={localStyles.innerContainer}>
              <View style={styles.mt30}>
                <CInput
                  required
                  label={'Name'}
                  placeHolder={strings.name}
                  _value={
                    name == undefined || name == null
                      ? MyProfile.full_name
                      : name.replace(/"/g, '')
                  }
                  maxLength={35}
                  toGetTextFieldValue={text => setName(text)}
                  inputContainerStyle={[{backgroundColor: colors.inputBg}]}
                  labelStyle={styles.ml20}
                  inputBoxStyle={styles.ml15}
                />
                {nameError && <CText style={{color: 'red'}}>{nameError}</CText>}
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
                {emailError && (
                  <CText style={{color: 'red'}}>{emailError}</CText>
                )}

                <View style={{paddingTop: 10}}>
                  <CText
                    type={'r18'}
                    style={[
                      styles.ml20,
                      {
                        marginBottom: 5,
                        fontWeight: 600,
                        fontFamily: 'Urbanist-Regular',
                        fontSize: 16,
                      },
                    ]}>
                    Date of Birth
                  </CText>
                  <View
                    style={{
                      backgroundColor: colors.inputBg,
                      flexDirection: 'row',
                      borderRadius: 30,
                      padding: 10,
                      height: 50,
                    }}>
                    <View>
                      <CText
                        type={'r16'}
                        style={[styles.ml20, {marginTop: 5, fontSize: 16}]}>
                        {inputFieldDate}
                      </CText>
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
                          source={require('../../../assets/images/calendar.png')}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* <Button title="Open" /> */}
                    <DatePicker
                      style={{color: colors.primary}}
                      textColor={colors.primary}
                      modal
                      minimumDate={new Date('1980-01-01')}
                      maximumDate={new Date('2010-01-01')}
                      mode="date"
                      open={open}
                      date={date}
                      theme="light"
                      onConfirm={date => {
                        setOpen(false);
                        setDate(date);
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
                  <CText
                    type={'r16'}
                    style={[
                      styles.ml20,
                      {
                        marginBottom: 5,
                        fontWeight: 600,
                        fontFamily: 'Urbanist-Regular',
                        fontSize: 16,
                        textAlign: 'left',
                      },
                    ]}>
                    Gender
                  </CText>
                  <DropDownPicker
                    style={{
                      backgroundColor: colors.inputBg,
                      borderRadius: 30,
                      borderColor: colors.inputBg,
                      width: getWidth(350),
                    }}
                    // style={{backgroundColor: colors.inputBg}}
                    dropDownContainerStyle={{
                      width: Dimensions.get('window').width - 70,
                      marginTop: 20,
                      zIndex: 1000,
                      backgroundColor: 'white',
                      borderRadius: 30,
                      borderColor: 'white',
                    }}
                    placeholder="Select your gender"
                    placeholderStyle={{color: colors.grey}}
                    onFocus={() => setFocusedInput(5)}
                    onBlur={() => setFocusedInput(0)}
                    open={listOpen}
                    setOpen={itemValue => setListOpen(itemValue)}
                    items={[
                      {label: 'Male', value: '0'},
                      {label: 'Female', value: '1'},
                      {label: 'Other', value: '2'},
                    ]}
                    value={formValue}
                    setValue={item => setFormValue(item())}
                  />
                </View>
              </View>
              <CButton
                title={'Update Profile'}
                containerStyle={localStyles.submitButton}
                type={'M18'}
                onPress={formValidation}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CText type={'r20'}>Login Required</CText>
          <CButton
            title={'Login'}
            containerStyle={localStyles.submitButton}
            type={'M18'}
            onPress={() => navigation.navigate(StackNav.Auth)}
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default EditProfile;

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
  button: {
    width: getWidth(130),
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 6,
    elevation: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
