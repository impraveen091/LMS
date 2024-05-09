import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {styles} from '../../../themes';
import CInput from '../../../components/common/CInput';
import {
  Right_Arrow_Icon,
  Search_Icon,
  Three_Line_Menu,
} from '../../../assets/svgs';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import strings from '../../../i18n/strings';
import {
  topSearch,
  Categories as CategoryData,
  Recommended,
} from '../../../api/constant';
import {StackNav} from '../../../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';
import CourseCard from '../../../components/CommonComponent/CourseCard';

const SearchTab = () => {
  const navigation = useNavigation();

  const colors = useSelector(state => state.theme.theme);
  const [searchCourse, setSearchCourse] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (searchCourse.length > 0) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [searchCourse]);
  const onChangedSearchText = text => setSearchCourse(text);

  const renderTopSearchItem = ({item, index}) => {
    return (
      <View
        style={[
          localStyles.topSearchItemContainer,
          {
            backgroundColor: colors.inputBg,
          },
        ]}>
        <CText type={'m14'}>{item.title}</CText>
      </View>
    );
  };

  const onPressCategory = (title = '', data = []) => {
    navigation.navigate(StackNav.Courses, {
      title: title,
      data: data,
    });
  };
  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressCategory(item.title, Recommended)}
        style={[
          localStyles.categoryContainer,
          {
            backgroundColor: colors.categoryColor,
            shadowColor: colors.shadowColor,
          },
        ]}>
        <View style={styles.rowStart}>
          <View style={localStyles.iconStyle}>{item.icon}</View>
          <CText type={'m14'} style={styles.ml10}>
            {item.title}
          </CText>
        </View>
        <Right_Arrow_Icon />
      </TouchableOpacity>
    );
  };
  const renderCoursesItem = ({item, index}) => {
    return (
      <CourseCard
        item={item}
        index={index}
        navigateToCourseDetail={navigateToCourseDetail}
      />
    );
  };

  const SearchComponent = () => {
    if (!showResult) {
      return (
        <>
          <View style={localStyles.topSearchContainer}>
            <CText type={'s16'} style={styles.pb15}>
              {strings.topSearch}
            </CText>
            <FlatList
              data={topSearch}
              numColumns={4}
              scrollEnabled={false}
              renderItem={renderTopSearchItem}
              key={'_'}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={styles.mh25}>
            <CText type={'s16'} style={styles.pb15}>
              {strings.categories}
            </CText>
            <FlatList
              data={CategoryData}
              scrollEnabled={false}
              key={'#'}
              renderItem={renderCategoryItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </>
      );
    } else {
      return (
        <View>
          <CText type={'s16'} style={[styles.mv10, styles.mh25]}>
            {strings.results}
          </CText>
          <FlatList
            data={Recommended}
            showsVerticalScrollIndicator={false}
            renderItem={renderCoursesItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              gap: moderateScale(25),
              ...styles.pv25,
            }}
          />
        </View>
      );
    }
  };

  const navigateToFilter = () => {
    navigation.navigate(StackNav.Filter);
  };
  const navigateToCourseDetail = () => {
    navigation.navigate(StackNav.CourseDetail, {BtnTitle: strings.enrollNow});
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <View style={localStyles.searchContainer}>
        <View style={{width: '75%'}}>
          <CInput
            insideLeftIcon={() => <Search_Icon />}
            _value={searchCourse}
            _maxLength={10}
            toGetTextFieldValue={onChangedSearchText}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
            ]}
            placeHolder={strings.searchForCourses}
            placeHolderColor={colors.placeHolderColor}
          />
        </View>
        <TouchableOpacity
          onPress={navigateToFilter}
          style={[localStyles.filterButton, {backgroundColor: colors.inputBg}]}>
          <Three_Line_Menu
            width={moderateScale(24)}
            height={moderateScale(24)}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flexGrow: 1}} nestedScrollEnabled={true}>
        <SearchComponent />
      </ScrollView>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  searchContainer: {
    ...styles.mt20,
    ...styles.ph25,
    ...styles.rowSpaceBetween,
  },
  filterButton: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    ...styles.center,
  },
  topSearchContainer: {
    ...styles.mv20,
    ...styles.mh25,
  },
  topSearchItemContainer: {
    ...styles.center,
    ...styles.m5,
    ...styles.p10,
    borderRadius: moderateScale(20),
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    ...styles.p15,
    ...styles.mb25,
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
});

export default SearchTab;
