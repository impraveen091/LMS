import {useSelector} from 'react-redux';
// custom imports
import {styles} from '../../themes';
import {
  Logo_Icon,
  NotificationDark,
  NotificationLight,
  App_drawer,
} from '../../assets/svgs';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {MyProfile} from '../../api/constant';
// import strings from '../../i18n/strings';

import {
  Cross_Close_Dark_Icon,
  Cross_Close_Icon,
  Dark_Mode,
  Help_Dark,
  Help_Light,
  Light_Mode,
  Notification_Dark_2,
  Notification_Light_2,
  Right_Arrow_Icon,
  Security_Dark,
  Security_Light,
  Setting_Dark,
  Setting_Light,
  Toggle_Off,
  Toggle_On,
} from '../../assets/svgs';
import CButton from '../../components/common/CButton';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {customRequest} from '../../api/customRequest';
function HomeHeader({clearData, onPressMenu}) {
  const isFocused = useIsFocused();
  const [openSetting, setOpenSetting] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();
  const [tokenStudent, setTokenStudent] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const colors = useSelector(state => state.theme.theme);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const onPressNotification = () => {
    navigation.navigate(StackNav.Notification);
  };

  const onPressProfile = () => {
    navigation.navigate(TabNav.ProfileTab);
  };

  const onPressClose = () => {
    setOpenSetting(false);
  };

  const navigateTo = path => {
    navigation.navigate(path);
  };

  const notificationOnOff = () => {
    setPushNotification(!pushNotification);
  };

  const onPressLightTheme = () => {
    setAsyncStorageData(THEME, 'light');
    dispatch(changeThemeAction(themeColor.light));
  };

  const onPressDarkTheme = () => {
    setAsyncStorageData(THEME, 'dark');
    dispatch(changeThemeAction(themeColor.dark));
  };

  const toggleSwitch = () => {
    if (colors?.dark == 'dark') {
      onPressLightTheme();
    } else {
      onPressDarkTheme();
    }
  };

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('tokenStudent');
  //     console.log('value::::::::::::::::: ', value);
  //     if (value) {
  //       setIsLoggedIn(true);
  //       setTokenStudent(value);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log('errr:::::', e);
  //   }
  // };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      // getData();
    }
  }, [isFocused]);

  const logOut = async () => {
    await AsyncStorage.removeItem('tokenStudent');
    ToastAndroid.show('Logout Successully.', ToastAndroid.LONG);
    setAuthenticated(false);
    clearData();
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
          <View style={styles.flexRow}>
            {colors.dark == 'dark' ? darkIcon : lightIcon}
            <CText type="m14" color={colors.textColor} style={styles.ml20}>
              {label}
            </CText>
          </View>
          {endIcon}
        </TouchableOpacity>
      </View>
    );
  };

  const toggleDrawer = () => {
    console.log('12346782346');
    onPressMenu();
  };

  return (
    <View style={localStyles.headerContainer}>
      <TouchableOpacity>
        <View style={{height: 50, width: 70}}>
          <Image
            source={
              colors.backgroundColor == '#F8F9FA'
                ? require('../../assets/chahalWhite.png')
                : require('../../assets/chahalDark.png')
            }
            style={localStyles.logo}
          />
        </View>
      </TouchableOpacity>
      <View style={{marginLeft: 135}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            authenticated ? logOut() : navigation.navigate(StackNav.Auth);
          }}
          style={{marginLeft: 'auto'}}>
          <LinearGradient
            colors={['#5F5CF0', '#5F5CF0']}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}
            style={{
              backgroundColor: '#23a6fe',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white', fontWeight: '500'}}>
              {authenticated ? 'Logout' : 'Login'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={[styles.rowCenter, {marginHorizontal: 0}]}>
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}
          // style={styles.mh5}
        >
          {colors.dark ? (
            <Image
              style={{width: moderateScale(50), height: moderateScale(50)}}
              source={require('../../assets/svgs/icon_navigation.png')}
            />
          ) : (
            <Image
              style={{width: moderateScale(50), height: moderateScale(50)}}
              source={require('../../assets/svgs/icon_navigation.png')}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(HomeHeader);

const localStyles = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mh10,
    // ...styles.mt5,
  },
  userImageStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    ...styles.mh10,
    ...styles.flex,
  },
  logo: {
    // ...styles.selfCenter,
    // marginBottom: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // paddingVertical: 50,
    // paddingHorizontal: 50,
    height: 60,
    width: 120,
  },
});
