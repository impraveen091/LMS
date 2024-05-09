import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CHeader from '../../../components/common/CHeader';
import {customRequest} from '../../../api/customRequest';
import CText from '../../../components/common/CText';
import {styles} from '../../../themes';
import CategoryCourseCard from '../../../components/homeComponent/CategoryCourseCard';
import CustomiseCourses from '../home/screens/CustomiseCourses';
import {StackNav} from '../../../navigation/NavigationKeys';
import {getWidth} from '../../../common/constants';
import {loc} from 'react-native-gifted-charts/src/utils/constants';

const AllCourses = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState([]);
  const [popularCategory, setPopularCategory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const colors = useSelector(state => state.theme.theme);

  const homeCourses = () => {
    customRequest('app/home/courses?limit=5', 'GET').then(res => {
      // console.log('HomeCourses', res);
      setCourses(res);
    });
    return;
  };

  const getCourseCategory = () => {
    customRequest('course-category/show-actives', 'GET').then(res => {
      // console.log('Category data', res);
      setCourseCategory(res);
    });
    return;
  };

  const getPopularCourse = () => {
    customRequest('app/home/courses_extra', 'GET').then(res => {
      // console.log('popular--', res);
      setPopularCategory(res);
    });
    return;
  };

  const onRefresh = () => {
    setRefreshing(true);
    homeCourses();
    getCourseCategory();
    getPopularCourse();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      getCourseCategory();
      homeCourses();
      getPopularCourse();
    }
  }, [isFocused]);

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
  return (
    <CSafeAreaView>
      <CHeader
        title={'Courses'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={[styles.flex, {marginTop: -20}]}>
          <View style={styles.mh10}>
            {courseCategory.length > 0 && (
              <CategoryHeader title={'Categories'} />
            )}
            <View style={localStyles.courseContainer}>
              {courseCategory.length > 0 &&
                courseCategory?.message?.slice(0, 4)?.map((cat, index) => {
                  return (
                    <CategoryCourseCard
                      key={index}
                      name={'cat'}
                      item={cat}
                      onPressCard={() =>
                        navigation.navigate(StackNav.CourseCategory, {
                          id: cat?.id,
                        })
                      }
                    />
                  );
                })}
            </View>
          </View>
          <View style={styles.mh10}>
            {courses?.length > 0 && <CategoryHeader title={'Courses'} />}
            <View style={localStyles.courseContainer}>
              {courses?.length > 0 &&
                courses?.slice(0, 4).map((data, index) => {
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
            <CustomiseCourses
              popularCategory={popularCategory}
              name="allCourses"
            />
          </View>
        </View>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default AllCourses;

const localStyles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  categoryHeader: {
    ...styles.rowSpaceBetween,
    ...styles.mt25,
    ...styles.mb10,
  },
  courseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getWidth(365),
  },
});
