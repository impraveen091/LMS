import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../../common/constants';
import Icons from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';

import {customRequest} from '../../../../api/customRequest';
import {Dimensions, Platform, PixelRatio} from 'react-native';
import {StackNav} from '../../../../navigation/NavigationKeys';
import {styles} from '../../../../themes';
import CText from '../../../../components/common/CText';
import RenderHTML from 'react-native-render-html';
import {
  Right_Arrow_Icon,
  Star_Icon_Filled,
  User_Icon,
} from '../../../../assets/svgs';
import {useSelector} from 'react-redux';
import CHeader from '../../../../components/common/CHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CLoader from '../../../../components/common/CLoader';

export default function CourseCategory({route, navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const [list, setList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const Id = route.params?.id;
  console.log('Id: ' + Id);
  const getTests = () => {
    customRequest(`course-category/students/course/${Id}`, 'GET').then(res => {
      setIsLoading(false);
      setList(res?.message?.data);
      // console.log(res, 'apiResponse');
    });
  };

  const getUser = async () => {
    let user = await AsyncStorage.getItem('tokenStudent');
    // console.log('usertoken:::::', user, typeof user);
    if (user === null) {
      // isLoading == false && <AuthPlaceholder />;
      // console.log('test1', user);
      setIsLoggedIn(false);
    } else {
      // console.log('test2', user);
      setIsLoggedIn(true);
    }
  };

  const handleClickCourseCard = item => {
    navigation.navigate(StackNav.CourseCategoryDetailScreen, {
      slug: item?.slug,
      id: item?.id,
    });
  };

  useEffect(() => {
    // console.log('Hello 1');
    getTests();
    getUser();
  }, []);

  useEffect(() => {
    // console.log('List::::::::::', list);
  }, [list]);

  // console.log(list, 'listmessage');
  if (isLoading) {
    return <CLoader />;
  }

  const courseCard = (item, index) => {
    return (
      <ScrollView>
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleClickCourseCard(item);
          }}
          style={[
            localStyles.courseContainer,
            {
              marginVertical: 10,
              backgroundColor: colors.categoryColor,
              shadowColor: colors.shadowColor,
            },
          ]}>
          <View style={styles.flexRow} key={index}>
            <Image
              resizeMode="contain"
              source={
                item?.image
                  ? {uri: item?.image}
                  : require('../../../../assets/images/test.png')
              }
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
              <View style={styles.justifyBetween}>
                <CText
                  type={'m16'}
                  numberOfLines={1}
                  color={colors.gray}
                  style={{fontWeight: 'bold'}}>
                  {item?.name}
                </CText>
                <CText type={'m14'} numberOfLines={1} color={colors.gray}>
                  {item.description}
                </CText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={{marginBottom: 60, backgroundColor: colors.backgroundColor}}>
      <CHeader
        title={'Courses Categories'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />

      <FlatList
        data={list}
        renderItem={({item, index}) => courseCard(item, index)}
        keyExtractor={item => item.index}
      />
    </View>
  );
}

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
