import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../../../themes';
import * as Progress from 'react-native-progress';
import CText from '../../../../components/common/CText';
import {deviceWidth, moderateScale} from '../../../../common/constants';
import {Right_Arrow_Icon} from '../../../../assets/svgs';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../../navigation/NavigationKeys';
import Book from '../../../../assets/svgs/book.svg';
import TestSVG from '../../../../assets/svgs/testSeries.svg';
import Timer from '../../../../assets/svgs/time_icon.svg';

const Categories = ({data}) => {
  const [refreshing, setRefreshing] = useState(false);
  // console.log('data', data);
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressCategory = (title = '', data = []) => {
    navigation.navigate(StackNav.Courses, {
      title: title,
      data: data,
    });
  };

  const duration = time => {
    var hour = Math.floor(time / 3600);
    var min = Math.round((time - hour * 3600) / 60);
    return `${hour} hr ${min} mins`;
  };

  const renderCategoryItem = (item, index) => {
    // console.log('item', item.image);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressCategory(item.courseName, {id: item.id})}
        style={[
          localStyles.categoryContainer,
          {
            backgroundColor: colors.inputBg,
            shadowColor: '#000',
            elevation: 5,
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            height: 110,
          },
        ]}>
        <View style={styles.rowStart}>
          <View style={localStyles.iconStyle}>
            <Image
              resizeMode="contain"
              style={{height: 55, width: 55}}
              source={
                item?.image == null || item?.image == undefined
                  ? {
                      uri: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/',
                    }
                  : {
                      uri: `${item.image}`,
                    }
              }
            />
          </View>
          <View style={{rowGap: 10, marginLeft: 30, maxWidth: '70%'}}>
            <CText
              type={'m16'}
              numberOfLines={1}
              style={[styles.ml10, {fontWeight: 'bold'}]}>
              {item.courseName}
            </CText>
            <View style={{flexDirection: 'row', columnGap: 15}}>
              <View style={{flexDirection: 'row'}}>
                <TestSVG height={20} width={20} />
                <CText type={'m12'} style={styles.ml5}>
                  {item.count.totalVideos} Videos
                </CText>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Timer height={20} width={20} />
                <CText type={'m12'} style={styles.ml5}>
                  {duration(item.count.durantion)}
                </CText>
              </View>
            </View>
            <Progress.Bar
              style={{alignSelf: 'flex-end'}}
              width={deviceWidth / 2}
              progress={item.count.watchCount / item.count.totalVideos}
              color="#38AD62"
            />
          </View>
        </View>
        <Right_Arrow_Icon />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item, index}) => renderCategoryItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => {}} />
        }
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
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

export default Categories;
