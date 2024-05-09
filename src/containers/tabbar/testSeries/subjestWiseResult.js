import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {getWidth} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {colors} from '../../../themes';
export default function Subjectwise({result}) {
  const [questionPieChartData, setQuestionPieChartData] = useState([]);
  const [resultPieChartData, setResultPieChartData] = useState([]);
  // const [openAccordions, setOpenAccordions] = useState({});
  console.log('Res::lt', result);

  const setPieChart = result => {
    result?.subjectResult?.map(item => {
      const chartOptions = [];

      let attemptedquestions = item?.correct + item?.wrong;
      chartOptions.push({
        value: attemptedquestions,
        color: '#32CD32',
        label: 'Attempted',
      });

      let unattemptedQuestios = item?.count - (item?.correct + item?.wrong);
      chartOptions.push({
        value: unattemptedQuestios,
        color: '#1f77b4',
        label: 'Unattempted',
      });

      setQuestionPieChartData(chartOptions);
    });
    result?.subjectResult?.map(item => {
      const chartOptions1 = [];

      chartOptions1.push({
        value: item?.correct,
        color: '#32CD32',
        label: 'Correct answer',
      });

      chartOptions1.push({
        value: item?.count - item?.correct,
        color: '#FF0000',
        label: 'Wrong answer',
      });

      setResultPieChartData(chartOptions1);
    });
  };

  useEffect(() => {
    setPieChart(result);
  }, [result]);

  useEffect(() => {
    console.log(result, 'result');
  }, []);

  console.log(result, 'result');

  return (
    <ScrollView>
      {result == 'Data Not Found' ? null : (
        <View style={{flex: 1}}>
          <View>
            {result?.subjectResult?.map(item => {
              return (
                <View>
                  <CText
                    type={'r22'}
                    style={{
                      fontWeight: '600',

                      marginHorizontal: 10,
                    }}>
                    Subject:
                    {item?.name}
                  </CText>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 8,
                      paddingTop: 8,
                    }}>
                    <View
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                        padding: 10,
                        borderRadius: 6,
                        width: getWidth(300) / 3,
                      }}>
                      <CText
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'grey',
                        }}>
                        Scored Marks:
                      </CText>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: '600',
                          color: 'green',
                        }}>
                        {item?.correct * result.eachQuestionMark}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                        padding: 10,
                        borderRadius: 6,
                        width: getWidth(310) / 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'grey',
                        }}>
                        Accuracy:
                      </Text>
                      {item && (
                        <Text
                          style={{
                            fontSize: 26,
                            fontWeight: '600',
                            color: '#FF0000',
                          }}>
                          {(
                            (item?.correct / result?.totalAttempt) *
                            100
                          ).toFixed(2)}
                          %
                        </Text>
                      )}
                    </View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        elevation: 5,
                        padding: 10,
                        borderRadius: 6,
                        width: getWidth(330) / 3,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: 'grey',
                        }}>
                        Weightage:
                      </Text>
                      {item && (
                        <Text
                          style={{
                            fontSize: 26,
                            fontWeight: '600',
                            color: 'skyblue',
                          }}>
                          {((item?.count * 100) / result.totalQuestion).toFixed(
                            2,
                          )}
                          %
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.backgroundColor,
                      elevation: 5,
                      marginTop: 8,
                      marginHorizontal: 8,
                      borderRadius: 6,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 12,
                      }}>
                      <CText
                        type={'r20'}
                        style={{
                          fontWeight: '600',
                        }}>
                        Total Question:
                        {item?.count}
                      </CText>
                      <CText
                        type={'r20'}
                        style={{
                          fontWeight: '600',
                        }}>
                        Total Marks :{result.eachQuestionMark * item?.count}
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
                        justifyContent: 'center',
                      }}>
                      <PieChart
                        donut
                        innerRadius={50}
                        radius={70}
                        data={resultPieChartData}
                        centerLabelComponent={() => {
                          return (
                            <Text style={{fontSize: 25, color: '#4cb050'}}>
                              {((item?.correct / item.count) * 100).toFixed(2)}%
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 12,
                    }}>
                    <CText
                      type={'r16'}
                      style={{
                        fontWeight: '600',
                      }}>
                      Positive Marks:
                      {(result?.eachQuestionMark * item?.correct).toFixed(2) +
                        ' '}
                    </CText>
                    <CText
                      type={'r16'}
                      style={{
                        fontWeight: '600',
                      }}>
                      Negative Marks :
                      {(result.eachQuestionMark * item?.wrong).toFixed(2) + ' '}
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
                      justifyContent: 'center',
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
                              ((item?.correct + item?.wrong) / item.count) *
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
              );
            })}
          </View>
        </View>
      )}
    </ScrollView>
  );
}
