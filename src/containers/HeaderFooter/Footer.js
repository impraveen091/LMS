import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Home_Dark_Fill_Icon,
  Home_Dark_UnFill_Icon,
  Profile_Light_UnFill_Icon,
  Reel_Icon,
} from '../../assets/svgs';
import Target from '../../assets/svgs/target.svg';
import Book from '../../assets/svgs/book.svg';
import Zoom from '../../assets/svgs/zoom.svg';
import {getWidth} from '../../common/constants';
import {TabRoute} from '../../navigation/NavigationRoutes';
import AllCourses from '../../assets/svgs/allCourses.svg';
import {colors} from '../../themes';
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        zIndex: 1000,
        bottom: 0,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 15,
        elevation: 5,
        // borderWidth: 1,
        // borderTopColor: '#959595',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.HomeTab);
        }}>
        {colors.backgroundColor == '#171F2C' ? (
          <Home_Dark_Fill_Icon />
        ) : (
          <Home_Dark_UnFill_Icon />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.TargetTab);
        }}>
        <Target />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.AllCourses);
        }}>
        <AllCourses height={25} width={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.CourseList);
        }}>
        <Reel_Icon />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.TestSeries);
        }}>
        <Book height={30} width={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.ZoomTab);
        }}>
        <Zoom height={25} width={25} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(TabRoute.ProfileTab);
        }}>
        <Profile_Light_UnFill_Icon />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
