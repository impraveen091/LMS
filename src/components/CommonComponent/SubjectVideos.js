import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../themes';
import {useSelector} from 'react-redux';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../common/constants';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import CText from '../common/CText';
import {Right_Arrow_Icon, Star_Icon_Filled, User_Icon} from '../../assets/svgs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../api/customRequest';
import {StackNav} from '../../navigation/NavigationKeys';
import LoginButton from '../common/LoginButton';
import CHeader from '../common/CHeader';

const SubjectVideos = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const colors = useSelector(state => state.theme.theme);
  // console.log(
  //   'preItemsubjectVideo',
  //   route.params.item,
  //   route.params.courseSlug,
  // );
  const [subjectVideos, setSubjectVideos] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const subjectVideoList = async () => {
    if (authenticated) {
      customRequest(
        `student/videos/submodule/${route?.params?.courseSlug}/${route?.params?.item?.subModuleSlug}`,
        'GET',
      ).then(res => {
        console.log('AuthresponseModule', res);
        setSubjectVideos(res);
      });
    } else {
      customRequest(
        `student/universalviewVideo/${route?.params?.courseSlug}/${route?.params?.item?.subModuleSlug}`,
        'GET',
      ).then(res => {
        console.log('UnAuthresponseModule', res);
        setOpenData(res);
      });
    }
    return;
  };
  const onRefresh = () => {
    setRefreshing(true);
    subjectVideoList();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      subjectVideoList();
    }
  }, [isFocused, authenticated]);

  const renderCategoryItem = (item, index) => {
    console.log('itemVideo', item);
    const originalDate = new Date(item.videos[0].created_at);
    const date = originalDate.toLocaleDateString('en-US');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(StackNav.CourseDetail, {
            linkC: item?.videos[0].link,
            link: item?.recorded_video_id,
            description: item?.videos[0]?.description,
            title: item?.videos[0]?.title,
            pdfs: item?.videos[0]?.video_pdfs,
          })
        }
        style={[
          localStyles.courseContainer,
          {
            backgroundColor: colors.categoryColor,
            shadowColor: '#000',
            elevation: 5,
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 2,
          },
        ]}>
        <View style={styles.flexRow}>
          <Image
            source={{
              uri: 'https://cdn.shopify.com/s/files/1/0070/7032/files/free_20video_20editing_20software.jpg?v=1685397701&width=1024',
            }}
            style={localStyles.cardImage}
          />
          <View
            style={[
              styles.flex,
              styles.ml10,
              {
                gap: moderateScale(5),
              },
            ]}>
            <CText type={'s14'} numberOfLines={2} style={{}}>
              {item.videos[0].title}
            </CText>
            <View style={styles.justifyBetween}>
              <CText type={'m14'} numberOfLines={1} color={colors.gray}>
                {date}
              </CText>
            </View>
          </View>
        </View>
        <Right_Arrow_Icon />
      </TouchableOpacity>
    );
  };
  return (
    <CSafeAreaView>
      {authenticated ? (
        <View>
          <CHeader
            title={route.params.courseSlug}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <FlatList
            data={subjectVideos?.data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => renderCategoryItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              gap: moderateScale(25),
              ...styles.pv25,
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
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
              title={route.params.courseSlug}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          {openData?.data?.length > 0 ? (
            <FlatList
              data={openData?.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => renderCategoryItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                gap: moderateScale(25),
                ...styles.pv25,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <Image
              source={{uri: noDataImage}}
              style={{width: getWidth(355), aspectRatio: 1, marginTop: '40%'}}
            />
          )}
        </View>
      )}
    </CSafeAreaView>
  );
};

export default SubjectVideos;

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.rowSpaceBetween,
    width: deviceWidth - moderateScale(40),
    ...styles.p15,
    ...styles.selfCenter,
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
