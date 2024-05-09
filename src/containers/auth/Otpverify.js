import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useSelector} from 'react-redux';

import {getHeight, moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import typography from '../../themes/typography';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import {Otp_Illustration} from '../../assets/svgs';
import CText from '../../components/common/CText';
import CButton from '../../components/common/CButton';
import strings from '../../i18n/strings';
import {StackNav} from '../../navigation/NavigationKeys';

const Otpverify = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const [pin, setPin] = useState('');

  const onPinChange = code => setPin(code);

  const onPressVerify = () => {
    navigation.navigate(StackNav.CreatePassword);
  };

  return (
    <CSafeAreaView>
      <CKeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <View style={styles.rowCenter}>
            <Otp_Illustration />
          </View>
          <CText type={'b24'} align={'center'}>
            {strings.otpVerificationCode}
          </CText>
          <View style={styles.mt10}>
            <CText type={'r14'} align={'center'}>
              {strings.enterFourDigitCode}
            </CText>
            <CText type={'s14'} align={'center'}>
              {'+84 123 424 998'}
            </CText>
          </View>
          <OTPInputView
            pinCount={4}
            code={pin}
            onCodeChanged={onPinChange}
            autoFocusOnLoad={false}
            codeInputFieldStyle={[
              localStyles.pinInputStyle,
              {
                color: colors.textColor,
                backgroundColor: colors.inputBg,
                borderColor: colors.inputBg,
              },
            ]}
            codeInputHighlightStyle={{
              borderColor: colors.primary,
            }}
            style={localStyles.inputStyle}
            secureTextEntry={true}
          />
        </View>
        <View style={localStyles.resendContainer}>
          <CText type={'r14'}>{strings.didntReceiveCode}</CText>
          <CText type={'s16'} color={colors.primary}>
            {strings.resendCode}
          </CText>
        </View>
        <CButton
          type={'S16'}
          title={strings.verify}
          color={colors.white}
          onPress={onPressVerify}
          containerStyle={localStyles.btnContainerStyle}
        />
      </CKeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  inputStyle: {
    height: getHeight(60),
    ...styles.mv30,
  },
  pinInputStyle: {
    height: moderateScale(56),
    width: moderateScale(56),
    borderRadius: moderateScale(16),
    ...typography.fontSizes.f24,
    ...typography.fontWeights.Medium,
  },
  root: {
    ...styles.mt30,
    ...styles.ph30,
    ...styles.flex,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
  resendContainer: {
    ...styles.rowStart,
    ...styles.mh30,
    ...styles.mb20,
    ...styles.selfCenter,
  },
});

export default Otpverify;
