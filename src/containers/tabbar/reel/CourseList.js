// Libraries import
import {
  Pressable,
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import {
  deviceHeight,
  deviceWidth,
  getWidth,
  noDataImage,
} from '../../../common/constants';
import * as Progress from 'react-native-progress';
import Book from '../../../assets/svgs/book.svg';
import Timer from '../../../assets/svgs/time_icon.svg';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState, useCallback} from 'react';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {useSelector} from 'react-redux';
import {StackNav} from '../../../navigation/NavigationKeys';
import {Video_Course_List} from '../../../api/Url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../../api/customRequest';
import Categories from '../home/screens/Categories';
import CText from '../../../components/common/CText';
import CButton from '../../../components/common/CButton';
import {styles} from '../../../themes';
import CHeader from '../../../components/common/CHeader';
import LoginButton from '../../../components/common/LoginButton';

export default function CourseList() {
  const isFocused = useIsFocused();
  const [videoCourseList, setVideoCourseList] = useState([]);
  const [openDataList, setOpenDataList] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  const openData = async () => {
    customRequest('student/universalcoursevideolist', 'GET').then(res => {
      // console.log('response', res);
      setOpenDataList(res);
    });
  };
  const getVideoList = async () => {
    customRequest('student/coursevideolist', 'GET').then(res => {
      // console.log('response', res);
      setVideoCourseList(res);
      return;
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      getVideoList();
      openData();
    }
  }, [isFocused]);
  return (
    <CSafeAreaView style={styles.flex}>
      {authenticated ? (
        videoCourseList?.length == 0 ? (
          <Image
            source={{uri: noDataImage}}
            style={{
              width: deviceWidth,
              height: deviceHeight / 2,
              alignSelf: 'center',
              marginTop: '50%',
            }}
          />
        ) : (
          <View>
            <CHeader
              title={'Video Course'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />

            <Categories data={videoCourseList} />
          </View>
        )
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
              title={' Free Video Course'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <Categories data={openDataList} />
        </View>
      )}
    </CSafeAreaView>
  );
}
const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    margin: 10,
    justifyContent: 'center',
  },
  cardImage: {
    height: deviceWidth / 2,
    borderRadius: 10,
  },
  text: {fontWeight: '500', fontSize: 16, color: 'black'},
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
