import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from '../../themes';
import { useSelector } from 'react-redux';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../common/constants';
import CText from '../common/CText';
import { Star_Icon_Filled, User_Icon } from '../../assets/svgs';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';
const CourseCard = ({ item, courseSlug, index }) => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  console.log('preItem', item, courseSlug);
  return (
    <View >
      {item.subModuleName == undefined || item.subModuleName == null ?
       <View>
         <Image
        source={{ uri: noDataImage }}
        style={{
          width: getWidth(375),
          height: getWidth(375),
          justifyContent: 'center',
          alignItems: 'center',
        }}

      />
      <CText>No Data Available</CText>
      </View>

       : 
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(StackNav.SubjectVideos, {
              item: item,
              courseSlug: courseSlug,
            })
          }
          style={[
            localStyles.courseContainer,
            {
              backgroundColor: colors.categoryColor,
              shadowColor: '#000',
              elevation: 5,
              shadowOffset: { width: 3, height: 3 },
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
              <CText type={'s14'} numberOfLines={2}>
                {item.title}
              </CText>
              <View style={styles.justifyBetween}>
                <CText type={'m16'} numberOfLines={1} >
                  {item?.subModuleName}
                </CText>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

export default CourseCard;

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
});
