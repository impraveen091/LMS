import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { styles } from '../../../../themes';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  DownArrowIcon,
  Radio_Not_Selected,
  Radio_Selected,
} from '../../../../assets/svgs';
import CText from '../../../../components/common/CText';
import { moderateScale } from '../../../../common/constants';
import strings from '../../../../i18n/strings';
import CreditCard from '../../../../components/paymentComponent/CreditCard';
import { creditCardArray } from '../../../../api/constant';
import images from '../../../../assets/images';
import CButton from '../../../../components/common/CButton';
import { StackNav } from '../../../../navigation/NavigationKeys';

const EnrollCourse = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const colors = useSelector(state => state.theme.theme);
  const [creditCardData, setCreditCardData] = useState(creditCardArray);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    let selectedCard = creditCardData.filter(item => item.is_default);
    setSelectedCard(selectedCard[0]);
  }, [creditCardData]);
  const selectCard = index => {
    let tempCreditCardData = [...creditCardData];
    tempCreditCardData.map((item, i) => {
      if (i === index) {
        item.is_default = true;
      } else {
        item.is_default = false;
      }
    });
    setCreditCardData(tempCreditCardData);
  };
  const navigateToPaymentSuccess = () => {
    navigation.navigate(StackNav.PaymentSuccess);
  };

  const renderCreditCard = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectCard(index);
        }}
        style={localStyles.creditCardList}>
        {item.is_default ? <Radio_Selected /> : <Radio_Not_Selected />}
        <Image
          source={images.bank}
          resizeMode="cover"
          style={localStyles.bankLogo}
        />
        <View>
          <CText
            type={'s14'}
            color={item.is_default ? colors.textColor : colors.gray}>
            {strings.stars}
            {item.card_number_last4}
          </CText>
          <CText
            type={'r14'}
            color={item.is_default ? colors.textColor : colors.gray}>
            {item.card_holder}
          </CText>
        </View>
      </TouchableOpacity>
    );
  };
  const ListHeader = () => {
    return (
      <>
        <View
          style={[
            localStyles.paymentMethodDropDown,
            {
              backgroundColor: colors.inputBg,
            },
          ]}>
          <CText type={'m16'}>{strings.creditCard}</CText>
          <DownArrowIcon />
        </View>
        <View style={localStyles.creditCard}>
          <CreditCard cardDetail={selectedCard} />
        </View>
      </>
    );
  };
  const navigateToAddNewCard = () => {
    navigation.navigate(StackNav.AddNewCard);
  };

  const ListFooter = () => {
    return (
      <View style={localStyles.footerView}>
        <CButton
          onPress={navigateToAddNewCard}
          type="s12"
          title={strings.addNewCard}
          containerStyle={[
            localStyles.addNewBtn,
            {
              borderColor: colors.primary,
            },
          ]}
          bgColor={colors.tranparent}
          color={colors.primary}
        />
        <CButton
          onPress={navigateToPaymentSuccess}
          type="s16"
          title={'₹' + " " + route.params.amount + " " + strings.enrollNowBtn}
          containerStyle={[
            localStyles.enrollNowBtn,
            {
              borderColor: colors.primary,
            },
          ]}
          bgColor={colors.primary}
          color={colors.white}
        />
      </View>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={strings.enrollCourse}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />

      <FlatList
        data={creditCardData}
        renderItem={renderCreditCard}
        style={localStyles.creditCardListContainer}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </CSafeAreaView>
  );
};

export default EnrollCourse;

const localStyles = StyleSheet.create({
  headerText: {
    ...styles.selfCenter,
    ...styles.flex,
    textAlign: 'center',
  },
  paymentMethodDropDown: {
    ...styles.rowSpaceBetween,
    ...styles.mh25,
    ...styles.mb25,
    ...styles.pv15,
    ...styles.ph25,
    borderRadius: moderateScale(50),
  },
  creditCard: {
    ...styles.ph25,
    ...styles.pb30,
  },
  creditCardListContainer: {
    ...styles.pv20,
  },
  creditCardList: {
    ...styles.ph25,
    ...styles.pv15,
    ...styles.flexRow,
    ...styles.itemsCenter,
    gap: moderateScale(15),
  },
  bankLogo: {
    width: moderateScale(64),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
  },
  addNewBtn: {
    ...styles.selfCenter,
    ...styles.ph15,
    ...styles.pv5,
    height: moderateScale(30),
    borderWidth: moderateScale(1),
  },
  footerView: {
    ...styles.ph25,
    ...styles.pt10,
  },
  enrollNowBtn: {
    width: '100%',
    ...styles.mt40,
    ...styles.mb10,
    bottom: moderateScale(10),
    height: moderateScale(48),
  },
});
