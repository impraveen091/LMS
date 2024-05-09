import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from '../../../themes';
import {useSelector} from 'react-redux';
import {
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {
  Right_Arrow_Icon,
  Star_Icon_Filled,
  User_Icon,
} from '../../../assets/svgs';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import CText from '../../../components/common/CText';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../../api/customRequest';
import CHeader from '../../../components/common/CHeader';
import Watch from '../../../assets/svgs/watch.svg';
import CButton from '../../../components/common/CButton';
import strings from '../../../i18n/strings';
import axios from '../../../api/axios';

const TestCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
  const [resp, setResp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colors = useSelector(state => state.theme.theme);
  const [authenticated, setAuthenticated] = useState(false);
  console.log('preItem------', route?.params?.id);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const getTests = async () => {
    if (authenticated) {
      customRequest(
        `student/test-series/course/${route?.params?.id}`,
        'GET',
      ).then(res => {
        console.log('responseAuth', res.message);
        setList(res.message);
        return;
      });
    } else {
      customRequest(
        `student/universalTestSeries/${route?.params?.id}`,
        'GET',
      ).then(res => {
        console.log(
          'offline Response -----------',
          res[0]?.course_relation_liveclass[0]?.coursemodule,
        );
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

  const handleTest = async id => {
    console.log('id::::', id);
    console.log('responce:::::1');
    try {
      const tokenStudent = await AsyncStorage.getItem('tokenStudent');
      const config = {
        headers: {Authorization: `Bearer ${tokenStudent}`},
      };
      // setLoading(true);
      const responce = await axios.get(`student/test-attempt/${id}`, config);
      console.log('responce:::::2a', responce);
      setResp(responce);
      console.log('responce:::::2a', resp);
    } catch (error) {
      console.log('responce:::::3', error);
      console.log(error);
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginScreen');
      }
      Alert.alert('error');
    }

    // }
  };

  const maxAttemptValue = (submodule, module) => {
    console.log('for Max attempt value', submodule, module);
    if (submodule == null && module > 0) {
      console.log('maxAttemptValue1', module);
      return parseInt(module, 10);
    } else {
      console.log('maxAttemptValue', submodule);
      return parseInt(submodule, 10);
    }
  };

  const renderTestSeries = (item, index) => {
    // console.log(
    //   'ItemTest',
    //   item?.item?.course_relation_liveclass[0].coursemodule,
    // );
    return (
      <View>
        {item?.item?.course_relation_liveclass?.map((item, index) => {
          console.log('ItemTest2', item);
          return (
            <View key={index}>
              <View
                style={[
                  styles.flex,
                  styles.ml20,

                  {
                    gap: moderateScale(5),
                  },
                ]}>
                <CText
                  type={'s20'}
                  numberOfLines={1}
                  style={[styles.m5, {fontWeight: 'bold'}]}>
                  {item?.coursemodule[0]?.submodule?.length > 0 &&
                    item?.coursemodule[0]?.name}
                </CText>
              </View>

              {item?.coursemodule[0]?.submodule?.length > 0 &&
                item?.coursemodule[0]?.submodule?.map((subitem, subIndex) => {
                  console.log('ItemTest3', subitem);
                  return (
                    <View>
                      {subitem.qst_count > 0 && (
                        <View
                          style={[
                            localStyles.courseContainer,
                            {
                              backgroundColor: colors.categoryColor,
                              shadowColor: '#000',
                              elevation: 5,
                              shadowOffset: {width: 3, height: 3},
                              shadowOpacity: 0.5,
                              shadowRadius: 2,
                              flexDirection: 'row',
                            },
                          ]}>
                          {subitem.image == '' ? (
                            <Image
                              source={require('../../../assets/images/test.png')}
                              style={localStyles.cardImage}
                            />
                          ) : (
                            <Image
                              source={{uri: subitem.image}}
                              style={localStyles.cardImage}
                            />
                          )}
                          <View style={{marginLeft: 8, rowGap: 5}}>
                            <CText
                              type={'m16'}
                              numberOfLines={1}
                              style={{fontWeight: 'bold'}}>
                              {subitem.name}
                            </CText>
                            <View>
                              <View
                                style={[
                                  styles.rowSpaceBetween,
                                  {width: moderateScale(180)},
                                ]}>
                                <CText
                                  type={'m12'}
                                  numberOfLines={1}
                                  color={colors.gray}>
                                  {subitem?.qst_count} Questions
                                </CText>
                                <View style={[styles.rowStart, {columnGap: 5}]}>
                                  <Watch
                                    width={15}
                                    height={15}
                                    style={{alignSelf: 'center'}}
                                  />
                                  <CText
                                    type={'m12'}
                                    numberOfLines={1}
                                    color={colors.gray}>
                                    {item?.coursemodule[0]?.duration} mins
                                  </CText>
                                </View>
                              </View>
                              <View style={styles.rowSpaceBetween}>
                                <CText
                                  type={'m12'}
                                  numberOfLines={1}
                                  color={colors.gray}>
                                  {item.coursemodule[0]?.total_marks} Marks
                                </CText>
                                <CText
                                  type={'m12'}
                                  numberOfLines={1}
                                  color={colors.warning}>
                                  {item.coursemodule[0]?.negative_marks + ' '}
                                  Negative Mark
                                </CText>
                              </View>
                              <View style={styles.rowSpaceBetween}>
                                <CText
                                  type={'m12'}
                                  numberOfLines={1}
                                  color={'red'}>
                                  {maxAttemptValue(
                                    subitem?.attempts,
                                    item?.coursemodule[0]?.attempts,
                                  ) + ' '}
                                  max attempts
                                </CText>
                                <CText type={'m12'} numberOfLines={1}>
                                  {subitem?.test_result?.attempt == null
                                    ? 0 + ' '
                                    : subitem?.test_result?.attempt + ' '}
                                  attempts taken
                                </CText>
                              </View>
                              <View
                                style={[
                                  styles.rowSpaceBetween,
                                  {marginTop: 5},
                                ]}>
                                {console.log(
                                  'Value3',
                                  subitem?.test_result?.attempt,
                                  maxAttemptValue(
                                    subitem?.attempts,
                                    item?.coursemodule[0]?.attempts,
                                  ),
                                )}
                                <TouchableOpacity>
                                  {subitem?.test_result?.attempt >=
                                  maxAttemptValue(
                                    subitem?.attempts,
                                    item?.coursemodule[0]?.attempts,
                                  ) ? null : (
                                    <CButton
                                      title="Start Test"
                                      style={{width: 80, textAlign: 'center'}}
                                      onPress={() => {
                                        navigation.replace(StackNav.StartTest, {
                                          qId: subitem.id,
                                          attempt:
                                            item?.item
                                              ?.courserelationsubmodule[0]
                                              ?.test_result?.attempt,
                                          name: subitem.name,
                                        });
                                        handleTest(subitem.id);
                                        console.log('Starttest');
                                      }}
                                    />
                                  )}
                                </TouchableOpacity>
                                {subitem?.test_result?.attempt > 0 && (
                                  <CButton
                                    title="Results"
                                    style={{width: 70, textAlign: 'center'}}
                                    onPress={() => {
                                      navigation.navigate(StackNav.Results, {
                                        qId: subitem?.test_result
                                          ?.fk_sub_module_id,
                                        attempt: subitem?.test_result?.attempt,
                                        type: subitem?.fk_test_type_id,
                                      });
                                    }}
                                  />
                                )}
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  );
                })}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={route?.params?.name}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      {authenticated ? (
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => renderTestSeries(item, index)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          data={list[0]?.course_relation_liveclass}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                {item.coursemodule.map((item, index) => {
                  return (
                    <>
                      <View>
                        <View
                          style={[
                            styles.flex,
                            styles.ml20,

                            {
                              gap: moderateScale(5),
                            },
                          ]}>
                          <CText
                            type={'s20'}
                            numberOfLines={1}
                            style={[styles.m5, {fontWeight: 'bold'}]}>
                            {item.name}
                          </CText>
                        </View>
                      </View>

                      {item.submodule.map((subitem, subIndex) => {
                        return (
                          <View>
                            {subitem.qst_count > 0 && (
                              <View
                                style={[
                                  localStyles.courseContainer,
                                  {
                                    backgroundColor: colors.categoryColor,
                                    shadowColor: '#000',
                                    elevation: 5,
                                    shadowOffset: {width: 3, height: 3},
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    flexDirection: 'row',
                                  },
                                ]}>
                                {subitem.image == '' ? (
                                  <Image
                                    source={require('../../../assets/images/test.png')}
                                    style={localStyles.cardImage}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: subitem.image}}
                                    style={localStyles.cardImage}
                                  />
                                )}
                                <View style={{marginLeft: 10}}>
                                  <CText
                                    type={'m16'}
                                    numberOfLines={1}
                                    style={{
                                      fontWeight: 'bold',
                                    }}>
                                    {subitem.name}
                                  </CText>
                                  <View>
                                    <View
                                      style={[
                                        styles.rowSpaceBetween,
                                        {width: moderateScale(180)},
                                      ]}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.gray}>
                                        {subitem?.qst_count} Questions
                                      </CText>
                                      <View
                                        style={[
                                          styles.rowStart,
                                          {columnGap: 5},
                                        ]}>
                                        <Watch
                                          width={15}
                                          height={15}
                                          style={{alignSelf: 'center'}}
                                        />
                                        <CText
                                          type={'m12'}
                                          numberOfLines={1}
                                          color={colors.gray}>
                                          {item?.duration} mins
                                        </CText>
                                      </View>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.gray}>
                                        {item?.total_marks} Marks
                                      </CText>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.warning}>
                                        {item?.negative_marks + ' '}
                                        Negative Mark
                                      </CText>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={'red'}>
                                        {maxAttemptValue(
                                          subitem?.attempts,
                                          item?.coursemodule?.attempts,
                                        ) + ' '}
                                        max attempts
                                      </CText>
                                      <CText type={'m12'} numberOfLines={1}>
                                        {subitem?.test_result?.attempt == null
                                          ? 0 + ' '
                                          : subitem?.test_result?.attempt + ' '}
                                        attempts taken
                                      </CText>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <TouchableOpacity>
                                        {subitem?.test_result?.attempt ==
                                        maxAttemptValue(
                                          subitem?.attempts,
                                          item?.coursemodule?.attempts,
                                        ) ? null : (
                                          <CButton
                                            title="Start Test"
                                            style={{
                                              width: 80,
                                              textAlign: 'center',
                                            }}
                                            onPress={() => {
                                              navigation.replace(
                                                StackNav.StartTest,
                                                {
                                                  qId: subitem.id,
                                                  attempt:
                                                    item?.item
                                                      ?.courserelationsubmodule[0]
                                                      ?.test_result?.attempt,
                                                  name: subitem.name,
                                                },
                                              );
                                              handleTest(subitem.id);
                                              console.log('Starttest');
                                            }}
                                          />
                                        )}
                                      </TouchableOpacity>
                                      {subitem?.test_result?.attempt > 0 && (
                                        <CButton
                                          title="Results"
                                          style={{
                                            width: 70,
                                            textAlign: 'center',
                                          }}
                                          onPress={() => {
                                            navigation.navigate(
                                              StackNav.Results,
                                              {
                                                qId: subitem?.test_result
                                                  ?.fk_sub_module_id,
                                                attempt:
                                                  subitem?.test_result?.attempt,
                                                type: subitem?.fk_test_type_id,
                                              },
                                            );
                                          }}
                                        />
                                      )}
                                    </View>
                                  </View>
                                  <View style={{marginTop: 20, width: 100}}>
                                    <CButton
                                      title="Start Test"
                                      style={{width: 80, textAlign: 'center'}}
                                      onPress={() => {
                                        navigation.navigate(StackNav.Auth);
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </>
                  );
                })}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </CSafeAreaView>
  );
};

export default TestCard;

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.mb20,
    width: deviceWidth - moderateScale(40),
    ...styles.p15,
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  cardImage: {
    height: getHeight(90),
    borderRadius: moderateScale(12),
    width: getWidth(96),
    resizeMode: 'contain',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  submitButton: {
    width: 50,
    padding: 5,
  },
});
