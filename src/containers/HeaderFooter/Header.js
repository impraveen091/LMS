import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Drawer} from 'react-native-drawer-layout';
import {changeThemeAction} from '../../redux/action/themeAction';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {colors as themeColor, styles} from '../../themes';
import {THEME, getWidth, moderateScale} from '../../common/constants';
import HomeHeader from '../../components/homeComponent/HomeHeader';
import {
  Cross_Close_Icon,
  Dark_Mode,
  Light_Mode,
  Notification_Dark_2,
  Notification_Light_2,
  Right_Arrow_Icon,
  Setting_Dark,
  Setting_Light,
  Toggle_Off,
  Toggle_On,
  Cross_Close_Dark_Icon,
  Help_Dark,
  Help_Light,
  About,
  CurrentAffairs,
  Course,
  Selections,
  Admission,
  DashboardDark,
  CourseDark,
  AdmissionDark,
  SelectionsDark,
  CurrentAffairsDark,
} from '../../assets/svgs';
import CText from '../../components/common/CText';
import {StackNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';
import {customRequest} from '../../api/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAsyncStorageData} from '../../utils/helpers';
import WebView from 'react-native-webview';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import Dashboard from '../../assets/svgs/dashboard.svg';

const Header = ({webLink}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const colors = useSelector(state => state.theme.theme);
  const [pushNotification, setPushNotification] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };
  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused, authenticated]);

  const notificationOnOff = () => {
    setPushNotification(!pushNotification);
  };
  const toggleSwitch = () => {
    if (colors?.dark == 'dark') {
      onPressLightTheme();
    } else {
      onPressDarkTheme();
    }
  };

  const onPressLightTheme = () => {
    setAsyncStorageData(THEME, 'light');
    dispatch(changeThemeAction(themeColor.light));
  };

  const onPressDarkTheme = () => {
    setAsyncStorageData(THEME, 'dark');
    dispatch(changeThemeAction(themeColor.dark));
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('tokenStudent');
    ToastAndroid.show('Logout Successully.', ToastAndroid.LONG);
    navigation.replace(StackNav.Auth);
  };

  const Menu = ({
    darkIcon,
    lightIcon,
    label,
    endIcon,
    onPress,
    navigate,
    path,
  }) => {
    return (
      <View style={styles.mt20}>
        <TouchableOpacity
          style={localStyles.settingList}
          onPress={
            navigate
              ? () => {
                  navigate(path);
                }
              : onPress
          }>
          <View style={[styles.flexRow, {alignItems: 'center'}]}>
            <View style={{height: 25, width: 25}}>
              {colors.dark == 'dark' ? darkIcon : lightIcon}
            </View>
            <CText type="m14" color={colors.textColor} style={styles.ml20}>
              {label}
            </CText>
          </View>
          {endIcon}
        </TouchableOpacity>
      </View>
    );
  };

  const onPressClose = () => {
    setOpenSetting(false);
  };

  const navigateTo = path => {
    navigation.navigate(path);
  };

  const openCloseSettingModal = () => {
    setOpenSetting(!openSetting);
  };
  const ProfileImage = async () => {
    const user = await AsyncStorage.getItem('user');
    const userPic = await AsyncStorage.getItem('userPic');
    setImage(JSON.parse(userPic));
    setUsername(JSON.parse(user));
  };
  const DrawerComponent = () => {
    return (
      <View style={styles.ph15}>
        <TouchableOpacity style={localStyles.header} onPress={onPressClose}>
          {colors.dark == 'dark' ? (
            <Cross_Close_Dark_Icon
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          ) : (
            <Cross_Close_Icon
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          )}
        </TouchableOpacity>

        <View style={[styles.itemsCenter, styles.flexRow]}>
          {authenticated ? (
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setModalVisible(true)}>
              <Image
                resizeMode="cover"
                source={
                  image == '' || image == null
                    ? require('../../assets/images/male.jpg')
                    : {uri: image}
                }
                style={[localStyles.drawerProfileImage]}
              />
              <CText type="s16" align="center" style={styles.ml20}>
                {username?.replace(/"/g, '')}
              </CText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                resizeMode="cover"
                source={require('../../assets/images/male.jpg')}
                style={[localStyles.drawerProfileImage]}
              />
              <CText type="s16" align="center" style={styles.ml20}>
                ChahalAcademy
              </CText>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          // transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
                  authenticated
                    ? image == '' || image == null
                      ? require('../../assets/images/male.jpg')
                      : {uri: image}
                    : require('../../assets/images/male.jpg')
                }
                resizeMode="cover"
                style={{width: getWidth(375), height: getWidth(375)}}
              />
            </View>
          </View>
        </Modal>

        <ScrollView
          style={{marginBottom: 120}}
          showsVerticalScrollIndicator={false}>
          <Menu
            label={'Dashboard'}
            darkIcon={<DashboardDark />}
            lightIcon={<Dashboard />}
            endIcon={<Right_Arrow_Icon />}
            navigate={navigateTo}
            path={StackNav.Dashboard}
          />
          <Menu
            label={'UPSC-CSE'}
            darkIcon={<CourseDark />}
            lightIcon={<Course />}
            endIcon={<Right_Arrow_Icon />}
            navigate={navigateTo}
            path={StackNav.UPSC_CSE}
          />
          <Menu
            label={strings.CurrentAffairs}
            darkIcon={<CurrentAffairsDark />}
            lightIcon={<CurrentAffairs />}
            endIcon={<Right_Arrow_Icon />}
            navigate={navigateTo}
            path={StackNav.CurrentAffairs}
          />
          <Menu
            label={strings.Selections}
            darkIcon={<SelectionsDark />}
            lightIcon={<Selections />}
            endIcon={<Right_Arrow_Icon />}
            navigate={navigateTo}
            path={StackNav.SelectionScreen}
          />
          <Menu
            label={strings.Admission}
            darkIcon={<AdmissionDark />}
            lightIcon={<Admission />}
            endIcon={<Right_Arrow_Icon />}
            navigate={navigateTo}
            path={StackNav.Admission}
          />
          {/* <Menu
                label={strings.settingsAndPrivacy}
                darkIcon={<Setting_Dark />}
                lightIcon={<Setting_Light />}
                endIcon={<Right_Arrow_Icon />}
              />
              <Menu
                label={strings.helpAndSupport}
                darkIcon={<Help_Dark />}
                lightIcon={<Help_Light />}
                endIcon={<Right_Arrow_Icon />}
              />
              <Menu
                label={strings.About}
                darkIcon={<About />}
                lightIcon={<About />}
                endIcon={<Right_Arrow_Icon />}
              />
              <Menu
                label={strings.pushNotifications}
                darkIcon={<Notification_Dark_2 />}
                lightIcon={<Notification_Light_2 />}
                endIcon={pushNotification ? <Toggle_On /> : <Toggle_Off />}
                onPress={notificationOnOff}
              /> */}
          <Menu
            label={strings.darkMode}
            darkIcon={<Light_Mode />}
            lightIcon={<Dark_Mode />}
            endIcon={colors.dark == 'dark' ? <Toggle_On /> : <Toggle_Off />}
            onPress={toggleSwitch}
          />
          <View style={localStyles.logOutBtnContainer}>
            <CButton
              title={authenticated ? strings.logout : 'Login'}
              type="s16"
              onPress={() => {
                authenticated ? logOut() : navigation.navigate(StackNav.Auth);
              }}
              bgColor={colors.primary}
              containerStyle={localStyles.logOutBtn}
            />
          </View>
          <View style={{alignContent: 'center'}}>
            <CText type={'R12'}>App version: 1.0.0(beta)</CText>
            <CText type={'R12'}>Made with ❤️ in India</CText>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <Drawer
      drawerStyle={[
        localStyles.drawerStyle,
        {backgroundColor: colors.backgroundColor},
      ]}
      open={openSetting}
      onOpen={() => setOpenSetting(true)}
      onClose={() => setOpenSetting(false)}
      drawerType="front"
      renderDrawerContent={DrawerComponent}>
      <CSafeAreaView style={{flex: 1}}>
        <HomeHeader
          clearData={() => {
            setStatusFeed(null);
          }}
          onPressMenu={() => {
            openCloseSettingModal();
            ProfileImage();
          }}
        />

        <WebView source={{uri: webLink + '?data=app'}} />
      </CSafeAreaView>
    </Drawer>
  );
};

export default Header;

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
  absoluteTopRight: {
    position: 'absolute',
    top: moderateScale(20),
    right: moderateScale(20),
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
    ...styles.mt50,
    ...styles.pt10,
  },
  infoContainer: {
    ...styles.mt10,
    ...styles.rowSpaceAround,
  },
  list: {
    ...styles.mh25,
    ...styles.mv10,
    borderRadius: moderateScale(50),
    ...styles.p5,
  },
  tabItem: {
    borderRadius: moderateScale(50),
    ...styles.flex,
    ...styles.itemsCenter,
    ...styles.pv10,
  },
  modalStyle: {
    ...styles.flex,
  },
  drawerStyle: {
    width: '70%',
    borderTopRightRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
  },
  header: {
    ...styles.mv10,
    ...styles.rowEnd,
  },
  drawerProfileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  settingList: {
    ...styles.rowSpaceBetween,
  },
  logOutBtnContainer: {
    ...styles.mt20,
    ...styles.pv15,
  },
  logOutBtn: {
    width: '70%',
    height: moderateScale(48),
  },
});
