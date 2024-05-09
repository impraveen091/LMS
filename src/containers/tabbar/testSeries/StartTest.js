import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import Icons from 'react-native-vector-icons/Entypo';
import PagerView from 'react-native-pager-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../api/axios';
import {customRequest} from '../../../api/customRequest';
import {getHeight, getWidth} from '../../../common/constants';
import {colors} from '../../../themes';
import CText from '../../../components/common/CText';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function StartTest() {
  const [countdown, setCountDown] = useState(0);
  const [currentPagerIndex, setCurrentPagerIndex] = useState(0);
  const pagerRef = useRef();
  const questionTabScrollRef = useRef();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(60);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);
  const [testAttempt, setTestAttempt] = useState([]);
  const [subModuleId, setSubmoduleId] = useState();

  const [questions, setQuestions] = useState([]);
  const SUBMIT = 'student/submit-result';
  const id = route.params.id;
  // const [abc, setAbc] = useState([]);

  const handleSubmitAnswer = async => {
    pagerRef.current.setPage(currentPagerIndex + 1);
    setQuestions(prev => {
      if (prev[currentPagerIndex].correctOption === '') {
        prev[currentPagerIndex].backgroundColor = '#ffa101';
        prev[currentPagerIndex].textColor = 'black';
      } else {
        prev[currentPagerIndex].backgroundColor = '#44b87b';
        prev[currentPagerIndex].textColor = 'white';
      }
      return prev;
    });
    console.log('handleSubmitAnswer', questions);
  };

  useEffect(() => {
    setCountDown(0);
    setIsLoading(false);
    setDuration(0);
    setData([]);
    setTest([]);
    setTestAttempt([]);
    setSubmoduleId();
    setQuestions([]);

    getTestSeries();
  }, []);

  const handleOptionSelect = (index, selected) => {
    const updatedSelectedAnswer = [...testAttempt];

    if (index >= 0 && selected !== null && selected !== undefined) {
      updatedSelectedAnswer[index] = String(selected);
      setTestAttempt(updatedSelectedAnswer);
      var newArray = updatedSelectedAnswer.map(function (value) {
        if (value === '') {
          return String(1);
        } else {
          return String(2);
        }
      });
      setTest(newArray);
    } else if (selected === null) {
      updatedSelectedAnswer[index] = '';
      setTestAttempt(updatedSelectedAnswer);
      var newArray = updatedSelectedAnswer.map(function (value) {
        if (value === '') {
          return String(1);
        } else {
          return String(2);
        }
      });
      setTest(newArray);
    }
  };

  const handleFinalSubmitAnswer = async () => {
    try {
      let token = await AsyncStorage.getItem('tokenStudent');
      // let answer = [...questions.map(e => String(e.correctOption))];
      let questionid = [...questions.map(e => e.qid)];
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };

      const res = await axios.post(
        'student/submit-result',
        {
          submoduleid: subModuleId,
          answer: testAttempt,
          answerStatus: test,
          questionId: questionid,
        },
        config,
      );

      console.log('PostAPIResponse', JSON.stringify(res));
      console.log('PostAPIResponse', JSON.stringify(res?.data));
      console.log('SubmoduleID', subModuleId);
      console.log('Answer', testAttempt, 'AnswerStatus', test);
      console.log('QuestionID', questionid);

      Alert.alert('Test Submitted Successfully');

      navigation.pop();

      //   navigation.navigate(StackNav.TestCard);

      //   setDuration(0);
      //   setCountDown(0);
      // Close the modal after handling the action
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // AsyncStorage.removeItem('token')
        navigation.navigate('LoginScreen');
      } else {
        // Display the error message properly
        Alert.alert('Error', error.message || 'An error occurred');
      }
    }
  };

  const getTestSeries = () => {
    const id = route.params.qId;
    customRequest(`student/test-series/question/${id}`, 'GET').then(res => {
      console.log(temp, 'responseGET:::::::::::::::2', res, '\nid', id);
      // const temp = res.data ? res.data : res;
      const temp = res.data;
      setData(temp);

      setDuration(res.totalminute * 60);
      setSubmoduleId(+res.subModuleId);
      res?.data?.forEach((que, index, id) => {
        setQuestions(prev => {
          prev.push({
            qid: que['id'],
            qno: index + 1,
            question: que['name'],
            option_one: que['option_1'],
            option_two: que['option_2'],
            option_three: que['option_3'],
            option_four: que['option_4'],
            backgroundColor: 'white',
            textColor: 'black',
            correctOption: '',
          });
          return prev;
        });
      });

      setIsLoading(false);
    });
  };

  useEffect(() => {
    console.log('question:::::::::::::::', data);
    if (data !== undefined) {
      const dataLength = data.length;

      const emptyArray = [];
      const unattemptedQuestios = [];
      for (let i = 0; i < dataLength; i++) {
        emptyArray.push('');
        unattemptedQuestios.push('1');
      }
      //   return emptyArray;
      console.log(
        'emptyArray:::::',
        emptyArray,
        '\n answeredQuestion::::',
        unattemptedQuestios,
      );
      setTestAttempt(emptyArray);
    }
  }, [data]);

  const handleEndTest = () => {
    Alert.alert('Exam Ended');
    navigation.pop();
    navigation.navigate(StackNav.TestCard);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 64,
          width: getWidth(375),
          backgroundColor: 'white',
          elevation: 2,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CountdownCircleTimer
            isPlaying
            duration={duration}
            size={46}
            strokeWidth={4}
            colors={['green', '#FF0000']}
            colorsTime={[160, 30]}
            onUpdate={remainingTime => {
              setCountDown(Math.ceil(remainingTime));
            }}
            onComplete={() => {
              Alert.alert('Timeout');
            }}>
            {({remainingTime, animatedColor}) => (
              <View>
                <Text
                  style={{
                    color: animatedColor,
                    color: 'black',
                    fontSize: 14,
                  }}>
                  {toTime(countdown)}
                </Text>
              </View>
            )}
          </CountdownCircleTimer>
          <View style={{marginLeft: 12}}>
            {countdown ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <CText type={'R20'} numberOfLines={1} color="black">
                  {route?.params?.name}
                </CText>
              </View>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleEndTest();
            handleFinalSubmitAnswer();
          }}
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{fontFamily: 'urbanist-bold', color: 'white', fontSize: 14}}>
            END TEST
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{width: getWidth(375), paddingVertical: 6}}>
        <ScrollView
          ref={questionTabScrollRef}
          horizontal
          style={{paddingHorizontal: 8}}>
          {questions.map((question, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  pagerRef.current.setPage(question.qno - 1);
                }}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor:
                    question.qno === currentPagerIndex + 1
                      ? 'green'
                      : question.backgroundColor,
                  borderRadius: 5,
                  marginRight: 8,
                }}>
                <Text
                  style={{
                    color:
                      question.qno === currentPagerIndex + 1
                        ? 'white'
                        : question.textColor,
                    fontSize: 18,
                    fontFamily: 'urbanist-regular',
                  }}>
                  Q.{question.qno}
                </Text>
              </TouchableOpacity>
            );
          })}
          <View style={{width: 8}} />
        </ScrollView>
      </View>
      <View style={{height: getHeight(500), width: getWidth(375)}}>
        <PagerView
          ref={pagerRef}
          style={{height: '100%', width: '100%'}}
          initialPage={0}
          onPageSelected={e => {
            setCurrentPagerIndex(e.nativeEvent.position);
          }}>
          {questions.map((item, index) => {
            return (
              <Question
                key={index}
                questionCount={questions.length}
                question={item}
                onOptionSelect={selected => {
                  handleOptionSelect(index, selected);
                }}
              />
            );
          })}
        </PagerView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginTop: 'auto',
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            pagerRef.current.setPage(currentPagerIndex - 1);
          }}
          style={{
            backgroundColor: '#ffa101',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'urbanist-medium',
              fontSize: 12,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{width: 8}} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            pagerRef.current.setPage(currentPagerIndex + 1);
          }}
          style={{
            backgroundColor: '#ffa101',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'urbanist-medium',
              fontSize: 12,
            }}>
            Next
          </Text>
        </TouchableOpacity>
        <View style={{width: 8}} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleFinalSubmitAnswer}
          style={{
            backgroundColor: '#584dff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'urbanist-medium',
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function toTime(second) {
  const istTime = second;
  const minutes = Math.floor(istTime / 60);
  const seconds = (istTime % (60 * 60)) % 60;
  const istTimeString = `${minutes}:${seconds}`;

  return istTimeString;
}

function Question({question, onOptionSelect, questionCount}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = option => {
    if (option === selectedOption) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  useEffect(() => {
    onOptionSelect(selectedOption);
  }, [selectedOption]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          minHeight: 200,
          backgroundColor: '#f0f4ff',
          paddingHorizontal: 8,
          paddingVertical: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'urbanist-regular',
              fontSize: 14,
            }}>
            {question.qno}/{questionCount}
          </Text>
        </View>

        <RenderHTML
          source={{html: question.question}}
          baseStyle={{color: 'black'}}
          contentWidth={getWidth(375)}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 24,
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleSelectOption(1);
          }}
          style={{
            backgroundColor: selectedOption === 1 ? '#44b87b' : 'white',
            elevation: 30,
            paddingVertical: 12,
            borderRadius: 5,
            paddingHorizontal: 12,
            marginVertical: 6,
          }}>
          <Text
            style={{
              color: selectedOption === 1 ? 'white' : 'black',
              fontSize: 17,
              fontFamily: 'urbanist-regular',
            }}>
            <Text style={{color: selectedOption === 1 ? 'white' : '#584dff'}}>
              A.
            </Text>
            {question.option_one}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleSelectOption(2);
          }}
          style={{
            backgroundColor: selectedOption === 2 ? '#44b87b' : 'white',
            elevation: 30,
            paddingVertical: 12,
            borderRadius: 5,
            paddingHorizontal: 12,
            marginVertical: 6,
          }}>
          <Text
            style={{
              color: selectedOption === 2 ? 'white' : 'black',
              fontSize: 17,
              fontFamily: 'urbanist-regular',
            }}>
            <Text style={{color: selectedOption === 2 ? 'white' : '#584dff'}}>
              B.
            </Text>
            {question.option_two}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleSelectOption(3);
          }}
          style={{
            backgroundColor: selectedOption === 3 ? '#44b87b' : 'white',
            elevation: 30,
            paddingVertical: 12,
            borderRadius: 5,
            paddingHorizontal: 12,
            marginVertical: 6,
          }}>
          <Text
            style={{
              color: selectedOption === 3 ? 'white' : 'black',
              fontSize: 17,
              fontFamily: 'urbanist-regular',
            }}>
            <Text style={{color: selectedOption === 3 ? 'white' : '#584dff'}}>
              C.
            </Text>
            {question.option_three}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            handleSelectOption(4);
          }}
          style={{
            backgroundColor: selectedOption === 4 ? '#44b87b' : 'white',
            elevation: 30,
            paddingVertical: 12,
            borderRadius: 5,
            paddingHorizontal: 12,
            marginVertical: 6,
          }}>
          <Text
            style={{
              color: selectedOption === 4 ? 'white' : 'black',
              fontSize: 17,
              fontFamily: 'urbanist-regular',
            }}>
            <Text style={{color: selectedOption === 4 ? 'white' : '#584dff'}}>
              D.
            </Text>
            {question.option_four}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
