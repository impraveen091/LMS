import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {customRequest} from '../../../api/customRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthPlaceholder from '../home/screens/authPlaceholder';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../navigation/NavigationKeys';
import CText from '../../../components/common/CText';
import CButton from '../../../components/common/CButton';
import {colors, styles} from '../../../themes';
import {Arrow_Down, Arrow_Up} from '../../../assets/svgs';
import LoginButton from '../../../components/common/LoginButton';
import CLoader from '../../../components/common/CLoader';
import Footer from '../../HeaderFooter/Footer';
import {getHeight} from '../../../common/constants';
import Collapsible from 'react-native-collapsible';
export default function Dashboard() {
  const isFocused = useIsFocused();
  const [data, setData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [testSeriesData, setTestSeriesData] = useState([]);
  const [courseListDash, setCourseListDash] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [freeCourseNum, setFreeCourseNum] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapseStates, setCollapseStates] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const width = Dimensions.get('screen').width;

  const toggleCollapsible = async (index, id) => {
    const newCollapseStates = [...collapseStates];
    newCollapseStates[index] = !newCollapseStates[index];
    setCollapseStates(newCollapseStates);
    if (newCollapseStates[index]) {
      try {
        const dataForSection = await customRequest(
          `student/courses_list/data/${id}`,
          'GET',
        );
        setCollapseStates(new Array(dataForSection?.videos?.length).fill(true));
        // console.log('data for coll', dataForSection);
        const newCollapseData = [...subjectData];
        newCollapseData[index] = dataForSection;
        setSubjectData(newCollapseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    return;
  };

  const renderCollapsibleSection = (index, title, id) => {
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: 8,
          paddingTop: 8,
        }}>
        <TouchableOpacity onPress={() => toggleCollapsible(index, id)}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.backgroundColor,
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              elevation: 2,
              alignItems: 'center',
            }}>
            <CText type={'m16'}>{title}</CText>
            {collapseStates[index] == false ? <Arrow_Up /> : <Arrow_Down />}
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={collapseStates[index]}>
          <View
            style={{
              padding: 10,
              backgroundColor: colors.backgroundColor,
              marginTop: 10,
              borderRadius: 5,
            }}>
            {subjectData[index]?.testseries.length > 0 && (
              <CText type={'m18'} backgroundColor={'#92D4D2'}>
                Test Series
              </CText>
            )}
            {subjectData[index]?.testseries?.map((data, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  backgroundColor: colors.backgroundColor,
                  marginTop: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CText type={'m16'}>{data?.name}</CText>
                <CText type={'m16'}>
                  {(data.attempt / data.total).toFixed(2) * 100}%
                </CText>
              </View>
            ))}
            {subjectData[index]?.videos && (
              <CText
                type={'b18'}
                backgroundColor={'#92D4D2'}
                style={{padding: 5, borderRadius: 10}}>
                Video Course
              </CText>
            )}
            {subjectData[index]?.videos?.map((data, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  backgroundColor: colors.backgroundColor,
                  marginTop: 10,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <CText type={'m16'}>{data?.name}</CText>
                <CText type={'m16'}>
                  {(data.watched / data.total).toFixed(2) * 100}%
                </CText>
              </View>
            ))}
          </View>
        </Collapsible>
      </View>
    );
  };

  const freeCourseNumber = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    if (token === null) {
      setIsLoggedIn(false);
      setAuthenticated(false);
      return;
    } else {
      setIsLoggedIn(true);
      customRequest('student/all-freecourse-count', 'GET').then(res => {
        if (res?.message === 'Unauthenticated.') {
          setAuthenticated(false);
          return;
        } else {
          console.log('number', res);
          setFreeCourseNum(res);
          setAuthenticated(true);
        }
      });
    }
  };
  const courseList = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    if (token === null) {
      setIsLoggedIn(false);
      setAuthenticated(false);
      return;
    } else {
      setIsLoggedIn(true);
      customRequest('student/courses_list', 'GET').then(res => {
        if (res?.message === 'Unauthenticated.') {
          setAuthenticated(false);
          return;
        } else {
          console.log('courseList', res);
          setCourseListDash(res);
          setAuthenticated(true);
        }
      });
    }
  };

  const getDashboardData = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    if (token === null) {
      setAuthenticated(false);
      return;
    } else {
      setIsLoggedIn(true);
      customRequest('student/app/dashboard', 'GET').then(res => {
        if (res?.message === 'Unauthenticated.') {
          setAuthenticated(false);
          return;
        } else {
          console.log('DashboardRes', res?.message);
          setData(res?.message);

          let newVideoData = [];

          newVideoData.push({
            value: res?.message.watchvideosCount,
            color: '#92D4D2',
            label: 'Videos Watched',
          });

          newVideoData.push({
            value: res?.message.AllVideoCount,
            color: '#5F5CF0',
            label: 'All Video Count',
          });

          setVideoData(newVideoData);

          let testSeries = [];
          testSeries.push({
            value: res?.message.testAttempt,
            color: '#92D4D2',
            label: 'Attempted',
          });

          testSeries.push({
            value: res?.message.totalTestSeries - res?.message.testAttempt,
            color: '#5F5CF0',
            label: 'Unattempted',
          });

          setTestSeriesData(testSeries);
          setAuthenticated(true);
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      freeCourseNumber();
      getDashboardData();
      courseList();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    freeCourseNumber();
    getDashboardData();
    courseList();
    setRefreshing(false);
  };

  return (
    <CSafeAreaView style={{flex: 1}}>
      {authenticated ? (
        <View>
          {loading ? (
            <CLoader />
          ) : (
            <View>
              <CHeader
                title={'Dashboard'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
              />
              <ScrollView
                style={{marginBottom: 170}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    paddingTop: 8,
                    backgroundColor: colors.backgroundColor,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 6,
                      width: width / 3 - 12,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontSize: 17, fontWeight: '600', color: 'grey'}}>
                      Paid Courses
                    </Text>
                    <Text
                      style={{
                        fontSize: 42,
                        fontWeight: '600',
                        color: 'green',
                        textAlign: 'center',
                      }}>
                      {data.padiCourseCount + ''}
                    </Text>
                  </View>

                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 6,
                      width: width / 3 - 12,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontSize: 17, fontWeight: '600', color: 'grey'}}>
                      Free Courses
                    </Text>
                    <Text
                      style={{
                        fontSize: 42,
                        fontWeight: '600',
                        color: '#205567',
                        textAlign: 'center',
                      }}>
                      {freeCourseNum}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 6,
                      width: width / 3 - 12,
                      elevation: 5,
                    }}>
                    <Text
                      style={{fontSize: 16, fontWeight: '600', color: 'grey'}}>
                      Total Courses
                    </Text>
                    <Text
                      style={{
                        fontSize: 42,
                        fontWeight: '600',
                        color: '#5F5CF0',
                        textAlign: 'center',
                      }}>
                      {freeCourseNum + data.padiCourseCount}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                    paddingTop: 8,
                  }}></View>

                {data.AllVideoCount > 0 && (
                  <View
                    style={{
                      backgroundColor: 'white',
                      marginTop: 8,
                      marginHorizontal: 8,
                      borderRadius: 6,
                      elevation: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#202244',
                        }}>
                        Videos
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#202244',
                        }}>
                        Total Videos: {data.AllVideoCount}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 2,
                        width: width - 36,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                        paddingTop: 16,
                      }}>
                      <PieChart
                        donut
                        innerRadius={50}
                        radius={70}
                        data={videoData}
                        centerLabelComponent={() => {
                          return (
                            <Text style={{fontSize: 25, color: 'green'}}>
                              {(
                                (data.watchvideosCount / data.AllVideoCount) *
                                100
                              ).toFixed(2)}
                              %
                            </Text>
                          );
                        }}
                      />
                      <View style={{marginLeft: 20}}>
                        {videoData.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: 10,
                                  backgroundColor: item.color,
                                }}
                              />
                              <Text style={{color: 'grey', marginLeft: 6}}>
                                {item.label}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                )}

                {data?.totalTestSeries > 0 && (
                  <View
                    style={{
                      backgroundColor: 'white',
                      marginTop: 8,
                      marginHorizontal: 8,
                      borderRadius: 6,
                      elevation: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#202244',
                        }}>
                        Test Series
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: '#202244',
                        }}>
                        Total Test Series: {data.totalTestSeries}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 2,
                        width: width - 36,
                        alignSelf: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                      }}>
                      <PieChart
                        data={testSeriesData}
                        showText
                        textColor="black"
                        radius={70}
                        textSize={20}
                        focusOnPress
                        showValuesAsLabels
                        showTextBackground
                        textBackgroundRadius={16}
                      />
                      <View style={{marginLeft: 20}}>
                        {testSeriesData.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  height: 10,
                                  width: 10,
                                  borderRadius: 10,
                                  backgroundColor: item.color,
                                }}
                              />
                              <Text style={{color: 'grey', marginLeft: 6}}>
                                {item.label}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                )}
                <CText
                  style={{
                    backgroundColor: '#92D4D2',
                    marginTop: 10,
                    marginHorizontal: 8,
                    borderRadius: 6,
                    elevation: 5,
                    fontSize: 20,
                    padding: 10,
                  }}>
                  Courses Detail
                </CText>
                <View style={{marginBottom: 20}}>
                  {courseListDash?.map((item, index) =>
                    renderCollapsibleSection(
                      index,
                      item.course[0]?.name,
                      item.course[0]?.id,
                    ),
                  )}
                </View>
              </ScrollView>
              <View
                style={{
                  width: '100%',
                  position: 'absolute',
                  zIndex: 1000,
                  marginTop: getHeight(810),
                  backgroundColor: 'white',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  elevation: 5,
                }}>
                <Footer />
              </View>
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
              title={'Dashboard'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              position: 'absolute',
              zIndex: 1000,
              marginTop: getHeight(815),
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              elevation: 5,
            }}>
            <Footer />
          </View>
        </View>
      )}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
});
