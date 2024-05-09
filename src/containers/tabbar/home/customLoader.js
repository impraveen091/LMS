import {ActivityIndicator, Image, View} from 'react-native';

export default function CustomLoader() {
  return (
    <View
      style={{
        zIndex: 60,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          elevation: 5,
          height: 124,
          width: 124,
          borderRadius: 124,
        }}>
        <ActivityIndicator
          size={164}
          color="#23a6fe"
          style={{
            zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 124,
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <Image
            source={require('../../../assets/chahalDark.png')}
            style={{
              width: '90%',
              height: '90%',
              borderRadius: 124,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
    </View>
  );
}
