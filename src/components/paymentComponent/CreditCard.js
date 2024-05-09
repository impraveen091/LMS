import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import {styles} from '../../themes';

const CreditCard = ({cardDetail}) => {
  const HiddenNumber = () => {
    return (
      <CText type={'m16'} color={colors.white}>
        {strings.x}
      </CText>
    );
  };

  const CardDetail = ({title, data, style}) => {
    return (
      <View style={style}>
        <CText type={'m16'} color={colors.gray}>
          {title}
        </CText>
        <CText type={'m16'} color={colors.white}>
          {data}
        </CText>
      </View>
    );
  };
  const colors = useSelector(state => state.theme.theme);
  return (
    <View
      style={[
        localStyles.creditCard,
        {
          backgroundColor: colors.neautral1,
        },
      ]}>
      <View style={localStyles.logo}>{cardDetail?.card_icon}</View>
      <View style={localStyles.cardNumber}>
        <HiddenNumber />
        <HiddenNumber />
        <HiddenNumber />
        <CText type={'m16'} color={colors.white}>
          {cardDetail?.card_number_last4}
        </CText>
      </View>
      <View style={localStyles.cardDetail}>
        <CardDetail title={strings.cardHolder} data={cardDetail?.card_holder} />
        <CardDetail
          title={strings.validThru}
          data={cardDetail?.expiration_date}
          style={styles.itemsEnd}
        />
      </View>
    </View>
  );
};

export default CreditCard;

const localStyles = StyleSheet.create({
  creditCard: {
    ...styles.ph20,
    ...styles.pv20,
    borderRadius: moderateScale(20),
  },
  logo: {
    ...styles.selfEnd,
    ...styles.mv10,
  },
  cardNumber: {
    ...styles.rowSpaceBetween,
    ...styles.pv30,
  },
  cardDetail: {
    ...styles.rowSpaceBetween,
  },
});
