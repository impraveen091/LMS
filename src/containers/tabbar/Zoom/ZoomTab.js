import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  useColorScheme,
  NativeEventEmitter,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ZoomUs from 'react-native-zoom-us';

import {useSelector} from 'react-redux';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNav} from '../../../navigation/NavigationKeys';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {
  deviceHeight,
  deviceWidth,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CButton from '../../../components/common/CButton';
import {styles} from '../../../themes';
import {customRequest} from '../../../api/customRequest';
import LoginButton from '../../../components/common/LoginButton';
import CLoader from '../../../components/common/CLoader';
import LottieView from 'lottie-react-native';

export default function ZoomTab() {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [list, setList] = useState([]);
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      const user = await AsyncStorage.getItem('user');
      setName(JSON.parse(user));
      setAuthenticated(true);
      getMeetingData();
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
      await AsyncStorage.removeItem('tokenStudent');
    }
  };

  const initializeZoom = async (token, id) => {
    try {
      await ZoomUs.initialize({
        jwtToken: token,
      });
      getMeetingId(id);
    } catch (error) {
      console.error('Error initializing Zoom:', error);
    }
  };

  const startMeeting = async (id, pass) => {
    console.log('Start Meeting', id, pass, token, name);
    setLoader(false);
    try {
      const startMeetingResult = await ZoomUs.joinMeeting({
        userName: name,
        meetingNumber: id,
        password: pass,
        zoomAccessToken: token,
        noMeetingErrorMessage: true,
        autoConnectAudio: true,
        noInvite: true,
        //  noTitlebar: true,
        //noTextMeetingId: true,
        //  noTextPassword: true,
      });

      console.log({startMeetingResult});
    } catch (e) {
      Alert.alert('Error', 'Could not execute startMeeting');
      console.error('ERR', e);
    }
  };

  const getMeetingData = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    setToken(token);
    console.log('token--', token);
    let formBody = [];

    formBody = formBody.join('&');
    await fetch('https://lmscode.chahalacademy.com/api/student-liveclass', {
      method: 'GET',
      body: formBody,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(result => {
      result.json().then(response => {
        try {
          if (response?.message === 'Unauthenticated.') {
            setAuthenticated(false);
          } else {
            console.log('Classresponse', response);
            setLoader(false);
            // setResponseData(response);
            const course = response?.map(e => e.course).flat();
            console.log(course, 'courseResponse');
            const coursesWithLiveClass = course.filter(
              e => e.course_relation_liveclass.length > 0,
            );
            console.log(coursesWithLiveClass, 'filter');
            const coursebatchrelation = coursesWithLiveClass
              ?.map(e => {
                //  console.log(e,"ee")
                const cname = e.name;
                const coursebatchrelation = [];
                e?.course_relation_liveclass?.map(r => {
                  // console.log(r,"rrr")
                  coursebatchrelation?.push(Object.assign(r, {cname: cname}));
                });
                return coursebatchrelation;
              })
              .flat();
            console.log(coursebatchrelation, 'course batch');
            const batch_detail_relation = coursebatchrelation
              ?.map(e => {
                //  console.log(e,"eee")
                const cname = e.cname;
                const batch_detail_relation = [];
                e?.livevideocourserelation?.map(r => {
                  // console.log(r,"rrr")
                  batch_detail_relation.push(Object.assign(r, {cname: cname}));
                });
                return batch_detail_relation;
              })
              .flat();
            console.log(batch_detail_relation, 'course batch relation');
            const batch_relation = batch_detail_relation
              ?.map(e => {
                // console.log(e,"eee")

                const cname = e.cname;
                const batch_relation = [];
                e?.liveclassvideo?.map(r => {
                  batch_relation.push(Object.assign(r, {cname: cname}));
                });
                console.log(batch_relation, 'batch');
                return batch_relation;
              })
              .flat();
            setList(batch_relation);

            setAuthenticated(true);
          }
        } catch (error) {}
        //
      });
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    setRefreshing(false);
  };

  const getMeetingId = async id => {
    let token = await AsyncStorage.getItem('tokenStudent');
    setToken(token);
    console.log('token--', token);
    let formBody = [];

    formBody = formBody.join('&');
    await fetch(
      'https://lmscode.chahalacademy.com/api/student-liveclass-join/' + id,
      {
        method: 'GET',
        body: formBody,
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    ).then(result => {
      result.json().then(response => {
        try {
          let ids = response.meeting_id;
          let pass = response.password;
          startMeeting(ids, pass);
        } catch (error) {
          console.log('error', error);
        }
        //
      });
    });
  };

  const generateJWTToken = async id => {
    let dataToSend = {
      meetingNumber: id,
    };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    await fetch('https://zoomtoken.stellarflux.com/api/zoom-jwt', {
      method: 'POST',
      body: formBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(result => {
      result.json().then(response => {
        console.log('response------', response);
        try {
          let token = response.signature;
          initializeZoom(token, id);
        } catch (error) {
          console.log('error to genertae');
        }
      });
    });
  };

  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        <View>
          {loader && <CLoader />}

          <CHeader
            title={'Live Class'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <View style={{paddingHorizontal: 10}}>
            {list?.length == 0 ? (
              <Image
                source={{uri: noDataImage}}
                style={{
                  width: deviceWidth,
                  height: deviceHeight / 2,
                  alignSelf: 'center',
                  marginTop: '35.5%',
                }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 120, paddingBottom: 50}}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {list?.map((mainItem, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: getWidth(355),
                        backgroundColor: colors.inputBg,
                        elevation: 5,
                        marginTop: 10,
                        borderRadius: 10,
                        padding: 10,
                        marginBottom: 10,
                        flexDirection: 'row',
                      }}>
                      <View>
                        <Image
                          source={{
                            uri: 'https://img.freepik.com/free-vector/people-education-online-with-laptops-illustration-design_24877-63613.jpg?w=900&t=st=1704708796~exp=1704709396~hmac=c5d48bf72bc9e05557cf88e8017c0d121ff97cc03986cf6b2aa62826d7a8a7ba',
                          }}
                          style={{
                            width: 150,
                            height: 120,
                            borderRadius: 5,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          marginHorizontal: 10,
                          rowGap: 3,
                        }}>
                        <CText
                          type={'r14'}
                          style={{
                            fontSize: 15,
                          }}>
                          Class -
                          <CText
                            type={'b14'}
                            style={{
                              fontWeight: '600',
                            }}>
                            {mainItem.title}
                          </CText>
                        </CText>
                        <CText
                          type={'r14'}
                          style={{
                            marginTop: 5,
                          }}>
                          Time -
                          <CText
                            type={'b14'}
                            style={{
                              fontWeight: '600',
                            }}>
                            {mainItem?.start.split(' ')[1]}
                          </CText>
                        </CText>
                        <CText
                          type={'r14'}
                          style={{
                            marginTop: 5,
                          }}>
                          Date -
                          <CText
                            type={'b14'}
                            style={{
                              fontWeight: '600',
                            }}>
                            {moment(mainItem?.start.split(' ')[0]).format(
                              'DD-MM-YYYY',
                            )}
                          </CText>
                        </CText>
                        <TouchableOpacity
                          onPress={() => {
                            setLoader(true);
                            let id = mainItem.id;
                            console.log('iss--->', id);
                            generateJWTToken(id);
                          }}
                          style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 50,
                          }}>
                          <Text
                            style={{
                              backgroundColor: '#4b51e8',
                              borderRadius: 8,
                              color: 'white',
                              paddingHorizontal: 30,
                              paddingVertical: 8,
                            }}>
                            Join
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
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
              title={'Zoom Class'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <LottieView
            source={require('../../../assets/lottie/login.json')}
            autoPlay
            loop
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }}
          />
        </View>
      )}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customViewer: {
    width: '100%',
    flex: 1,
  },
  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
