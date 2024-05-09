import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  View,
  Image,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {MyWishList} from '../../../api/constant';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  deviceHeight,
  deviceWidth,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import {StackNav} from '../../../navigation/NavigationKeys';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {customRequest} from '../../../api/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Book from '../../../assets/svgs/book.svg';
import * as Progress from 'react-native-progress';
import {Right_Arrow_Icon} from '../../../assets/svgs';
import TestSVG from '../../../assets/svgs/testSeries.svg';
import CHeader from '../../../components/common/CHeader';
import TestCard from './TestCard';
import CButton from '../../../components/common/CButton';
import LoginButton from '../../../components/common/LoginButton';

const TestSeries = () => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const getTests = async () => {
    if (authenticated) {
      customRequest('student/test-series/courses', 'GET').then(res => {
        // console.log('responseTest', res);
        setList(res);
        return;
      });
    } else {
      customRequest('student/universaltestSeriescourses', 'GET').then(res => {
        // console.log('offline Response -----------', res);
        setList(res);
        return;
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      getTests();
    }
  }, [isFocused, authenticated]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    getTests();
    setRefreshing(false);
  };

  const renderTestSeries = (item, index) => {
    // console.log('itemTS', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(StackNav.TestCard, {
              id: item?.item?.id,
              name: item?.item?.courseName,
            })
          }
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
                style={{height: 55, width: 55}}
                source={{
                  uri: `${item?.item?.image}`,
                }}
              />
            </View>
            <View style={{rowGap: 10, marginLeft: 20}}>
              <CText type={'m16'} style={[styles.ml10, {fontWeight: 'bold'}]}>
                {item?.item?.courseName}
              </CText>
              <View style={{flexDirection: 'row', columnGap: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <TestSVG height={20} width={20} />
                  <CText type={'m12'} style={styles.ml10}>
                    {item?.item?.count?.testSeries} TestSeries
                  </CText>
                </View>
              </View>
              <Progress.Bar
                style={{alignSelf: 'flex-end'}}
                width={deviceWidth / 2}
                progress={
                  item?.item?.count?.attempt / item?.item?.count?.testSeries
                }
                color="#38AD62"
              />
            </View>
          </View>
          <Right_Arrow_Icon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      {authenticated ? (
        <View>
          {list?.length == 0 ? (
            <View>
              <CHeader
                title={'Test Series'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
              />
              <Image
                source={{uri: noDataImage}}
                style={{
                  width: deviceWidth,
                  height: deviceHeight / 2,
                  alignSelf: 'center',
                  marginTop: '35.5%',
                }}
              />
            </View>
          ) : (
            <View>
              <CHeader
                title={'Test Series'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
              />
              <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => renderTestSeries(item, index)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 10,
              marginRight: 20,
            }}>
            <CHeader
              title={'Test Series'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              console.log('itemm-', item);
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(StackNav.TestCard, {
                        id: item.id,
                        name: item.courseName,
                      })
                    }
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
                          style={{height: 55, width: 55}}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </View>
                      <View style={{rowGap: 10, marginLeft: 20}}>
                        <CText
                          type={'m16'}
                          style={[styles.ml10, {fontWeight: 'bold'}]}>
                          {item.courseName}
                        </CText>
                        <View style={{flexDirection: 'row', columnGap: 15}}>
                          <View style={{flexDirection: 'row'}}>
                            <TestSVG height={20} width={20} />
                            <CText type={'m12'} style={styles.ml10}>
                              {item?.count?.testSeries} TestSeries
                            </CText>
                          </View>
                          <View style={{flexDirection: 'row'}}></View>
                        </View>
                      </View>
                    </View>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default TestSeries;
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerStyle: {
    ...styles.ph10,
    ...styles.mv20,
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
  collection: {
    ...styles.flex,
    marginHorizontal: '2%',
    marginVertical: '4%',
    borderRadius: moderateScale(15),
  },
  imageBackground: {
    width: moderateScale(155),
    height: moderateScale(128),
    ...styles.justifyEnd,
  },
  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
});
