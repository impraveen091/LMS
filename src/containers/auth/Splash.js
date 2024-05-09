// Library Imports
import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';

// Local Imports
import {colors, styles} from '../../themes';
import {StackNav} from '../../navigation/NavigationKeys';
import {changeThemeAction} from '../../redux/action/themeAction';
import {initialStorageValueGet} from '../../utils/asyncstorage';
import CSafeAreaView from '../../components/common/CSafeAreaView';

const Splash = ({navigation}) => {
  const color = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    // SplashScreen.hide();
    asyncProcess();
  }, []);

  const asyncProcess = async () => {
    try {
      let asyncData = await initialStorageValueGet();
      let {themeColor, onBoardingValue, acessTokenValue} = asyncData;
      if (!!asyncData) {
        if (!!themeColor) {
          if (themeColor === 'light') {
            dispatch(changeThemeAction(colors.light));
          } else {
            dispatch(changeThemeAction(colors.dark));
          }
        }
        if (!!acessTokenValue) {
          navigation.replace(StackNav.TabBar);
        } else if (!!onBoardingValue) {
          navigation.replace(StackNav.Auth);
        } else {
          navigation.replace(StackNav.OnBoarding);
        }
      }
    } catch (e) {
      console.log('error ', e);
    }
  };

  return (
    <CSafeAreaView style={localStyles.container}>
      <ActivityIndicator size="large" color={color.darkColor} />
    </CSafeAreaView>
  );
};

export default Splash;

const localStyles = StyleSheet.create({
  container: {
    ...styles.itemsCenter,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
