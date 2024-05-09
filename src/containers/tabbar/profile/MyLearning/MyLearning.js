import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {colors, styles} from '../../../../themes';
import CText from '../../../../components/common/CText';
import CardListHorizontal from '../../../../components/homeComponent/CardListHorizontal';
import {Achievements, MyLearningCourse} from '../../../../api/constant';
import MyLearningCardList from '../../../../components/CommonComponent/MyLearningCardList';
import {StackNav} from '../../../../navigation/NavigationKeys';
import strings from '../../../../i18n/strings';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import {customRequest} from '../../../../api/customRequest';
import CHeader from '../../../../components/common/CHeader';
import LoginButton from '../../../../components/common/LoginButton';
import LottieView from 'lottie-react-native';
import {getWidth, noDataImage} from '../../../../common/constants';
import CourseCard from '../../../../components/homeComponent/CourseCard';

const MyLearning = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [myAchievements, setMyAchievements] = useState(
    Achievements.slice(0, 2),
  );
  const [myDownload, setMyDownload] = useState(MyLearningCourse.slice(0, 2));
  const [authenticated, setAuthenticated] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [data, setData] = useState([]);
  const [courseData, setCourseData] = useState(0);
  const [videoData, setVideoData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };
  const subscriptionApi = () => {
    customRequest('student/my-subscriptions', 'GET').then(res => {
      console.log('subscriptionApi', res[0]);
      setSubscriptionData(res);
    });
  };

  const courseDataApi = () => {
    customRequest('user-course-complete', 'GET').then(res => {
      console.log('courseDataApi', res);
      setVideoData(res?.videos);
      setTestData(res?.tests);
    });
  };

  const average = index => {
    if (testData == undefined || videoData == undefined) {
      Alert.alert('Data is not coming');
      return 0;
    } else {
      let test = 0;
      let video = 0;
      test = testData[index]?.attempt / testData[index]?.total;
      video = videoData[index]?.attempt / videoData[index]?.total;
      console.log('Average', (test + video) / 2);
      return (test + video) / 2;
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      subscriptionApi();
      courseDataApi();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    subscriptionApi();
    courseDataApi();
    setRefreshing(false);
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      {authenticated ? (
        <View>
          <CHeader
            title={'My Learning'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{
              marginBottom: 70,
              flexDirection: 'row',
              flexWrap: 'wrap',
              backgroundColor: colors.backgroundColor,
            }}>
            {subscriptionData.length > 0 ? (
              subscriptionData?.map((item, index) => {
                console.log('itemSub', item);
                return (
                  <CourseCard
                    key={index}
                    item={item}
                    title={item?.Course?.name}
                    showProgress={average(index).toFixed(2)}
                  />
                );
              })
            ) : (
              <Image
                style={{
                  width: getWidth(355),
                  aspectRatio: 1,
                  marginTop: getWidth(100),
                }}
                source={{uri: noDataImage}}
              />
            )}
          </ScrollView>
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
              title={'My Learning'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <LottieView
            source={require('../../../../assets/lottie/login.json')}
            autoPlay // Start playing automatically
            loop // Repeat the animation
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }} // Adjust dimensions as needed
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default MyLearning;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph10,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
