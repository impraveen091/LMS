import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ToastAndroid,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {
  THEME,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {
  Cross_Close_Icon,
  Dark_Mode,
  Light_Mode,
  Right_Arrow_Icon,
  Toggle_Off,
  Toggle_On,
  Cross_Close_Dark_Icon,
  CurrentAffairs,
  Course,
  Selections,
  Admission,
  DashboardDark,
  Dashboard,
  CourseDark,
  CurrentAffairsDark,
  SelectionsDark,
  AdmissionDark,
} from '../../../assets/svgs';
import CButton from '../../../components/common/CButton';
import LearningModel from '../../../components/homeComponent/LearningModel';
import CText from '../../../components/common/CText';
import strings from '../../../i18n/strings';
import {StackNav} from '../../../navigation/NavigationKeys';
import {customRequest} from '../../../api/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Drawer} from 'react-native-drawer-layout';
import {setAsyncStorageData} from '../../../utils/helpers';
import {changeThemeAction} from '../../../redux/action/themeAction';
import CategoryCourseCard from '../../../components/homeComponent/CategoryCourseCard';
import {useSelector, useDispatch} from 'react-redux';
import React, {createRef, useState, useRef, useEffect} from 'react';
import HomeHeader from '../../../components/homeComponent/HomeHeader';
import {colors as themeColor, styles} from '../../../themes';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import StatusFeed from './StatusFeed';
import CustomiseCourses from './screens/CustomiseCourses';
import Slider from './ImageSlider/Slider';

const HomeTab = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [pushNotification, setPushNotification] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [featureNews, setFeatureNews] = useState([]);
  const [statusFeed, setStatusFeed] = useState([]);

  const colors = useSelector(state => state.theme.theme);
  const learningSheetRef = createRef();

  const homeCourses = () => {
    customRequest('app/home/courses?limit=5', 'GET').then(res => {
      // console.log('HomeCourses', res);
      setCourses(res);
    });
  };

  const getCourseCategory = () => {
    customRequest('course-category/show-actives', 'GET').then(res => {
      // console.log('Category data', res);
      setCourseCategory(res);
    });
  };

  const getPopularCourse = () => {
    customRequest('app/home/courses_extra', 'GET').then(res => {
      // console.log('popular--', res);
      setPopularCategory(res);
    });
  };
  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const sliderData = () => {
    customRequest('student/slider/image', 'GET').then(res => {
      console.log('Slider', res);
      setFeatureNews(res);
    });
  };
  const getStatusFeed = async () => {
    if (authenticated) {
      const response = await customRequest('feeds/students', 'GET');
      // console.log('statusFeed1', response);
      setStatusFeed(response?.message);
    } else {
      setStatusFeed([]);
    }
  };

  const handleChild = child => {
    console.log('Child1', child);
    getStatusFeed();
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      getCourseCategory();
      homeCourses();
      getPopularCourse();
      sliderData();
      getStatusFeed();
    }
  }, [isFocused, authenticated]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    getCourseCategory();
    homeCourses();
    getPopularCourse();
    sliderData();
    getStatusFeed();
    setRefreshing(false);
  };

  const onPressLearningPath = () => {
    learningSheetRef?.current.show();
  };

  const onPressSeeAllCategory = data => {
    // console.log('CategoryData', courseCategory?.message);
    navigation.navigate(StackNav.CourseCat, {
      courseCategory: data,
    });
  };

  const CategoryHeader = props => {
    return (
      <View style={localStyles.categoryHeader}>
        <CText type={'B16'} style={{fontWeight: 'bold'}}>
          {props.title}
        </CText>
        <TouchableOpacity
          onPress={() =>
            onPressSeeAllCategory(
              props.title == 'Categories' ? courseCategory?.message : courses,
            )
          }>
          <CText type={'s16'} color={colors.primary}>
            {strings.seeAll}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  // drawer
  const [openSetting, setOpenSetting] = useState(false);
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
          style={localStyles1.settingList}
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
        <TouchableOpacity style={localStyles1.header} onPress={onPressClose}>
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
                    ? require('../../../assets/images/male.jpg')
                    : {uri: image}
                }
                style={[localStyles1.drawerProfileImage]}
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
                source={require('../../../assets/images/male.jpg')}
                style={[localStyles1.drawerProfileImage]}
              />
              <CText type="s16" align="center" style={styles.ml20}>
                ChahalAcademy
              </CText>
            </TouchableOpacity>
          )}
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
                        ? require('../../../assets/images/male.jpg')
                        : {uri: image}
                      : require('../../../assets/images/male.jpg')
                  }
                  resizeMode="cover"
                  style={{width: getWidth(375), height: getWidth(375)}}
                />
              </View>
            </View>
          </Modal>
        </View>
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
          <View style={localStyles1.logOutBtnContainer}>
            <CButton
              title={authenticated ? strings.logout : 'Login'}
              type="s16"
              onPress={() => {
                authenticated ? logOut() : navigation.navigate(StackNav.Auth);
              }}
              bgColor={colors.primary}
              containerStyle={localStyles1.logOutBtn}
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
      <CSafeAreaView style={localStyles.root}>
        <HomeHeader
          clearData={() => {
            setStatusFeed(null);
          }}
          onPressMenu={() => {
            openCloseSettingModal();
            ProfileImage();
          }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {statusFeed?.length == 0 ? null : (
            <View style={{marginBottom: 10, marginTop: 10}}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginLeft: 10}}>
                {statusFeed?.length &&
                  statusFeed?.map((item, index) => {
                    return (
                      <StatusFeed renderData={item} onChildData={handleChild} />
                    );
                  })}
              </ScrollView>
            </View>
          )}
          <View
            style={
              authenticated
                ? {marginBottom: 10}
                : {marginBottom: 10, marginTop: 10}
            }>
            <Slider data={featureNews} />
          </View>

          <View style={styles.flex}>
            <View style={styles.mh10}>
              {courses?.length > 0 && <CategoryHeader title={'Courses'} />}

              <View style={{flexDirection: 'row'}}>
                {courses?.length > 0 &&
                  courses?.slice(0, 2).map((data, index) => {
                    return (
                      <CategoryCourseCard
                        key={index}
                        name={'courses'}
                        item={data}
                        onPressCard={() =>
                          navigation.navigate(StackNav.CourseCategory, {
                            id: data?.id,
                          })
                        }
                      />
                    );
                  })}
              </View>
            </View>

            <View style={styles.mh10}>
              <CustomiseCourses popularCategory={popularCategory} name="home" />
            </View>
          </View>
        </ScrollView>
        <LearningModel SheetRef={learningSheetRef} />
      </CSafeAreaView>
    </Drawer>
  );
};

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#23a6fe',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white', // Customize the color
    textAlign: 'center',
  },
  root: {
    ...styles.flex,
  },
  bannerContainer: {
    width: '100%',
    height: getHeight(190),
    resizeMode: 'contain',
  },
  btnContainerStyle: {
    ...styles.mh15,
    width: '100%',
    height: getHeight(48),
    ...styles.rowSpaceBetween,
    ...styles.ph25,
  },
  btnContainer: {
    position: 'absolute',
    bottom: moderateScale(15),
    width: deviceWidth - moderateScale(70),
  },
  categoryHeader: {
    ...styles.rowSpaceBetween,
    ...styles.mt25,
    ...styles.mb10,
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  categoryItmMainContainer: {
    width: moderateScale(85),
    ...styles.itemsCenter,
    ...styles.mr10,
    ...styles.mt15,
  },
  recommendedContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mh20,
    ...styles.mt25,
  },
  cardImage: {
    height: getHeight(144),
    borderRadius: moderateScale(16),
    width: '100%',
    resizeMode: 'cover',
  },
});

const localStyles1 = StyleSheet.create({
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
    width: '85%',
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
  svgs: {
    viewBox: '0 0 24 24',
    fill: 'white',
    stroke: 'white',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
});

export default HomeTab;
