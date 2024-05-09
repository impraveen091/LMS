import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../themes';
import {useSelector} from 'react-redux';
import {moderateScale} from '../../common/constants';
import CText from '../common/CText';
import {Arrow_Down, Arrow_Up} from '../../assets/svgs';
import LessonVideo from './LessonVideo';

const LessonComponent = ({item, index}) => {
  const [expanded, setExpanded] = useState(false);
  const colors = useSelector(state => state.theme.theme);
  const renderLessonVideo = ({item, index}) => {
    return <LessonVideo item={item} index={index} />;
  };
  const expandCard = () => {
    setExpanded(!expanded);
  };
  return (
    <View
      style={[
        localStyles.LessonComponent,
        {
          backgroundColor: colors.backgroundColor,
          shadowColor: colors.shadowColor,
        },
      ]}>
      <TouchableOpacity
        onPress={expandCard}
        style={localStyles.lessonTitleContainer}>
        <View style={localStyles.title}>
          <View
            style={[
              localStyles.lessonNo,
              {
                backgroundColor: colors.tertiary,
              },
            ]}>
            <CText type="m12">{item.lesson_no}</CText>
          </View>
          <CText type="s16">{item.lesson_title}</CText>
        </View>
        <TouchableOpacity onPress={expandCard}>
          {expanded ? <Arrow_Up /> : <Arrow_Down />}
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{display: expanded ? 'flex' : 'none'}}>
        <FlatList
          scrollEnabled={false}
          data={item.videos}
          renderItem={renderLessonVideo}
          style={localStyles.videoDetails}
        />
      </View>
    </View>
  );
};
export default LessonComponent;

const localStyles = StyleSheet.create({
  LessonComponent: {
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
  lessonTitleContainer: {
    ...styles.rowSpaceBetween,
  },
  title: {
    ...styles.rowSpaceBetween,
    gap: moderateScale(10),
  },
  lessonNo: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    ...styles.center,
  },
  videoDetails: {
    gap: moderateScale(16),
    ...styles.mt15,
  },
});
