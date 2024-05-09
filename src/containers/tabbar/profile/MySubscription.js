import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  Alert,
  ToastAndroid,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  THEME,
  courseImage,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import {MyProfile} from '../../../api/constant';
import CText from '../../../components/common/CText';
import {colors as themeColor, styles} from '../../../themes';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import CButton from '../../../components/common/CButton';
import {customRequest} from '../../../api/customRequest';
import {Document} from 'react-native-render-html';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {StackNav} from '../../../navigation/NavigationKeys';
import CHeader from '../../../components/common/CHeader';
import Money from '../../../assets/svgs/money.svg';
import Calendar from '../../../assets/svgs/calendar.svg';
import LottieView from 'lottie-react-native';
import LoginButton from '../../../components/common/LoginButton';
const MySubscription = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const today = moment(new Date()).format('YYYY-MM-DD');
  console.log('today', today, typeof today);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const subscriptionApi = () => {
    customRequest('student/my-subscriptions', 'GET').then(res => {
      console.log('subscriptionApi', res);
      setSubscriptionData(res);
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      subscriptionApi();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    subscriptionApi();
    setRefreshing(false);
  };

  const dateFormatter = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        <View>
          <CHeader
            title={'My Courses'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <ScrollView
            style={{marginBottom: 70}}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {subscriptionData.length > 0 ? (
              subscriptionData?.map((item, index) => {
                console.log('item', item);
                return (
                  <View
                    key={index}
                    style={{
                      width: getWidth(357),
                      height: getHeight(150),
                      marginHorizontal: 10,
                      marginTop: 20,
                      padding: 10,
                      backgroundColor: 'white',
                      borderRadius: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderColor: item?.expiry_date > today ? 'green' : 'red',
                      borderWidth: 2,
                      columnGap: 18,
                      backgroundColor: colors.backgroundColor,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{height: 120, aspectRatio: 1}}
                      source={
                        item?.course[0]?.image
                          ? {uri: item?.course[0]?.image}
                          : {uri: courseImage}
                      }
                    />
                    <View style={{width: '65%', rowGap: 10}}>
                      <CText type={'b16'} numberOfLines={1}>
                        {item?.course[0]?.name}
                      </CText>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <View style={{rowGap: 5}}>
                          <View style={{flexDirection: 'row', columnGap: 10}}>
                            <Money style={{height: 20, width: 20}} />
                            <CText>₹{item?.course[0]?.amount}</CText>
                          </View>

                          <View style={{flexDirection: 'row', columnGap: 10}}>
                            <Calendar height={20} width={20} />
                            <CText>{dateFormatter(item?.start_date)}</CText>
                          </View>

                          <View style={{flexDirection: 'row', columnGap: 10}}>
                            <Calendar height={20} width={20} />
                            <CText>{dateFormatter(item?.expiry_date)}</CText>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            paddingHorizontal: 11,
                          }}>
                          <CText
                            type={'b16'}
                            style={{
                              alignSelf: 'flex-start',
                              color:
                                item?.expiry_date < today ? 'red' : 'green',
                            }}>
                            {item?.expiry_date < today ? 'Expired' : 'Active'}
                          </CText>
                          <CText
                            type={'b16'}
                            color={
                              item?.course[0]?.amount == 0
                                ? 'green'
                                : colors.primary
                            }>
                            {item?.course[0]?.amount == 0 ? 'Free' : 'Paid'}
                          </CText>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })
            ) : (
              <Image
                style={{
                  width: getWidth(355),
                  aspectRatio: 1,
                  marginTop: getWidth(100),
                }}
                source={{uri: noDataImage}}
              />
            )}
          </ScrollView>
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
              title={'My Courses'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <LottieView
            source={require('../../../assets/lottie/login.json')}
            autoPlay // Start playing automatically
            loop // Repeat the animation
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }} // Adjust dimensions as needed
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default MySubscription;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  container: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    top: moderateScale(-30),
  },
  profileCover: {
    width: '100%',
    height: moderateScale(170),
  },

  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: moderateScale(2),
    top: moderateScale(-50),
    ...styles.selfCenter,
    position: 'absolute',
  },
  innerContainer: {
    ...styles.pl10,
    ...styles.pr10,
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
