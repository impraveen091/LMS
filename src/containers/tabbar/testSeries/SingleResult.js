import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  deviceHeight,
  deviceWidth,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {customRequest} from '../../../api/customRequest';
import {PieChart} from 'react-native-gifted-charts';
import CorrectAnswer from '../../../assets/svgs/correctAnswer.svg';
import Bulb from '../../../assets/svgs/bulb.svg';
import PenU from '../../../assets/svgs/tabBarIcons/light/penU.svg';
import Describe from '../../../assets/svgs/tabBarIcons/dark/test_unfill.svg';
import CLoader from '../../../components/common/CLoader';

const SingleResult = () => {
  const colors = useSelector(state => state.theme.theme);
  const route = useRoute();
  const [attempt, setAttempt] = useState('');
  const [questionPieChartData, setQuestionPieChartData] = useState([]);
  const [resultPieChartData, setResultPieChartData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newData, setNewData] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [data, setData] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [testData, setTestData] = useState([]);

  const getData = () => {
    setLoading(true);
    const id = route?.params?.qId;
    console.log('ID', id);
    customRequest(`student/test-attempts/${id}`, 'GET').then(res => {
      console.log('Course::::::::::', res);
      setData(res);
      setAttempt(res?.attempt);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (attempt) {
      const totalAttempt = Number(attempt);
      console.log('totalAttempt', totalAttempt);
      const testArray = [];
      for (let i = 1; i <= totalAttempt; i++) {
        getResult(i);
        const newObj = {name: `Test ${String(i)}`};
        testArray.push(newObj);
      }

      console.log('testArray:::::::::::::::', testArray);
      setTotalPage(testArray);
      // setCurrentIndex(1);
    }
  }, [attempt]);

  const getResult = i => {
    const id = route?.params?.qId;
    console.log('id:::::::::2', i);
    customRequest(
      `student/test-result-analytics_single/${id}/${i}`,
      'GET',
    ).then(res => {
      setTestData(res);
      console.log(`getResult::new${i}`, res);
      // setResult(res);
      const newArray = newData;
      let newDatax = res;
      let indexToInsert = i - 1;
      newArray[indexToInsert] = newDatax;
      setCurrentIndex(1);
      setCurrentIndex(0);
      setNewData(newArray);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (newData !== undefined && newData !== null) {
      console.log('test 2:::::::::::', newData, newData?.length);
      const currentData = newData[currentIndex];
      console.log('currentData::::::', currentData, typeof currentData);
      if (currentData?.totalAttempt == 0 || currentData == 'Data Not Found') {
        setNoData(true);
      } else {
        setNoData(false);
        if (currentData !== undefined) {
          console.log('hello 2', currentData);

          let chartOptions = [];

          chartOptions.push({
            value: currentData?.totalQuestion - currentData?.leaveQuestion,
            color: '#32CD32',
            label: 'Attempted',
          });

          chartOptions.push({
            value: currentData?.leaveQuestion,
            color: '#FF0000',
            label: 'Unattempted',
          });

          setQuestionPieChartData(chartOptions);

          let chartOptions1 = [];

          chartOptions1.push({
            value: currentData?.correctAnswer,
            color: '#32CD32',
            label: 'Correct Answer',
          });

          chartOptions1.push({
            value: currentData?.wrongAnswer + currentData?.leaveQuestion,
            color: '#FF0000',
            label: 'Wrong Answer',
          });
          setResultPieChartData(chartOptions1);
        }
      }
    }
  }, [newData, result, currentIndex]);

  function WrongQuestionCard(props) {
    {
      console.log('WrongQuestions', props);
    }
    return (
      <View
        style={[
          localStyles.categoryContainer,
          {
            backgroundColor: 'white',
            elevation: 5,
          },
        ]}>
        <View
          style={{
            height: 300,
            width: getWidth(337) - 35,
            // backgroundColor: props.color,
            borderRadius: 10,
            padding: 12,
            marginRight: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: 12,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'black',
              }}>
              Wrong Question Analysis
            </Text>
          </View>
          <View
            style={{
              height: 2,
              width: getWidth(300) - 36,
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          />
          <View>
            <View style={{height: 12}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 28,
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}>
                <PenU />
              </View>
              <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                Your Answer : {props?.data?.your_answer}
              </Text>
            </View>

            <View style={{height: 12}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 28,
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}>
                <CorrectAnswer />
              </View>
              <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                Correct Answer : {props?.data?.answer}
              </Text>
            </View>
            <View>
              <View style={{height: 12}} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 28,
                    width: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                  }}>
                  <Describe />
                </View>

                <Text style={{marginLeft: 8, fontSize: 16, color: 'grey'}}>
                  Description :
                  {props?.data?.description.replace(/<p>|<\/p>/g, '')}
                </Text>
              </View>
              <View style={{height: 12}} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 28,
                    width: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                  }}>
                  <Bulb />
                </View>
                <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                  Solution :
                  {props?.data?.explaination?.replace(/<p>|<\/p>/g, '')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function LeaveQuestionCard(props) {
    {
      console.log('WrongQuestions', props);
    }
    return (
      <View
        style={{
          backgroundColor: 'white',
          marginHorizontal: 10,
          borderRadius: 10,
          elevation: 5,
          paddingBottom: 20,
        }}>
        <View
          style={{
            height: 250,
            width: getWidth(300) - 35,
            // backgroundColor: props.color,
            borderRadius: 10,
            padding: 12,
            marginRight: 12,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <CText
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'black',
              }}>
              Leaved Question Analysis
            </CText>
          </View>
          <View
            style={{
              height: 2,
              width: getWidth(300) - 36,
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          />
          <View>
            <View style={{height: 12}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 28,
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}>
                <PenU />
              </View>
              <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                Subject : {props?.data?.subject}
              </Text>
            </View>

            <View style={{height: 12}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: 28,
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                }}>
                <CorrectAnswer />
              </View>
              <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                Your Answer : {props?.data?.your_answer}
              </Text>
            </View>
            <View>
              <View style={{height: 12}} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 28,
                    width: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                  }}>
                  <Describe />
                </View>

                <Text style={{marginLeft: 8, fontSize: 16, color: 'grey'}}>
                  Description :
                  {props?.data?.description.replace(/<p>|<\/p>/g, '')}
                </Text>
              </View>
              <View style={{height: 12}} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 28,
                    width: 28,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                  }}>
                  <Bulb />
                </View>
                <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
                  Solution :
                  {props?.data?.explaination?.replace(/<p>|<\/p>/g, '')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (loading) {
    return <CLoader />;
  }

  return (
    <CSafeAreaView style={localStyles.root}>
      <View>
        <FlatList
          data={totalPage}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center', // Center content vertically
                  margin: 5,
                  alignItems: 'center', // Center content horizontally
                }}>
                <TouchableOpacity
                  onPress={() => setCurrentIndex(Number(index))}
                  style={{
                    width: 80,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor:
                      Number(index) === currentIndex
                        ? '#5F5CF0'
                        : 'transparent',
                    backgroundColor:
                      Number(index) === currentIndex ? '#FFF' : 'transparent',
                  }}>
                  <Text
                    style={{
                      color: Number(index) === currentIndex ? 'black' : 'grey',
                      textAlign: 'center', // Center text horizontally within the TouchableOpacity
                    }}>
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <ScrollView>
          {noData ? (
            <Image
              source={{uri: noDataImage}}
              style={{
                width: deviceWidth,
                height: deviceHeight / 2,
                alignSelf: 'center',
                marginTop: '40%',
              }}
            />
          ) : (
            <View>
              {testData.message == 'Undefined array key 0' ? (
                <Image
                  source={{uri: noDataImage}}
                  style={{
                    width: deviceWidth,
                    height: deviceHeight / 2,
                    alignSelf: 'center',
                    marginTop: '40%',
                  }}
                />
              ) : (
                <View>
                  <View>
                    <View style={localStyles.categoryContainer}>
                      <View
                        style={{
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 6,
                          width: getWidth(330) / 2 - 12,
                          elevation: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'grey',
                          }}>
                          Scored Marks :
                        </Text>
                        <Text
                          style={{
                            fontSize: 30,
                            fontWeight: '600',
                            color: 'green',
                          }}>
                          {(
                            newData[currentIndex] &&
                            newData[currentIndex]?.totalMarks
                          )?.toFixed(2)}
                        </Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: 'white',
                          padding: 10,
                          borderRadius: 6,
                          width: getWidth(330) / 2 - 12,
                          elevation: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: 'grey',
                          }}>
                          Accuracy :
                        </Text>
                        {newData[currentIndex] && (
                          <Text
                            style={{
                              fontSize: 30,
                              fontWeight: '600',
                              color: '#F00E21',
                            }}>
                            {(
                              (newData[currentIndex] &&
                                newData[currentIndex]?.correctAnswer /
                                  newData[currentIndex]?.totalAttempt) * 100
                            )?.toFixed(2) >= 0
                              ? (
                                  (newData[currentIndex]?.correctAnswer /
                                    newData[currentIndex]?.totalAttempt) *
                                  100
                                )?.toFixed(2)
                              : 0}
                            %
                          </Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={[
                        localStyles.categoryContainer,
                        {
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          elevation: 5,
                        },
                      ]}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          columnGap: 30,
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Total Question: {newData[currentIndex]?.totalQuestion}
                        </Text>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Total Marks :
                          {newData[currentIndex]?.totalQuestion *
                            newData[currentIndex]?.eachQuestionMark}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: 2,
                          width: '100%',
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
                          data={questionPieChartData}
                          centerLabelComponent={() => {
                            return (
                              <Text style={{fontSize: 25, color: '#4cb050'}}>
                                {(
                                  ((newData[currentIndex]?.totalAttempt -
                                    newData[currentIndex]?.leaveQuestion) /
                                    newData[currentIndex]?.totalQuestion) *
                                  100
                                ).toFixed(2)}
                                %
                              </Text>
                            );
                          }}
                        />
                        <View style={{marginLeft: 20}}>
                          {questionPieChartData.map((item, index) => {
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
                    <View
                      style={[
                        localStyles.categoryContainer,
                        {
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          elevation: 5,
                        },
                      ]}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          columnGap: 25,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Positive Marks:
                          {(
                            newData[currentIndex]?.eachQuestionMark *
                            newData[currentIndex]?.correctAnswer
                          )?.toFixed(2)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Negative Marks :
                          {(
                            newData[currentIndex]?.eachQuestionMark *
                            newData[currentIndex]?.wrongAnswer
                          ).toFixed(2)}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: 2,
                          width: getWidth(300) - 36,
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
                          data={resultPieChartData}
                          centerLabelComponent={() => {
                            return (
                              <Text style={{fontSize: 25, color: '#4cb050'}}>
                                {(
                                  (newData[currentIndex]?.correctAnswer /
                                    newData[currentIndex]?.totalQuestion) *
                                  100
                                ).toFixed(2)}
                                %
                              </Text>
                            );
                          }}
                        />
                        <View style={{marginLeft: 20}}>
                          {resultPieChartData.map((item, index) => {
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
                  </View>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    marginBottom={10}>
                    {newData[currentIndex]?.wrongQuestions
                      ? newData[currentIndex]?.wrongQuestions.map(
                          (item, index) => {
                            return (
                              <WrongQuestionCard key={index} data={item} />
                            );
                          },
                        )
                      : null}
                  </ScrollView>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    marginBottom={40}>
                    {newData[currentIndex]?.leaveQuestions
                      ? newData[currentIndex]?.leaveQuestions.map(
                          (item, index) => {
                            return (
                              <LeaveQuestionCard key={index} data={item} />
                            );
                          },
                        )
                      : null}
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </CSafeAreaView>
  );
};

export default SingleResult;

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
    ...styles.p10,
    ...styles.mh10,
    ...styles.mb15,
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
});
