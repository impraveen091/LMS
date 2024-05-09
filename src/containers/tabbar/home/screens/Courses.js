import {View, StyleSheet, FlatList, Image, RefreshControl} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import {styles} from '../../../../themes';
import CHeader from '../../../../components/common/CHeader';
import strings from '../../../../i18n/strings';
import {useSelector} from 'react-redux';
import {getHeight, getWidth, moderateScale} from '../../../../common/constants';
import {Search_Icon} from '../../../../assets/svgs';
import CInput from '../../../../components/common/CInput';
import CourseCard from '../../../../components/CommonComponent/CourseCard';
import {StackNav} from '../../../../navigation/NavigationKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../../../api/customRequest';
import LoginButton from '../../../../components/common/LoginButton';

const Courses = ({route}) => {
  // console.log('previous', route.params.title, route.params.data);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const title = route.params.title;
  const data = route.params.data;
  const [courseList, setCourseList] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCourse, setSearchCourse] = useState('');
  let courseSlug = '';
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const getVideoList = async () => {
    if (authenticated) {
      customRequest(`student/videos/${route.params.data.id}`, 'GET').then(
        res => {
          // console.log('auth Data', res);
          setCourseList(res);
        },
      );
    } else {
      customRequest(
        `student/universalcourseshowlist/${route.params.data.id}`,
        'GET',
      ).then(res => {
        // console.log('unAuth Data', res);
        setOpenData(res);
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      getVideoList();
    }
  }, [isFocused, authenticated]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    getVideoList();
    setRefreshing(false);
  };

  const renderCategoryItem = (item, index) => {
    return <CourseCard item={item} index={index} courseSlug={courseSlug} />;
  };

  // const navigateToCourseDetail = () => {
  //   navigation.navigate(StackNav.SubjectVideos, { BtnTitle: strings.enrollNow });
  // };

  return (
    <CSafeAreaView style={localStyles.root}>
      {authenticated ? (
        <View>
          <CHeader
            title={title}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          {courseList.map((data, index) => {
            courseSlug = data.courseSlug;
            return (
              <FlatList
                data={data?.sub}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => renderCategoryItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  gap: moderateScale(10),
                  // ...styles.pv10,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            );
          })}
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
              title={title}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          {openData.map((data, index) => {
            courseSlug = data.courseSlug;
            return (
              <FlatList
                data={data?.sub}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => renderCategoryItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{
                  gap: moderateScale(25),
                  ...styles.pv25,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            );
          })}
        </View>
      )}
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    ...styles.p15,
    ...styles.mh25,
    ...styles.mb25,
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  cardImage: {
    height: getHeight(88),
    borderRadius: moderateScale(12),
    width: getWidth(96),
    resizeMode: 'cover',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});

export default Courses;
