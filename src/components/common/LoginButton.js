//Library Imports
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

//Local Imports
import { getHeight, getWidth, moderateScale } from '../../common/constants';
import { styles } from '../../themes';
import CText from './CText';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';

export default function LoginButton({
  title,
  type,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  bgColor = null,
  children,
  ...props
}) {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? { backgroundColor: bgColor }
          : { backgroundColor: colors.primary },
      ]}
      onPress={() => navigation.navigate(StackNav.Auth)}
      {...props}>
      {frontIcon}
      <CText type={type} style={style} color={color ? color : colors.white}>
        Login
      </CText>
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(35),
    borderRadius: moderateScale(55) / 2,
    alignSelf: "flex-end",
    width: getWidth(60)
  },
});
