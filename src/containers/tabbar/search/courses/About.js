import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList, Dimensions
} from 'react-native';
import React from 'react';
import CText from '../../../../components/common/CText';
import { styles } from '../../../../themes';
import { useSelector } from 'react-redux';
import strings from '../../../../i18n/strings';
import { getWidth, moderateScale } from '../../../../common/constants';

import Icons from 'react-native-vector-icons/MaterialIcons';
import PlayButton from '../../../../assets/svgs/playButton.svg';
import {
  Bag,
  Lesson_Icon,
  Mic,
  Procreate,
  User_Multiple_Icon,
} from '../../../../assets/svgs';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';

const About = ({ description }) => {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const colors = useSelector(state => state.theme.theme);

  return (
    <View style={localStyles.root}>
      <CText type={'B16'}>Introduction :-</CText>
      <CText>{description}</CText>
    </View>

  );
};

export default About;

const localStyles = StyleSheet.create({
  root: {
    ...styles.mt15,
    gap: moderateScale(25),
    ...styles.ph10,
    ...styles.mh10,
    ...styles.mb30,
    ...styles.flex,
    marginBottom: 100
  },
  section: {
    gap: moderateScale(8),
  },
  detailContainer: {
    ...styles.flexRow,
    ...styles.flex,
    gap: moderateScale(30),
  },
  detailSection: {
    ...styles.flex,
    gap: moderateScale(8),
  },
  detailsContainer: {
    ...styles.flexRow,
    ...styles.flex,
    ...styles.itemsCenter,
    gap: moderateScale(8),
  },
  toolContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    gap: moderateScale(8),
  },
});
