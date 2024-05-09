import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import CSafeAreaView from '../../components/common/CSafeAreaView';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import CButton from '../../components/common/CButton';
import CInput from '../../components/common/CInput';
import {OpenEye_Icon, CloseEye_Icon} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';

const CreatePassword = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const onPressContinue = () => {
    navigation.navigate(StackNav.Success);
  };
  const onChangedPassword = text => setPassword(text);
  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);

  const RightPasswordEyeIcon = ({visible, onPress}) => (
    <TouchableOpacity onPress={onPress} style={localStyles.eyeIconContainer}>
      {visible ? <CloseEye_Icon /> : <OpenEye_Icon />}
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView>
      <CKeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>
        <View style={localStyles.root}>
          <CText type={'b24'} align={'center'}>
            {strings.createPassword}
          </CText>
          <CText type={'r14'} align={'center'} style={styles.mt10}>
            {strings.passwordLengthValidation}
          </CText>
          <CInput
            placeHolder={strings.enterYourPassword}
            _value={password}
            _maxLength={10}
            toGetTextFieldValue={onChangedPassword}
            inputContainerStyle={[{backgroundColor: colors.inputBg}]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
            _isSecure={isPasswordVisible}
            rightAccessory={() => (
              <RightPasswordEyeIcon
                visible={isPasswordVisible}
                onPress={onPressPasswordEyeIcon}
              />
            )}
          />
        </View>
        <CButton
          type={'S16'}
          title={strings.continue}
          color={colors.white}
          onPress={onPressContinue}
          containerStyle={localStyles.btnContainerStyle}
        />
      </CKeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.mt30,
    ...styles.ph30,
    ...styles.flex,
  },
  btnContainerStyle: {
    ...styles.mh20,
    ...styles.mb10,
  },
});

export default CreatePassword;
