import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import {Success_Icon} from '../../assets/svgs';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CButton from '../../components/common/CButton';
import {StackNav} from '../../navigation/NavigationKeys';
import {setAsyncStorageData} from '../../utils/helpers';
import {ACCESS_TOKEN} from '../../common/constants';

const Success = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const onPressLoginNow = async () => {
    await setAsyncStorageData(ACCESS_TOKEN, 'access_token');
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabBar}],
    });
  };

  return (
    <CSafeAreaView>
      <View style={localStyles.mainContainer}>
        <Success_Icon />
        <CText type={'s30'} align={'center'} color={colors.primary}>
          {strings.congrats}
        </CText>
        <CText type={'m16'} align={'center'}>
          {strings.successMessage}
        </CText>
      </View>
      <CButton
        type={'S16'}
        title={strings.loginNow}
        color={colors.white}
        onPress={onPressLoginNow}
        containerStyle={localStyles.btnContainerStyle}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.center,
    ...styles.flex,
    ...styles.ph30,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
});

export default Success;
