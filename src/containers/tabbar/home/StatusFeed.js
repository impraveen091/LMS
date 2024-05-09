import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {customRequest} from '../../../api/customRequest';
import LinearGradient from 'react-native-linear-gradient';
import {getHeight, getWidth} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {Cross_Close_Icon} from '../../../assets/svgs';

export default function StatusFeed({renderData, onChildData}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('');
  const [detail, setDetail] = useState('');

  const statusView = async id => {
    const response = await customRequest('feedWatched/create', 'POST', {
      fk_feeds_id: id,
    });
    // console.log('statusResponse1', response);
  };

  const removeTag = detail => {
    if (detail !== null || detail !== undefined) {
      return detail?.replace(/<[^>]*>/g, '');
    } else {
      return null;
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible),
            setImage(renderData.file),
            statusView(renderData?.id);
          setDetail(removeTag(renderData?.content));
        }}>
        <LinearGradient
          colors={
            renderData?.feeduser_watch_count === '0'
              ? ['#23a6fe', '#23a6fe']
              : ['#b5b6b8', '#b5b6b8']
          }
          style={{
            marginRight: 10,
            height: 64,
            width: 64,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 64,
          }}>
          <View
            style={{
              height: 58,
              width: 58,
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: 64,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'white',
            }}>
            <Image
              resizeMode="contain"
              source={
                renderData?.file == null || renderData?.file == undefined
                  ? null
                  : {uri: renderData?.file}
              }
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 64,
              }}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Cross_Close_Icon
            width={30}
            height={30}
            style={{alignSelf: 'flex-end'}}
            onPress={() => {
              setModalVisible(false), onChildData('done');
            }}
          />
          <Image
            source={image == null || image == undefined ? null : {uri: image}}
            style={{
              height: getHeight(350),
              width: getWidth(350),
              borderRadius: 10,
              resizeMode: 'contain',
            }}
          />
          <CText
            type={'r16'}
            color={'black'}
            style={{textAlign: 'center', marginVertical: 10}}>
            {detail}
          </CText>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
