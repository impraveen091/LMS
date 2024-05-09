import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import {Success_Icon} from '../../../../assets/svgs';
import {styles} from '../../../../themes';
import CText from '../../../../components/common/CText';
import strings from '../../../../i18n/strings';
import CButton from '../../../../components/common/CButton';
import {moderateScale} from '../../../../common/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../../navigation/NavigationKeys';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressGotoCourse = () => {
    navigation.navigate(StackNav.TabBar);
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <View style={localStyles.successContainer}>
        <Success_Icon />
        <CText
          type={'s30'}
          style={styles.mt15}
          align="center"
          color={colors.primary}>
          {strings.congrats}
        </CText>
        <CText type={'m16'} style={styles.mt10} align="center">
          {strings.paymentSuccessMessage}
        </CText>
      </View>
      <CButton
        title={strings.goToCourse}
        type="s16"
        onPress={onPressGotoCourse}
        containerStyle={localStyles.button}
        bgColor={colors.primary}
        color={colors.white}
      />
    </CSafeAreaView>
  );
};

export default PaymentSuccess;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.justifyBetween,
  },
  successContainer: {
    ...styles.itemsCenter,
    ...styles.selfCenter,
    ...styles.mt150,
  },
  button: {
    ...styles.mh25,
    ...styles.mb10,
    height: moderateScale(48),
  },
});
