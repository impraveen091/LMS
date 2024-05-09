import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {customRequest} from '../../../../api/customRequest';

const Slider = ({data}) => {
  const flatlistRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('ActiveIndex', activeIndex, data);

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === data?.length - 1) {
        flatlistRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        flatlistRef?.current?.scrollToIndex({
          index: activeIndex + 1,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, data, flatlistRef]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const renderDotIndicators = () => {
    return data.map((dot, index) => {
      // console.log('dot', dot);
      if (activeIndex === index) {
        return (
          <View
            style={{
              backgroundColor: '#5F5CF0',
              height: 10,
              width: 20,
              borderRadius: 10,
              marginHorizontal: 6,
            }}></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'gray',
              height: 10,
              width: 10,
              borderRadius: 10,
              marginHorizontal: 6,
            }}></View>
        );
      }
    });
  };

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / screenWidth;
    setActiveIndex(Math.round(index));
  };

  const renderItem = ({item, index}) => {
    // console.log('renterImage', item);
    if (item == null || item == undefined) {
      return null;
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7} key={index}>
          <Image
            resizeMode="contain"
            source={{uri: item?.image}}
            style={{
              height: 210,
              width: screenWidth,
              backgroundColor: 'white',
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            {renderDotIndicators()}
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View>
      <FlatList
        ref={flatlistRef}
        data={data}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 20,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#5F5CF0',
  },
  inactiveDotStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
});

export default Slider;
