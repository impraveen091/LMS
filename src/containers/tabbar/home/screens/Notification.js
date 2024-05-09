import {
  View,
  TouchableOpacity,
  Image,
  SectionList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {styles} from '../../../../themes';
import {moderateScale} from '../../../../common/constants';
import {useSelector} from 'react-redux';
import CText from '../../../../components/common/CText';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import {NotificationData} from '../../../../api/constant';
import {
  Three_Dot_Dark_Icon,
  Three_Dot_Light_Icon,
} from '../../../../assets/svgs';

const Notification = () => {
  const colors = useSelector(state => state.theme.theme);

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark === 'dark' ? (
          <Three_Dot_Dark_Icon />
        ) : (
          <Three_Dot_Light_Icon />
        )}
      </TouchableOpacity>
    );
  };

  const RenderNotificationItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          localStyles.renderContainer,
          {
            backgroundColor:
              colors.dark == 'dark' ? colors.inputBg : colors.white,
          },
        ]}>
        <Image source={item?.image} style={localStyles.iconStyle} />
        <View style={localStyles.textStyle}>
          <CText numberOfLines={1} type={'m14'}>
            {item?.title}
          </CText>
          <CText type={'r14'} numberOfLines={1} style={styles.mt5}>
            {item?.description}
          </CText>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderSectionHeader = ({section: {title}}) => {
    return (
      <CText numberOfLines={1} style={[styles.ml20, styles.mb15]} type={'s16'}>
        {title}
      </CText>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.notifications} rightIcon={<RightIcon />} />
      <SectionList
        sections={NotificationData}
        keyExtractor={(item, index) => item + index}
        renderItem={RenderNotificationItem}
        renderSectionHeader={RenderSectionHeader}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  renderContainer: {
    ...styles.p15,
    ...styles.mb15,
    ...styles.mh20,
    ...styles.flexRow,
    ...styles.alignCenter,
    borderRadius: moderateScale(16),
    ...styles.shadowStyle,
  },
  iconStyle: {
    height: moderateScale(60),
    width: moderateScale(60),
    resizeMode: 'contain',
    borderRadius: moderateScale(12),
    ...styles.mr10,
  },
  textStyle: {
    ...styles.mh10,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});

export default Notification;
