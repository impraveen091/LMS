import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { styles } from '../../../../themes';
import CHeader from '../../../../components/common/CHeader';
import CreditCard from '../../../../components/paymentComponent/CreditCard';
import { MasterCard } from '../../../../assets/svgs';
import CInput from '../../../../components/common/CInput';
import strings from '../../../../i18n/strings';
import CButton from '../../../../components/common/CButton';
import { moderateScale } from '../../../../common/constants';

const AddNewCard = () => {
  const [cardDetail, setCardDetail] = useState({
    card_holder: 'Duong Khanh',
    card_icon: <MasterCard />,
    card_id: 1,
    card_number_last4: '5678',
    card_number: '1234567812345678',
    card_type: 'Visa',
    expiration_date: '12/24',
    is_default: true,
  });
  const colors = useSelector(state => state.theme.theme);
  const onChangeCardNumber = text => {
    setCardDetail({ ...cardDetail, card_number: text });
  };
  useEffect(() => {
    if (cardDetail?.card_number.replace(/\s/g, '').length == 16) {
      setCardDetail({
        ...cardDetail,
        card_number_last4: cardDetail?.card_number.slice(-4),
      });
    }
  }, [cardDetail?.card_number]);
  const onChangeCardHolder = text => {
    setCardDetail({ ...cardDetail, card_holder: text });
  };
  const onChangeValidThru = text => {
    setCardDetail({ ...cardDetail, expiration_date: text });
  };

  const handleCardDisplay = () => {
    if (cardDetail?.card_number && cardDetail?.card_number?.length > 0) {
      const rawText = [...cardDetail?.card_number?.split(' ').join('')]; // Remove old space
      const creditCard = []; // Create card as array
      rawText?.forEach((t, i) => {
        if (i % 4 === 0 && i !== 0) creditCard.push(' '); // Add space
        creditCard.push(t);
      });
      return creditCard.join('');
    } // Transform card array to string
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={'Add New Card'}
        customTextStyle={localStyles.headerText}
      />
      <View style={localStyles.container}>
        <CreditCard cardDetail={cardDetail} />

        <View style={styles.flex}>
          <CInput
            label={strings.cardNumber}
            placeHolder={strings.cardNumber}
            keyBoardType={'number-pad'}
            _value={handleCardDisplay()}
            toGetTextFieldValue={onChangeCardNumber}
            maxLength={19}
            inputContainerStyle={[{ backgroundColor: colors.inputBg }]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          <CInput
            label={strings.cardHolder}
            placeHolder={strings.cardHolder}
            keyBoardType={'number-pad'}
            _value={cardDetail?.card_holder}
            toGetTextFieldValue={onChangeCardHolder}
            inputContainerStyle={[{ backgroundColor: colors.inputBg }]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          <CInput
            label={strings.validThru}
            placeHolder={strings.validThru}
            keyBoardType={'number-pad'}
            _value={cardDetail?.expiration_date}
            toGetTextFieldValue={onChangeValidThru}
            inputContainerStyle={[{ backgroundColor: colors.inputBg }]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
        </View>

        <CButton
          title={strings.addCard}
          type="s16"
          onPress={() => { }}
          containerStyle={localStyles.addCardBtn}
        />
      </View>
    </CSafeAreaView>
  );
};

export default AddNewCard;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerText: {
    ...styles.flex,
    textAlign: 'center',
  },
  container: {
    ...styles.flex,
    ...styles.ph25,
    ...styles.pt25,
    ...styles.pb10,
  },
  addCardBtn: {
    height: moderateScale(48),
  },
});
