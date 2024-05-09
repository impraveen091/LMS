import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import CText from '../../../../components/common/CText';
import {colors, styles} from '../../../../themes';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../../common/constants';
import CategoryCourseCard from '../../../../components/homeComponent/CategoryCourseCard';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../../navigation/NavigationKeys';

export default function CustomiseCourses({popularCategory, name}) {
  const navigation = useNavigation();

  // console.log('popularCategory', popularCategory);
  const onPressSeeAllCategory = data => {
    // console.log('DataSent', data);
    navigation.navigate(StackNav.CourseCat, {
      courseCategory: data,
      name: 'custom',
    });
  };
  const CategoryHeader = props => {
    return (
      <View style={localStyles.categoryHeader}>
        <CText type={'s16'} style={{fontWeight: 'bold'}}>
          {props.title}
        </CText>
        <TouchableOpacity
          onPress={() =>
            onPressSeeAllCategory(popularCategory[props.index].homescreenlist)
          }>
          <CText type={'s16'} color={'#5F5CF0'}>
            {strings.seeAll}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {popularCategory?.length > 0
        ? popularCategory?.map((data, index) => {
            // console.log('customedata', data);
            return (
              <View key={index}>
                <CategoryHeader title={data?.name} index={index} />
                <View style={localStyles.courseContainer}>
                  {name == 'allCourses'
                    ? data?.homescreenlist?.slice(0, 4)?.map(item => {
                        // console.log('AfterHome', item);
                        return (
                          <CategoryCourseCard
                            name={item?.courses?.name}
                            item={item?.courses}
                            onPressCard={() => {
                              navigation.navigate(
                                StackNav.CourseCategoryDetailScreen,
                                {
                                  id: item?.courses?.id,
                                  slug: item?.courses?.slug,
                                },
                              );
                            }}
                          />
                        );
                      })
                    : data?.homescreenlist?.slice(0, 2)?.map(item => {
                        // console.log('AfterHome', item);
                        return (
                          <CategoryCourseCard
                            name={item?.courses?.name}
                            item={item?.courses}
                            onPressCard={() => {
                              navigation.navigate(
                                StackNav.CourseCategoryDetailScreen,
                                {
                                  id: item?.courses?.id,
                                  slug: item?.courses?.slug,
                                },
                              );
                            }}
                          />
                        );
                      })}
                </View>
              </View>
            );
          })
        : null}
    </View>
  );
}

const localStyles = StyleSheet.create({
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
