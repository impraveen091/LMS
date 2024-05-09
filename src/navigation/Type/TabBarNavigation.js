import {TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {TabNav} from '../NavigationKeys';
import {TabRoute} from '../NavigationRoutes';
import {colors, styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import Test_Light_Fill_Icon from '../../assets/svgs/tabBarIcons/light/test_fill.svg';
import Test_Light_UnFill_Icon from '../../assets/svgs/tabBarIcons/light/test_unfill.svg';
import Test_Dark_FIll_Icon from '../../assets/svgs/tabBarIcons/dark/test_fill.svg';
import Test_Dark_UnFill_Icon from '../../assets/svgs/tabBarIcons/dark/test_unfill.svg';
import Target from '../../assets/svgs/target.svg';
import Book from '../../assets/svgs/book.svg';
import Zoom from '../../assets/svgs/zoom.svg';
import Dashboard from '../../assets/svgs/dashboard.svg';
import AllCourses from '../../assets/svgs/allCourses.svg';

import {
  Home_Light_Fill_Icon,
  Home_Light_UnFill_Icon,
  Profile_Light_Fill_Icon,
  Profile_Light_UnFill_Icon,
  Reel_Icon,
  Save_Light_Fill_Icon,
  Save_Light_UnFill_Icon,
  Search_Light_Fill_Icon,
  Search_Light_UnFill_Icon,
  Home_Dark_Fill_Icon,
  Home_Dark_UnFill_Icon,
  Profile_Dark_Fill_Icon,
  Profile_Dark_UnFill_Icon,
  Save_Dark_UnFill_Icon,
  Save_Dark_Fill_Icon,
  Search_Dark_Fill_Icon,
  Search_Dark_UnFill_Icon,
  TargetFill,
  AllCoursesFill,
  ReelIconFill,
  BookFill,
  ZoomFill,
  TargetDarkUnFill,
  AllCoursesDarkUnFill,
  Reel_IconDarkUnFill,
  BookDarkUnFill,
  ZoomDarkUnFill,
} from '../../assets/svgs';
import {useSelector} from 'react-redux';

export default function TabBarNavigation() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors?.backgroundColor,
          height: moderateScale(48),
        },
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.HomeTab}>
      <Tab.Screen
        name={TabNav.HomeTab}
        component={TabRoute.HomeTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Home_Dark_Fill_Icon />
                ) : (
                  <Home_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Home_Dark_UnFill_Icon />
                ) : (
                  <Home_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.TargetTab}
        component={TabRoute.TargetTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? <Target /> : <TargetFill />}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? <TargetDarkUnFill /> : <Target />}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.AllCourses}
        component={TabRoute.AllCourses}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <AllCourses height={30} width={30} />
                ) : (
                  <AllCoursesFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <AllCoursesDarkUnFill height={30} width={30} />
                ) : (
                  <AllCourses height={30} width={30} />
                )}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.CourseList}
        component={TabRoute.CourseList}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Reel_Icon height={30} width={30} />
                ) : (
                  <ReelIconFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Reel_IconDarkUnFill height={30} width={30} />
                ) : (
                  <Reel_Icon height={30} width={30} />
                )}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.TestSeries}
        component={TabRoute.TestSeries}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Book height={30} width={30} />
                ) : (
                  <BookFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <BookDarkUnFill height={30} width={30} />
                ) : (
                  <Book height={30} width={30} />
                )}
              </View>
            ),
        }}
      />

      <Tab.Screen
        name={TabNav.ZoomTab}
        component={TabRoute.ZoomTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Zoom height={25} width={25} />
                ) : (
                  <ZoomFill height={25} width={25} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <ZoomDarkUnFill height={25} width={25} />
                ) : (
                  <Zoom height={25} width={25} />
                )}
              </View>
            ),
        }}
      />
      {/* <Tab.Screen
        name={TabNav.SearchTab}
        component={TabRoute.SearchTab}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Search_Dark_Fill_Icon />
                ) : (
                  <Search_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Search_Dark_UnFill_Icon />
                ) : (
                  <Search_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      /> */}
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Profile_Dark_Fill_Icon />
                ) : (
                  <Profile_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Profile_Dark_UnFill_Icon />
                ) : (
                  <Profile_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const localStyle = StyleSheet.create({
  tabBarScanIconStyle: {
    top: 0,
  },
  iconContainer: {
    position: 'absolute',
    // top: -moderateScale(20),
    borderColor: colors.white,
  },
});
