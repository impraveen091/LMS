//App colors
const LightColor = {
  light: 'light',
  backgroundColor: '#F8F9FA',
  textSpecial: '#5F5CF0',
  textColor: '#000000',
  textRevertColor: '#FFFFFF',
  textColor2: '#43536B',
  inputBg: '#F0F0FF',
  placeHolderColor: '#A1A9B5',
  labelText: '#43536B',
  socialButtonBackground: '#ffffff',
  dividerLine: '#EAECEF',
  shadowColor: '#0E0E0E1F',
  categoryColor: '#FFFFFF',
  filterCategoryTitleColor: '#6F757D',
  notSelectedTextColor: '#152946',
  cardBackground: '#EEF4FF',
  progressColor: '#B5CFFD',
};

const DarkColor = {
  dark: 'dark',
  backgroundColor: '#171F2C',
  textColor: '#FFFFFF',
  textRevertColor: '#152946',
  textColor2: '#CED3DB',
  inputBg: '#1B2737',
  placeHolderColor: '#A1A9B5',
  labelText: '#E2E5E9',
  socialButtonBackground: '#1B2737',
  dividerLine: '#152946',
  shadowColor: '#000000',
  categoryColor: '#1B2737',
  filterCategoryTitleColor: '#FFFFFF',
  notSelectedTextColor: '#CED3DB',
  cardBackground: '#171F2C',
  progressColor: '#43536B',
};

// Common colors
export const commonColor = {
  white: '#FFFFFF',
  red: '#FF0000',
  black: '#000000',
  primary: '#5F5CF0',
  tranparent: '#00000000',
  darkBg: '#181A20',
  error: '#DA1414',
  success: '#23A757',
  warning: '#FFC226',
  info: '#107AF6',
  lightPrimary: '#F3F3FF',
  gray: '#727E90',
  primary30: '#304FFE4D',
  primary20: '#E9E9FF',
  tertiary: '#8DE2EF',
  neutral1: '#152946',
};

export const colors = {
  light: {
    ...LightColor,
    ...commonColor,
  },

  dark: {
    ...DarkColor,
    ...commonColor,
  },
};
