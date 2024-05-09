import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../../../navigation/NavigationKeys';

export default function AuthPlaceholder() {
  const navigator = useNavigation();

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  return (
    <View
      style={{
        height: height,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LottieView
        source={require('../../lottie/login.json')}
        style={{height: 240, width: 240}}
        autoPlay
        loop
      />
      <Text style={{color: '#202244', fontSize: 16}}>
        Please login to view this section.
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigator.navigate(StackNav.Auth);
        }}
        activeOpacity={0.8}
        style={{
          marginTop: 12,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#23a6fe',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
          Login
        </Text>
      </TouchableOpacity>
      <View style={{height: 240}} />
    </View>
  );
}
