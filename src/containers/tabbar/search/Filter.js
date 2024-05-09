import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {styles} from '../../../themes';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import CText from '../../../components/common/CText';
import {level, prices, ratings, subtitles} from '../../../api/constant';
import {moderateScale} from '../../../common/constants';
import CButton from '../../../components/common/CButton';
import {useNavigation} from '@react-navigation/native';

const Filter = () => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const [levelData, setLevelData] = useState(level);
  const [priceData, setPriceData] = useState(prices);
  const [ratingData, setRatingData] = useState(ratings);
  const [subtitleData, setSubtitleData] = useState(subtitles);

  const selectFilterItem = item => {
    item.is_selected = !item.is_selected;
    if (item.category === 'level') {
      setLevelData([...levelData]);
    } else if (item.category === 'prices') {
      setPriceData([...priceData]);
    } else if (item.category === 'ratings') {
      setRatingData([...ratingData]);
    } else if (item.category === 'subtitles') {
      setSubtitleData([...subtitleData]);
    }
  };

  const onPressApplyFilter = () => {
    navigation.goBack();
  };

  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectFilterItem(item);
        }}
        style={[
          localStyles.categoryItemContainer,
          {backgroundColor: item.is_selected ? colors.primary : colors.inputBg},
        ]}>
        <CText
          type={'m16'}
          color={item.is_selected ? colors.white : colors.notSelectedTextColor}>
          {item.title}
        </CText>
      </TouchableOpacity>
    );
  };
  const FilterCategory = ({categoryTitle, categoryData}) => {
    return (
      <View style={localStyles.categoryContainer}>
        <CText type={'m16'} color={colors.filterCategoryTitleColor}>
          {categoryTitle}
        </CText>
        <FlatList
          data={categoryData}
          scrollEnabled={false}
          numColumns={3}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={strings.filters}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <ScrollView showsHorizontalScrollIndicator={false} bounce={false}>
        <FilterCategory
          categoryTitle={strings.level}
          categoryData={levelData}
        />
        <FilterCategory
          categoryTitle={strings.prices}
          categoryData={priceData}
        />
        <FilterCategory
          categoryTitle={strings.ratings}
          categoryData={ratingData}
        />
        <FilterCategory
          categoryTitle={strings.subtitles}
          categoryData={subtitleData}
        />
        <View style={localStyles.btnContainer}>
          <CButton
            title={strings.clear}
            type={'s16'}
            bgColor={colors.tranparent}
            color={colors.primary}
            containerStyle={[
              localStyles.clearBtn,
              {borderColor: colors.primary},
            ]}
          />
          <CButton
            type={'s16'}
            title={strings.apply}
            bgColor={colors.primary}
            color={colors.white}
            containerStyle={localStyles.applyBtn}
            onPress={onPressApplyFilter}
          />
        </View>
      </ScrollView>
    </CSafeAreaView>
  );
};

export default Filter;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerText: {
    ...styles.selfCenter,
    ...styles.flex,
    textAlign: 'center',
  },
  categoryContainer: {
    ...styles.mh25,
    ...styles.mv10,
  },
  categoryItemContainer: {
    ...styles.p10,
    ...styles.ph15,
    ...styles.center,
    ...styles.mv5,
    ...styles.mr10,
    borderRadius: moderateScale(30),
  },
  btnContainer: {
    ...styles.flexRow,
    ...styles.mh25,
    ...styles.mt50,
    ...styles.justifyBetween,
  },
  clearBtn: {
    width: '30%',
    backgroundColor: 'transparent',
    borderWidth: moderateScale(2),
  },
  applyBtn: {
    width: '65%',
  },
});
