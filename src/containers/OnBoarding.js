import React, {useState, useRef, useCallback} from 'react';
import {StyleSheet, FlatList, Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {OnBoardingSlide} from '../api/constant';
import {deviceWidth, moderateScale} from '../common/constants';
import CButton from '../components/common/CButton';
import CText from '../components/common/CText';
import strings from '../i18n/strings';
import {StackNav} from '../navigation/NavigationKeys';
import {styles} from '../themes';
import {setOnBoarding} from '../utils/asyncstorage';
import CSafeAreaView from '../components/common/CSafeAreaView';

const RenderOnboardingItem = ({item}) => {
  const colors = useSelector(state => state.theme.theme);
  return (
    <View style={localStyles.rendetItemConatiner}>
      <Image
        source={item.image}
        resizeMode="contain"
        style={localStyles.imageStyle}
      />
      <View style={styles.mt30}>
        <CText type={'B24'} align={'center'}>
          {item.title}
        </CText>
        <CText
          type={'R14'}
          align={'center'}
          style={styles.mt15}
          color={colors.textColor2}>
          {item.subtitle}
        </CText>
      </View>
    </View>
  );
};

const OnBoarding = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const _onViewableItemsChanged = useCallback(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);
  const _viewabilityConfig = {itemVisiblePercentThreshold: 50};

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{name: StackNav.Auth}],
      });
    } else {
      slideRef.current._listRef._scrollRef.scrollTo({
        x: deviceWidth * (currentIndex + 1),
      });
    }
  };

  return (
    <CSafeAreaView style={styles.flex}>
      <FlatList
        data={OnBoardingSlide}
        ref={slideRef}
        renderItem={({item, index}) => <RenderOnboardingItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        pagingEnabled
      />
      <View style={styles.rowCenter}>
        {OnBoardingSlide.map((_, index) => (
          <View
            style={[
              localStyles.bottomIndicatorStyle,
              {
                width:
                  index !== currentIndex
                    ? moderateScale(10)
                    : moderateScale(20),
                backgroundColor:
                  index !== currentIndex ? colors.lightPrimary : colors.primary,
              },
            ]}
          />
        ))}
      </View>
      <CButton
        title={currentIndex === 2 ? strings.continue : strings.next}
        containerStyle={localStyles.submitButton}
        type={'M18'}
        color={colors.white}
        onPress={onPressRightArrow}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mt15,
    ...styles.mb10,
    ...styles.mh25,
  },
  rendetItemConatiner: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  imageStyle: {
    height: '65%',
    width: deviceWidth - moderateScale(40),
    resizeMode: 'contain',
  },
  bottomIndicatorStyle: {
    height: moderateScale(10),
    ...styles.mt10,
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
  bottomStyle: {
    ...styles.pv10,
    ...styles.center,
    ...styles.ph20,
  },
});

export default OnBoarding;
