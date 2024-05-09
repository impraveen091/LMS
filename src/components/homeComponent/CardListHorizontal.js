import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import CText from '../common/CText';
import { styles } from '../../themes';
import { useSelector } from 'react-redux';
import strings from '../../i18n/strings';
import CourseCard from './CourseCard';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';


const CardListHorizontal = ({
  cardData,
  title,
  onPressSeeAll = {},
  showProgress,
}) => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const navigateToCourseDetail = () => {
    navigation.navigate(StackNav.CourseDetail, { BtnTitle: strings.enrollNow });
  };

  const renderRecommended = ({ item }) => (
    <CourseCard
      title={title}
      item={item}
      showProgress={showProgress}
      onPressCard={navigateToCourseDetail}
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
          data={cardData}
          renderItem={renderRecommended}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.m10}
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  recommendedContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mh20,
    ...styles.mt25,
  },
});

export default CardListHorizontal;
