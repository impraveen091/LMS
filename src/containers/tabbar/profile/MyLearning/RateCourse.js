import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {styles} from '../../../../themes';
import CHeader from '../../../../components/common/CHeader';
import images from '../../../../assets/images';
import {moderateScale} from '../../../../common/constants';
import CText from '../../../../components/common/CText';
import strings from '../../../../i18n/strings';
import {Star_Icon, Star_Icon_Filled} from '../../../../assets/svgs';
import CInput from '../../../../components/common/CInput';
import CButton from '../../../../components/common/CButton';

const RateCourse = () => {
  const colors = useSelector(state => state.theme.theme);
  const [stars, setStars] = useState([1, 2, 3, 4, 5]);
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  const onChangedReviewText = text => setReview(text);

  return (
    <View style={[localStyles.root, {backgroundColor: colors.white}]}>
      <CHeader title={''} />
      <View style={styles.mh25}>
        <Image
          source={images.course1}
          style={localStyles.image}
          resizeMode="cover"
        />
      </View>
      <CText type="s24" style={styles.mv20} align="center" numberOf>
        {'Art & Ideas: Teaching with Themes'}
      </CText>
      <CText type="m16" style={styles.mv20} align="center" numberOf>
        {strings.rate}
      </CText>
      <View style={[styles.flexRow, styles.justifyCenter]}>
        {stars.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.mh10}
              key={index}
              onPress={() => setRating(item)}>
              {item <= rating ? (
                <Star_Icon_Filled
                  width={moderateScale(24)}
                  height={moderateScale(24)}
                />
              ) : (
                <Star_Icon />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      <CInput
        placeholder={strings.writeReview}
        inputContainerStyle={[localStyles.inputContainer]}
        inputBoxStyle={[
          localStyles.input,
          {
            backgroundColor: colors.inputBg,
          },
        ]}
        toGetTextFieldValue={onChangedReviewText}
        multiline={true}
        numberOfLines={5}
      />
      <CButton
        type="s16"
        title={strings.submit}
        containerStyle={localStyles.submitBtn}
        onPress={() => {}}
      />
    </View>
  );
};

export default RateCourse;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  image: {
    width: '100%',
    height: moderateScale(200),
    borderRadius: moderateScale(25),
    ...styles.mv25,
  },
  input: {
    borderRadius: moderateScale(10),
    ...styles.mh20,
  },
  buttonContainerStyle: {
    ...styles.center,
  },
  submitBtn: {
    ...styles.ph25,
    position: 'absolute',
    bottom: moderateScale(25),
    alignSelf: 'center',
    width: '85%',
  },
});
