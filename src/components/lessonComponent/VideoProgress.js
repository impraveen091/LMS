import {StyleSheet, View} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {styles} from '../../themes';
import {useSelector} from 'react-redux';
import typography from '../../themes/typography';
import {Lock_Dark, Lock_Light} from '../../assets/svgs';
import CText from '../common/CText';

const VideoProgress = ({video_completed_length, video_status}) => {
  const colors = useSelector(state => state.theme.theme);

  const VideoProgressInfo = () => {
    if (video_completed_length && video_completed_length == 0) {
      return colors.dark == 'dark' ? <Lock_Dark /> : <Lock_Light />;
    } else if (video_completed_length == 100) {
      return (
        <CText type="s10" color={colors.primary}>
          {strings.done}
        </CText>
      );
    } else {
      return (
        <CText type="s10" color={colors.primary}>
          {video_completed_length}%
        </CText>
      );
    }
  };

  return (
    <View style={styles.center}>
      <CircularProgress.CircularProgressBase
        progressValueColor={colors.primary}
        value={video_completed_length}
        radius={25}
        maxValue={100}
        titleFontSize={16}
        titleStyle={{fontWeight: 'bold'}}
        activeStrokeColor={colors.primary}
        inActiveStrokeColor={colors.progressColor}
        inActiveStrokeWidth={5}
        activeStrokeWidth={5}>
        <VideoProgressInfo />
      </CircularProgress.CircularProgressBase>
    </View>
  );
};

export default VideoProgress;

const localStyles = StyleSheet.create({
  progressValueStyle: {
    ...typography.fontSizes.f10,
    ...typography.fontWeights.SemiBold,
  },
});
