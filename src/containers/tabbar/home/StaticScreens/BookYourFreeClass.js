import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import { styles } from '../../../../themes';
import { deviceWidth, getHeight } from '../../../../common/constants';
import LinearGradient from 'react-native-linear-gradient';
import { useRef, useState } from 'react';
const BookYourFreeClass = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const CourseRef = useRef(null);
  const [name, setName] = useState("")
  const [phone, setPhone] = useState(0)
  const [course, setCourse] = useState("")

  const handleSubmit = () => {
    console.log(name, phone, course)
    if (name == "" || phone == 0 || course == "" || phone.length < 10) {
      Alert.alert("Please enter all the fields correctly")
    }
    else {
      ToastAndroid.show("registered", ToastAndroid.SHORT)
      setName("")
      setPhone(0)
      setCourse("")
      nameRef.current.clear();
      phoneRef.current.clear();
      CourseRef.current.clear();
    }

  }
  return (
    <CSafeAreaView style={localStyles.root}>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'column',
          width: deviceWidth - 20,
          height: 'auto',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 12,
          alignSelf: 'center',
          marginBottom: 10,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
          }}>
          Book Your Free Class
        </Text>
        <Image
          resizeMode="contain"
          source={{
            uri: 'https://chahalacademy.com/images/ias-academy-form-m.webp',
          }}
          style={{ width: '100%', height: getHeight(260), borderRadius: 10 }}
        />

        <View style={{ marginTop: 10 }}>
          <TextInput
            ref={nameRef}
            placeholder="Enter Your Name..."
            placeholderTextColor="black"
            style={localStyles.freeClassInput}
            onChangeText={(text) => setName(text)}></TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            ref={phoneRef}
            maxLength={10}
            placeholder="Enter Your Phone No...(10 numbers)"
            keyboardType='numeric'
            placeholderTextColor="black"
            style={localStyles.freeClassInput}
            onChangeText={(text) => setPhone(text)}></TextInput>
        </View>
        <View style={{ marginTop: 10 }}>
          <TextInput
            ref={CourseRef}
            placeholder="Enter Your Course..."
            placeholderTextColor="black"
            style={localStyles.freeClassInput}
            onChangeText={(text) => setCourse(text)}></TextInput>
        </View>
        <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.8}>
          <LinearGradient
            colors={['#080F5B', '#F16A65']} // Red gradient colors
            style={{
              marginTop: 30,
              padding: 15,
              borderRadius: 30,
              width: '50%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginHorizontal: 15,
            }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Register Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  freeClassInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0FF',
    borderRadius: 30,
    paddingHorizontal: 10
  },
});

export default BookYourFreeClass;
