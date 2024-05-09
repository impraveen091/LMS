import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {colors as themeColor, styles} from '../../../themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {customRequest} from '../../../api/customRequest';
import CHeader from '../../../components/common/CHeader';
import LoginButton from '../../../components/common/LoginButton';
import CText from '../../../components/common/CText';
import {StackNav} from '../../../navigation/NavigationKeys';
import {useIsFocused} from '@react-navigation/native';
import {
  Course,
  Cross_Close_Dark_Icon,
  Cross_Close_Icon,
} from '../../../assets/svgs';
import Chat from '../../../assets/svgs/Chat.svg';
import Correct from '../../../assets/svgs/correctAnswer.svg';
import EditProfile from '../../../assets/svgs/profile.svg';

const ProfileTab = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const isFocused = useIsFocused();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const Profile = async () => {
    const user = await AsyncStorage.getItem('user');
    const userPic = await AsyncStorage.getItem('userPic');
    setImage(JSON.parse(userPic));
    setName(JSON.parse(user));
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      Profile();
    }
  }, [isFocused]);

  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        <View>
          <CHeader
            title={'Profile Detail'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />

          <View>
            <View
              style={{
                width: getWidth(190),
                height: getWidth(190),
                backgroundColor: '#5F5CF0',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: getWidth(190),
              }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  resizeMode="contain"
                  source={
                    image == '' || image == null
                      ? require('../../../assets/images/male.jpg')
                      : {uri: image}
                  }
                  style={[
                    localStyles.profileImage,
                    {borderColor: colors.white},
                  ]}
                />
              </TouchableOpacity>
              <CText
                type="l16"
                align="center"
                style={{fontWeight: '600', color: 'white'}}>
                {name}
              </CText>
            </View>
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
                  </View>
                </View>
              </Modal>
            </View>
            <View style={{marginHorizontal: 10}}>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.EditProfile)}>
                <View style={localStyles.icon}>
                  <EditProfile height={23} width={23} />
                  <CText
                    type={'m16'}
                    style={{alignSelf: 'center', color: 'white'}}>
                    Edit Profile
                  </CText>
                </View>
              </TouchableOpacity>

              <CText type={'m16'} style={{alignSelf: 'center', marginTop: 20}}>
                -----MyLearning-----
              </CText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MySubscription)}>
                  <View style={localStyles.icon}>
                    <Course height={25} width={25} style={localStyles.svgs} />
                    <CText
                      type={'m16'}
                      style={{alignSelf: 'center', color: 'white'}}>
                      My Courses
                    </CText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MyInvoice)}>
                  <CText
                    type={'m16'}
                    style={{alignSelf: 'center', color: 'white'}}>
                    My Invoices
                  </CText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MyLearning)}>
                  <View style={localStyles.icon}>
                    <Correct height={25} width={25} style={localStyles.svgs} />
                    <CText
                      type={'m16'}
                      style={{alignSelf: 'center', color: 'white'}}>
                      My Learning
                    </CText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.Chat)}>
                  <View style={localStyles.icon}>
                    <Chat height={25} width={25} />
                    <CText
                      type={'m16'}
                      style={{alignSelf: 'center', color: 'white'}}>
                      My Chat
                    </CText>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
              title={'Profile Detail'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <View
            style={{
              width: getWidth(190),
              height: getWidth(190),
              backgroundColor: '#5F5CF0',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: getWidth(190),
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/male.jpg')}
              style={[
                localStyles.profileImage,
                {borderColor: colors.white, marginTop: 0},
              ]}
            />
          </View>
          <View style={{marginHorizontal: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MySubscription)}>
                <View style={localStyles.icon}>
                  <Course height={25} width={25} style={localStyles.svgs} />
                  <CText
                    type={'m16'}
                    style={{alignSelf: 'center'}}
                    color={'white'}>
                    My Courses
                  </CText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MyInvoice)}>
                <CText
                  type={'m16'}
                  style={{alignSelf: 'center'}}
                  color={'white'}>
                  My Invoices
                </CText>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MyLearning)}>
                <View style={localStyles.icon}>
                  <Correct height={25} width={25} style={localStyles.svgs} />
                  <CText
                    type={'m16'}
                    style={{alignSelf: 'center'}}
                    color={'white'}>
                    My learning
                  </CText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.Chat)}>
                <View style={localStyles.icon}>
                  <Chat height={25} width={25} />
                  <CText
                    type={'m16'}
                    style={{alignSelf: 'center'}}
                    color={'white'}>
                    My Chat
                  </CText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </CSafeAreaView>
  );
};

export default ProfileTab;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  profileCover: {
    width: '100%',
    height: moderateScale(170),
  },

  profileImage: {
    width: moderateScale(130),
    height: moderateScale(130),
    borderRadius: moderateScale(70),
    borderWidth: moderateScale(2),
    ...styles.selfCenter,
    marginTop: -20,
  },
  innerContainer: {
    ...styles.pl10,
    ...styles.pr10,
  },
  Buttons: {
    width: getWidth(155),
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 6,
    elevation: 4,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5F5CF0',
  },
  svgs: {
    viewBox: '0 0 24 24',
    fill: '#5F5CF0',
    stroke: 'white',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
