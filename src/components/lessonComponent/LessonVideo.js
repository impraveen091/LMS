import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import {useSelector} from 'react-redux';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import VideoProgress from './VideoProgress';

const LessonVideo = ({item, index}) => {
  const colors = useSelector(state => state.theme.theme);
  return (
    <View
      style={[
        localStyles.videoDetail,
        {backgroundColor: colors.cardBackground},
      ]}>
      <View style={localStyles.title}>
        <Image
          source={item?.video_thumbnail}
          style={localStyles.thumbnailStyle}
        />
        <View style={localStyles.titleContainer}>
          <CText
            type="m14"
            style={{lineHeight: moderateScale(15)}}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item?.video_title}
          </CText>
          <CText
            type="r12"
            style={styles.mt5}
            numberOfLines={1}
            color={colors.gray}>
            {item?.video_length} {strings.mins}
          </CText>
        </View>
      </View>
      <View style={localStyles.progress}>
        <VideoProgress
          video_completed_length={item?.video_completed_length}
          video_status={item?.video_status}
        />
      </View>
    </View>
  );
};

export default LessonVideo;

const localStyles = StyleSheet.create({
  thumbnailStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(15),
  },
  videoDetail: {
    ...styles.flexRow,
    ...styles.p10,
    borderRadius: moderateScale(15),
  },
  title: {
    ...styles.flexRow,
    gap: moderateScale(10),
    width: '85%',
  },
  progress: {
    width: '15%',
    ...styles.selfCenter,
  },
  titleContainer: {
    width: '70%',
    ...styles.selfCenter,
  },
});
