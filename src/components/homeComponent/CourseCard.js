import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {styles} from '../../themes';
import {getHeight, getWidth, moderateScale} from '../../common/constants';
import {useSelector} from 'react-redux';
import CText from '../common/CText';
import {Star_Icon_Filled, User_Icon} from '../../assets/svgs';
import LinearGradient from 'react-native-linear-gradient';

const CourseCard = ({item, title, showProgress, onPressCard = () => {}}) => {
  const colors = useSelector(state => state.theme.theme);

  console.log('MyLearning', item, title, showProgress);
  const detailComponent = () => {
    if (!!showProgress) {
      return (
        <View style={styles.rowSpaceBetween}>
          <View
            style={[
              localStyles.progressBar,
              {backgroundColor: colors.primary20},
            ]}>
            <View
              style={[
                localStyles.progressBar,
                {
                  width: `${showProgress === 'NaN' ? 0 : showProgress * 100}%`,
                  backgroundColor: colors.primary,
                },
              ]}></View>
          </View>
          <CText type={'m12'}>
            {showProgress === 'NaN' ? 0 : showProgress * 100}%
          </CText>
        </View>
      );
    } else {
      return (
        <View style={localStyles.ratingDetail}>
          <View style={styles.rowStart}>
            <View style={styles.rowStart}>
              <Star_Icon_Filled />
              <CText type={'m14'} style={styles.ml5}>
                {'5.0'}
              </CText>
            </View>
            <View style={[styles.rowStart, styles.ml15]}>
              <User_Icon />
              <CText type={'m14'} style={styles.ml5}>
                {'40,000'}
              </CText>
            </View>
          </View>
          <CText type={'s15'} color={colors.primary}>
            {'$ 5.00'}
          </CText>
        </View>
      );
    }
  };
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={[
        localStyles.cardContainer,
        {
          backgroundColor: colors.socialButtonBackground,
        },
      ]}>
      {title == 'Popular' ? (
        <View
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            zIndex: 1000,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LinearGradient
            colors={['#9401d8', '#d418a0', '#ec3a7c', '#ff942d', '#ff5100']}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              borderBottomLeftRadius: 22,
            }}
            start={{x: 0.5, y: 0}}
            end={{x: 0, y: 0.5}}
          />
          <Image
            style={{
              height: 18,
              width: 18,
              tintColor: 'white',
            }}
            source={require('../../assets/images/star.png')}
          />
        </View>
      ) : (
        <View
          style={{
            width: 40,
            height: 40,
            position: 'absolute',
            zIndex: 1000,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <LinearGradient
            colors={['#9401d8', '#d418a0', '#ec3a7c', '#ff942d', '#ff5100']}
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              borderBottomLeftRadius: 22,
            }}
            start={{x: 0.5, y: 0}}
            end={{x: 0, y: 0.5}}
          />
          <Text style={{color: 'white', fontWeight: 'bold'}}>New</Text> */}
        </View>
      )}

      <Image
        source={
          item?.course[0]?.image == null
            ? {
                uri: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }
            : {uri: item?.course[0]?.image}
        }
        style={localStyles.cardImage}
        resizeMode="contain"
      />
      <View style={styles.mt10}>
        <CText type={'s14'} numberOfLines={2}>
          {item?.course[0]?.name}
        </CText>

        {detailComponent()}
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  cardContainer: {
    ...styles.p10,
    ...styles.mb10,
    borderRadius: moderateScale(10),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    width: moderateScale(355),
  },
  cardImage: {
    height: getHeight(120),
    borderRadius: moderateScale(16),
    width: '50%',
    resizeMode: 'cover',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  progressBar: {
    height: moderateScale(4),
    width: '85%',
    borderRadius: moderateScale(4),
  },
});

export default CourseCard;
