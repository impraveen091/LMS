import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { getHeight} from '../../../../common/constants';
import { useSelector } from 'react-redux';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../../navigation/NavigationKeys';
import { colors } from '../../../../themes';

export default function UPSCExamDetails() {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  return (
    <CSafeAreaView style={{ flex: 1 }}>
      <CHeader
        title={'UPSC Exam Details'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <View style={{ padding: 10, rowGap: 10 }}>
        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/ias-upsc-eligibility'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>IAS/UPSC Eligibility</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/upsc-exam-pattern'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>IAS/UPSC Exam Pattern</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/ias-upsc-syllabus'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>IAS/UPSC Exam Syllabus</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/ias-upsc-service'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>IAS/UPSC Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/ias-upsc-selecting-a-civil-service'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>Cadre/Services Preference</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/how-to-apply-for-upsc-exam'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={localStyles.block}>
          <Text style={{ fontSize: 20, color: "white" }}>IAS/UPSC Notification</Text>
        </TouchableOpacity>

      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: getHeight(190),
    resizeMode: 'contain',
  },
  logo: {
    height: 80,
    width: 160,
  },
  testimonials: {
    height: 160,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    width: 'auto',
    height: 40,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
});
