import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {styles} from '../../../../themes';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import strings from '../../../../i18n/strings';
import CText from '../../../../components/common/CText';
import {moderateScale} from '../../../../common/constants';
import {Right_Arrow_Icon} from '../../../../assets/svgs';
import {useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNav} from '../../../../navigation/NavigationKeys';
const CourseCat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useSelector(state => state.theme.theme);
  // console.log('categoty', route?.params?.courseCategory, route?.params?.name);
  const onPressCategory = (title = '', id, slug) => {
    route?.params?.name == 'custom'
      ? navigation.navigate(StackNav.CourseCategoryDetailScreen, {
          title: title,
          id: id,
          slug: slug,
        })
      : navigation.navigate(StackNav.CourseCategory, {
          title: title,
          id: id,
        });
  };
  const renderCategoryItem = (item, index) => {
    // console.log('itemR', item);
    if (item?.fk_home_screen_id) {
      return (
        <TouchableOpacity
          onPress={() =>
            onPressCategory(
              item.courses.name,
              item?.courses?.id,
              item?.courses?.slug,
            )
          }
          style={[
            localStyles.categoryContainer,
            {
              backgroundColor: colors.inputBg,
              elevation: 5,
            },
          ]}>
          <View style={styles.rowStart} key={index}>
            <View style={localStyles.iconStyle}>
              <Image
                source={
                  item?.courses?.image
                    ? {uri: item?.courses?.image}
                    : {
                        uri: 'https://images.pexels.com/photos/4218864/pexels-photo-4218864.jpeg',
                      }
                }
                style={{height: 70, width: 70, borderRadius: 5}}
              />
            </View>
            <CText type={'b18'} style={styles.ml10} numberOfLines={1}>
              {item?.courses?.name}
            </CText>
          </View>
          <Right_Arrow_Icon />
        </TouchableOpacity>
      );
    } else {
      return (
        <View>
          <TouchableOpacity
            onPress={() => onPressCategory(item.title, item?.id)}
            style={[
              localStyles.categoryContainer,
              {
                backgroundColor: colors.inputBg,
                elevation: 5,
              },
            ]}>
            <View style={styles.rowStart}>
              <View style={localStyles.iconStyle}>
                {item.image ? (
                  <Image
                    source={{uri: item.image}}
                    style={{height: 70, width: 70, borderRadius: 5}}
                  />
                ) : (
                  item.icon
                )}
              </View>
              <CText type={'b18'} style={styles.ml10} numberOfLines={1}>
                {item.name ? item?.name : item?.title}
              </CText>
            </View>
            <Right_Arrow_Icon />
          </TouchableOpacity>
        </View>
      );
    }
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={strings.categories}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <FlatList
        data={route?.params?.courseCategory}
        renderItem={({item, index}) => renderCategoryItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(65),
    height: moderateScale(65),
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    ...styles.p15,
    ...styles.mh25,
    ...styles.mb25,
    borderRadius: moderateScale(16),
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});

export default CourseCat;
