import {StyleSheet, View} from 'react-native';
import React from 'react';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import Header from '../../../HeaderFooter/Header';
import Footer from '../../../HeaderFooter/Footer';

export default function SelectionScreen() {
  return (
    <CSafeAreaView style={{flex: 1}}>
      <Header
        clearData={() => {}}
        onPressMenu={() => {}}
        webLink={'https://chahalacademy.com/selections?data=app'}
      />

      <View
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 1000,
          bottom: -9,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingVertical: 10,
          elevation: 5,
        }}>
        <Footer />
      </View>
    </CSafeAreaView>
  );
}

const styles = StyleSheet.create({});
