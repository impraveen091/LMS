import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  getHeight,
} from '../../../../common/constants';
import { useSelector } from 'react-redux';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { colors } from '../../../../themes';
import { StackNav } from '../../../../navigation/NavigationKeys';
import { useNavigation } from '@react-navigation/native';

export default function CurrentAffairs() {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  return (
    <CSafeAreaView style={{ flex: 1 }}>
      <CHeader
        title={'Current Affairs'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <ScrollView>
        <View style={{ padding: 10, rowGap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/what-to-read-in-the-hindu'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>What To Read In The Hindu </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/what-to-read-in-indian-express'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>What To Read In Indian Express </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/the-hindu-editorial-analysis'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>The Hindu Editorial Analysis </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/indian-express-editorial-analysis'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Indian Express Editorial Analysis </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/rank-1-upsc-2022-23-ishita-kishore'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Daily Current Affairs </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/daily-answer-writing'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Daily Answer Writing </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/daily-current-affairs-quiz'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Daily Current Affairs Quiz </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/current-affairs-magazine'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Current Affairs Magazine </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/yojana-magazine'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Yojana Magazine </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/kurukshetra-magazine'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Kurukshetra Magazine </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/gyan-ki-baat'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.textStyle}>Chahal's Gyan Ki Baat </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  }, textStyle: { fontSize: 20, color: "white", }
});
