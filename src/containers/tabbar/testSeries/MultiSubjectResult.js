import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {styles} from '../../../themes';

import {
  deviceHeight,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';

import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {customRequest} from '../../../api/customRequest';
import {PieChart} from 'react-native-gifted-charts';
import Subjectwise from './subjestWiseResult';
import CorrectAnswer from '../../../assets/svgs/correctAnswer.svg';
import Bulb from '../../../assets/svgs/bulb.svg';
import PenU from '../../../assets/svgs/tabBarIcons/light/penU.svg';
import Describe from '../../../assets/svgs/tabBarIcons/dark/test_unfill.svg';
import CText from '../../../components/common/CText';
// import CustomLoader from '../home/customLoader';
const [noData, setNoData] = useState(false);

const MultiSubjectResult = () => {
  const colors = useSelector(state => state.theme.theme);
  const [data, setData] = useState('');
  const [result, setResult] = useState('');
  const [attempt, setAttempt] = useState('');
  const [questionPieChartData, setQuestionPieChartData] = useState([]);
  const [status, setStatus] = useState('');
  const [resultPieChartData, setResultPieChartData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [alter, setAlter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalPage, setTotalPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const getData = () => {
    const qId = route.params.qId;
    console.log('ID', qId);
    customRequest(`student/test-attempts/${qId}`, 'GET').then(res => {
      console.log('Course::::::::::', res, res?.status);

      setData(res);
      setAttempt(res?.attempt);
    });
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  useEffect(() => {
    if (attempt) {
      const totalAttempt = Number(attempt);
      console.log('tota', totalAttempt);
      const testArray = [];

      for (let i = 1; i <= totalAttempt; i++) {
        getResult(i);
        const newObj = {name: `Test ${String(i)}`};
        testArray.push(newObj);
      }
      setTotalPage(testArray);
    }
  }, [attempt]);

  const getResult = i => {
    const id = route?.params?.qId;
    console.log('getREs', id);
    console.log('getREs', i);
    customRequest(
      `student/test-result-analytics/${route?.params?.qId}/${Number(i)}`,
      'GET',
    ).then(res => {
      console.log('stringyRes', res);
      console.log('stringy', JSON.stringify(res));
      console.log('getResult1111111::', i, 'qwert:::', res);
      setLoading(false);
      if (res == 'Data Not Found') {
        setNoData(true);
      } else {
        setNoData(false);
        if (res?.length !== null) {
          console.log('test 1:::', res);
          // newData.push(res);
          // Index where you want to insert the new data
          const newArray = newData;
          let newDatax = res;
          let indexToInsert = i - 1;
          newArray[indexToInsert] = newDatax;
          setCurrentIndex(1);
          setCurrentIndex(0);
          setNewData(newArray);
          setAlter(!alter);
        }
      }

      setAlter(!alter);
    });
  };

  useEffect(() => {
    if (newData !== undefined && newData !== null) {
      console.log('test 2:::::::::::', newData, newData?.length);
      console.log(
        'testData',
        newData[currentIndex],
        typeof newData[currentIndex],
      );
      const currentData = newData[currentIndex];
      console.log('currentData::::::', currentData, typeof currentData);

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
        setLoading(false);
      }
    }
  }, [newData, alter, currentIndex]);

  function WrongQuestionCard(props) {
    return (
      <View
        style={[
          localStyles.categoryContainer,
          {
            backgroundColor: colors.backgroundColor,
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
              Subject Wise Analysis
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
    return (
      <View
        style={[
          localStyles.categoryContainer,
          {
            backgroundColor: colors.backgroundColor,
            elevation: -5,
          },
        ]}>
        <View
          style={{
            height: 250,
            width: getWidth(305),
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
                fontSize: 22,
                fontWeight: '600',
                color: 'black',
              }}>
              Leaved Question Analysis
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

                <Text style={{marginLeft: 8, fontSize: 15, color: 'grey'}}>
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
                  {props?.data?.explaination.replace(/<p>|<\/p>/g, '')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  // if (loading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <CSafeAreaView
      style={[
        localStyles.root,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      {loading ? (
        <ActivityIndicator color="#5F5CF0" marginTop={'60%'} size={40} />
      ) : (
        <View>
          <FlatList
            data={totalPage}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    justifyContent: 'center', // Center content vertically
                    alignItems: 'center', // Center content horizontally
                    margin: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentIndex(Number(index));
                      console.log(Number(index), 'currentIndex');
                    }}
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
                    <CText
                      style={{
                        color:
                          Number(index) === currentIndex ? 'black' : 'grey',
                        textAlign: 'center', // Center text horizontally within the TouchableOpacity
                      }}>
                      {item?.name}
                    </CText>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <ScrollView>
            {newData[currentIndex] == undefined ||
            newData[currentIndex] == null ? (
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
                  <View
                    style={[
                      localStyles.categoryContainer,
                      {
                        backgroundColor: colors.backgroundColor,
                        elevation: 5,
                        flexDirection: 'row',
                        columnGap: 10,
                      },
                    ]}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                        padding: 10,
                        borderRadius: 6,
                        width: getWidth(330) / 2 - 12,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'grey',
                        }}>
                        Scrored Marks :
                      </Text>
                      <Text
                        style={{
                          fontSize: 35,
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
                        elevation: 5,
                        padding: 10,
                        borderRadius: 6,
                        width: getWidth(300) / 2 - 12,
                        height: getHeight(90),
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
                            fontSize: 28,
                            fontWeight: '600',
                            color: '#F00E21',
                          }}>
                          {(
                            (newData[currentIndex]?.correctAnswer /
                              newData[currentIndex]?.totalAttempt) *
                            100
                          ).toFixed(2) >= 0
                            ? (
                                (newData[currentIndex]?.correctAnswer /
                                  newData[currentIndex]?.totalAttempt) *
                                100
                              ).toFixed(2)
                            : 0}
                          %
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    localStyles.categoryContainer,
                    {
                      backgroundColor: colors.backgroundColor,
                      elevation: 5,
                      flexDirection: 'column',
                    },
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      columnGap: 25,
                    }}>
                    <CText type={'r20'} style={{fontWeight: '600'}}>
                      Total Question: {newData[currentIndex]?.totalQuestion}
                    </CText>
                    <CText
                      type={'r20'}
                      style={{
                        fontWeight: '600',
                      }}>
                      Total Marks :
                      {newData[currentIndex]?.totalQuestion *
                        newData[currentIndex]?.eachQuestionMark}
                    </CText>
                  </View>

                  <View
                    style={{
                      height: 2,
                      width: getWidth(300),
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
                      backgroundColor: colors.backgroundColor,
                      elevation: 5,
                      flexDirection: 'column',
                    },
                  ]}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      columnGap: 25,
                    }}>
                    <CText
                      type={'r16'}
                      style={{
                        fontWeight: '600',
                      }}>
                      Positive Marks:
                      {(
                        newData[currentIndex]?.eachQuestionMark *
                        newData[currentIndex]?.correctAnswer
                      ).toFixed(2)}
                    </CText>
                    <CText
                      type={'r16'}
                      style={{
                        fontWeight: '600',
                      }}>
                      Negative Marks :
                      {(
                        newData[currentIndex]?.negativeMark *
                        newData[currentIndex]?.wrongAnswer
                      ).toFixed(2)}
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
                          <Text style={{fontSize: 25, color: '#32CD32'}}>
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

                <Subjectwise result={newData[currentIndex]} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {newData[currentIndex]?.wrongQuestions
                    ? newData[currentIndex]?.wrongQuestions.map(
                        (item, index) => {
                          return <WrongQuestionCard key={index} data={item} />;
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
                          return <LeaveQuestionCard key={index} data={item} />;
                        },
                      )
                    : null}
                </ScrollView>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </CSafeAreaView>
  );
};

export default MultiSubjectResult;

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
