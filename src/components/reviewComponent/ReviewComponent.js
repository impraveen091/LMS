import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import CText from '../common/CText';
import {Star} from '../../assets/svgs';

const ReviewComponent = ({item, index}) => {
  const colors = useSelector(state => state.theme.theme);
  return (
    <View
      style={[
        localStyles.reviewRoot,
        {
          backgroundColor: colors.categoryColor,
          shadowColor: colors.shadowColor,
        },
      ]}>
      <View style={localStyles.reviewContainer}>
        <Image source={item?.reviewer_image} style={localStyles.profileImage} />
        <View style={localStyles.reviewerInfo}>
          <CText type="s14" numberOfLines={1} style={styles.flex}>
            {item.reviewer_name}
          </CText>
          <CText type="r12" color={colors.placeHolderColor}>
            {item.review_date}
          </CText>
          <CText type="r14">{item.review_comment}</CText>
        </View>
      </View>
      <View
        style={[
          localStyles.ratingContainer,
          {
            backgroundColor: colors.tertiary,
          },
        ]}>
        <Star />
        <CText type="m14" color={colors.info}>
          {item.review_rating}
        </CText>
      </View>
    </View>
  );
};

export default ReviewComponent;

const localStyles = StyleSheet.create({
  reviewRoot: {
    ...styles.flexRow,
    ...styles.p15,
    ...styles.mh20,
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  profileImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  reviewContainer: {
    ...styles.flexRow,
    width: '85%',
    gap: moderateScale(10),
  },
  reviewerInfo: {
    gap: moderateScale(5),
    width: '80%',
    ...styles.flex,
  },
  ratingContainer: {
    ...styles.flexRow,
    width: '15%',
    ...styles.pv5,
    ...styles.center,
    ...styles.selfStart,
    borderRadius: moderateScale(10),
    gap: moderateScale(3),
  },
});
