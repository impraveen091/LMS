import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../../../../themes';
import { deviceWidth, getHeight } from '../../../../common/constants';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';
const WhatsAppBooking = () => {
  const [phone, setPhone] = useState(0)
  return (
    <CSafeAreaView style={localStyles.root}>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: 'column',
          width: deviceWidth - 20,
          height: getHeight(100),
          backgroundColor: '#080F5B',
          borderRadius: 10,
          marginBottom: 10,
          padding: 10,
        }}>
        <Text style={{ fontSize: 18, color: 'white' }}>Get Free IAS Booklet</Text>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder="Enter WhatsApp No."
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            maxLength={10}
            style={{
              marginTop: 10,
              flexDirection: 'row',
              width: '70%',
              height: 40,
              backgroundColor: 'white',
              borderRadius: 10,
            }}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={() => console.log("WhatsApp")}>
            <LinearGradient
              colors={['#080F5B', '#F16A65']} // Red gradient colors
              style={{
                marginTop: 10,
                borderRadius: 20,
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 15,
                height: 40,
              }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Submit
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  freeClassInput: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0FF',
    borderRadius: 30,
  },
});

export default WhatsAppBooking;
