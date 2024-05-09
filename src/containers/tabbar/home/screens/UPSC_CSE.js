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

export default function UPSC_CSE() {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  return (
    <CSafeAreaView style={{ flex: 1 }}>
      <CHeader
        title={'UPSC_CSE'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <View style={{ padding: 10, rowGap: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackNav.UPSCExamDetails)}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>UPSC Exam Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackNav.PreparationStrategy)}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Preparation & Strategy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackNav.TopperJourney)}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Topper's Journey</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/upsc-cse-prelims-answer-key'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>UPSC Prelims Answer Key </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            let links = 'https://chahalacademy.com/upsc-cse-final-result'
            navigation.navigate(StackNav.Eligibility, {
              link: links,
            })
          }}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>UPSC CSE Final Merit List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackNav.BasicInfo)}
          style={{
            width: 'auto',
            height: 40,
            backgroundColor: '#5F5CF0',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 20, color: "white" }}>Basic Information </Text>
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
});
