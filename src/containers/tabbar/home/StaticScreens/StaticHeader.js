import {View, Text, Image, StyleSheet} from 'react-native';
import {deviceWidth} from '../../../../common/constants';

export default function StaticHeader() {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <Image
          source={require('../../../../../assets/chahalDark.png')}
          style={localStyles.logo}
        />
      </View>
      <View
        style={{
          width: deviceWidth - 20,
          height: 40,
          backgroundColor: '#080F5B',
          borderRadius: 10,
          marginBottom: 10,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white'}}>
          Whatsapp 93132-18122 For more Details
        </Text>
      </View>
    </View>
  );
}
const localStyles = StyleSheet.create({
  logo: {
    height: 80,
    width: 160,
  },
});
