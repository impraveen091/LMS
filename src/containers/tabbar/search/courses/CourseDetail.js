import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {moderateScale} from '../../../../common/constants';
import CText from '../../../../components/common/CText';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {styles} from '../../../../themes';
import WebView from 'react-native-webview';
import Base64 from 'react-native-base64';
import About from './About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Content from './Content';
import {customRequest} from '../../../../api/customRequest';

const CourseDetail = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentTab, setCurrentTab] = useState('About');
  const colors = useSelector(state => state.theme.theme);
  const playerRef = useRef(null);
  const myObject = {videoid: route.params?.link, token: token, height: 250};
  const myObjectForUnauth = {
    videoid: route.params?.linkC,
    token: token,
    height: 250,
  };
  const base64String = Base64.encode(JSON.stringify(myObject));
  const base64StringUnAuth = Base64.encode(JSON.stringify(myObjectForUnauth));
  console.log('base64----', base64String);
  console.log('base64unAuth----', base64StringUnAuth);

  console.log(
    'previous',
    route?.params?.linkC,
    route?.params?.link,
    route?.params?.title,
    route?.params?.description,
    route?.params?.pdf,
  );

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      setToken(await AsyncStorage.getItem('tokenStudent'));
      setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    setRefreshing(false);
  };

  const TabTitle = ({title}) => {
    return (
      <TouchableOpacity
        onPress={() => setCurrentTab(title)}
        style={[
          localStyles.tabTitle,
          {
            backgroundColor:
              currentTab == title ? colors.primary : colors.tranparent,
          },
        ]}>
        <CText
          type={'m14'}
          color={
            currentTab == title ? colors.white : colors.notSelectedTextColor
          }>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  const removeHtmlTags = htmlString => {
    return htmlString.replace(/<[^>]*>/g, '');
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      {authenticated ? (
        <View>
          <View style={{height: 250}}>
            <WebView
              ref={playerRef}
              allowsFullscreenVideo={true}
              source={{
                uri: `https://lmsvideos.chahalacademy.com/?data=${base64String}`,
              }}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View
              style={[
                localStyles.container2,
                {
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              <View style={localStyles.titleContainer}>
                <CText type={'s24'}>{route?.params?.title}</CText>
              </View>

              <View style={localStyles.tabContainer}>
                <View
                  style={[
                    localStyles.tabBar,
                    {backgroundColor: colors.inputBg},
                  ]}>
                  <TabTitle title="About" />
                  <TabTitle title="Notes" />
                  {/* <TabTitle title="Reviews" /> */}
                </View>
                {currentTab == 'About' ? (
                  <About
                    description={
                      route.params?.description == null
                        ? 'No Description'
                        : removeHtmlTags(route?.params?.description)
                    }
                  />
                ) : null}
                {currentTab == 'Notes' ? (
                  <Content pdfs={route?.params?.pdfs} />
                ) : null}
                {/* {currentTab == 'Reviews' ? <Reviews /> : null} */}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View>
          <View style={{height: 250}}>
            <WebView
              height={250}
              ref={playerRef}
              allowsFullscreenVideo={true}
              source={{
                uri: `https://lmsvideos.chahalacademy.com/without_login?data=${base64StringUnAuth}`,
              }}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                localStyles.container2,
                {
                  backgroundColor: colors.backgroundColor,
                },
              ]}>
              <View style={localStyles.titleContainer}>
                <CText type={'s24'}>{route?.params?.title}</CText>
              </View>

              <View style={localStyles.tabContainer}>
                <View
                  style={[
                    localStyles.tabBar,
                    {backgroundColor: colors.inputBg},
                  ]}>
                  <TabTitle title="About" />
                  <TabTitle title="Notes" />
                </View>
                {currentTab == 'About' ? (
                  <About
                    description={
                      route.params?.description == null
                        ? 'No Description'
                        : removeHtmlTags(route?.params?.description)
                    }
                  />
                ) : null}
                {currentTab == 'Notes' ? (
                  <Content pdfs={route?.params?.pdfs} />
                ) : null}
                {/* {currentTab == 'Reviews' ? <Reviews /> : null} */}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </CSafeAreaView>
  );
};

export default CourseDetail;
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    height: Dimensions.get('window').height,
  },
  courseVideo: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
  videoControl: {
    position: 'absolute',
    ...styles.p20,
    ...styles.pb30,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    ...styles.justifyBetween,
  },
  videoControlContainer: {
    ...styles.rowSpaceBetween,
  },
  playButtonContainer: {
    ...styles.selfCenter,
  },
  slider: {
    flex: 1,
  },
  videoControlContainer2: {
    ...styles.rowSpaceBetween,
  },
  controlStyle: {
    ...styles.rowSpaceBetween,
    gap: moderateScale(10),
  },
  container2: {
    ...styles.flex,
    borderTopEndRadius: moderateScale(20),
    borderTopStartRadius: moderateScale(20),
    ...styles.pb60,
    ...styles.pv20,
  },
  titleContainer: {
    ...styles.mh20,
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  detailContainer: {
    ...styles.flexRow,
    gap: moderateScale(10),
    ...styles.mh20,
  },
  detailInfo: {
    gap: moderateScale(5),
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  tabBar: {
    borderRadius: moderateScale(50),
    ...styles.rowSpaceBetween,
    padding: moderateScale(8),
    ...styles.mt25,
    ...styles.mh20,
  },
  tabTitle: {
    ...styles.p10,
    ...styles.center,
    ...styles.flex,
    borderRadius: moderateScale(50),
  },
  bottomContainer: {
    ...styles.rowSpaceBetween,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '10%',
    ...styles.p10,
    ...styles.ph20,
  },
  saveBtn: {
    borderWidth: moderateScale(1),
    width: moderateScale(48),
    borderRadius: moderateScale(18),
    height: moderateScale(48),
  },
  enrollBtn: {
    width: '80%',
    height: moderateScale(48),
  },
  box: {
    flexDirection: 'row',
  },
});
