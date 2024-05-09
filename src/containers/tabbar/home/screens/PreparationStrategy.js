import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {getHeight} from '../../../../common/constants';
import { useSelector } from 'react-redux';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CHeader from '../../../../components/common/CHeader';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../../navigation/NavigationKeys';
import { colors } from '../../../../themes';

export default function PreparationStrategy() {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  return (
    <CSafeAreaView style={{ flex: 1 }}>
      <CHeader
        title={'Preparation & Strategy'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <ScrollView>
        <View style={{ padding: 10, rowGap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/tips-how-to-start-upsc-preparation'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>How to Start Preparation?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-prepare-for-preliminary-examination'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Prelims Preparation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-prepare-for-mains-examination'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Mains Preparation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/tips-ias-upsc-suggested-readings'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>IAS/UPSC Exam Booklist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-make-note'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>How to make Notes?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-start-current-affair-preparation'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Current Affairs Preparation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-read-hindu'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>How to Read The Hindu?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/tips-ias-upsc-how-to-choose-subjects'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Optional Subject Selection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/tips-optional-subject-book-list'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Optional Subject Booklist</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-prepare-for-ias-interview-stage'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Interview Preparation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/how-to-become-an-ias-topper'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>How To Become Topper?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let links = 'https://chahalacademy.com/tips-ias-useful-website'
              navigation.navigate(StackNav.Eligibility, {
                link: links,
              })
            }}
            style={localStyles.block}>
            <Text style={localStyles.TextStyle}>Usefull Websites</Text>
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
  }, TextStyle: { fontSize: 20, color: "white" }
});
