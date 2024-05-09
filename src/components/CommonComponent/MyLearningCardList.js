import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import CText from '../common/CText';
import {styles} from '../../themes';
import {useSelector} from 'react-redux';
import strings from '../../i18n/strings';
import CourseCard from './CourseCard';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';

const MyLearningCardList = ({
  cardData,
  title,
  onPressSeeAll = {},
  scrollEnabled,
  isCompleted,
  BtnTitle,
}) => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const navigateToCourseDetail = () => {
    navigation.navigate(StackNav.CourseDetail, {BtnTitle: BtnTitle});
  };
  const renderRecommended = ({item}) => (
    <CourseCard
      item={item}
      isCompleted={isCompleted}
      navigateToCourseDetail={navigateToCourseDetail}
      BtnTitle={BtnTitle}
    />
  );

  return (
    <View>
      <View style={localStyles.recommendedContainer}>
        <CText type={'s16'}>{title}</CText>
        <TouchableOpacity onPress={onPressSeeAll}>
          <CText type={'s14'} color={colors.primary}>
            {strings.seeAll}
          </CText>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          scrollEnabled={scrollEnabled}
          data={cardData}
          renderItem={renderRecommended}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={localStyles.list}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  recommendedContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mh20,
    ...styles.mt15,
  },
  list: {
    ...styles.mv20,
    gap: moderateScale(25),
  },
});

export default MyLearningCardList;
