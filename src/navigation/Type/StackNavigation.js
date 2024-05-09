import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNav, TabNav} from '../NavigationKeys';
import AuthStack from './AuthStack';
import {StackRoute} from '../NavigationRoutes';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={StackNav.TabBar}>
      {/* <Stack.Screen name={StackNav.Splash} component={StackRoute.Splash} /> */}
      <Stack.Screen
        name={StackNav.OnBoarding}
        component={StackRoute.OnBoarding}
      />
      <Stack.Screen name={StackNav.Auth} component={AuthStack} />
      <Stack.Screen name={StackNav.TabBar} component={StackRoute.TabBar} />
      <Stack.Screen
        name={StackNav.Categories}
        component={StackRoute.Categories}
      />
      <Stack.Screen name={StackNav.Courses} component={StackRoute.Courses} />
      <Stack.Screen
        name={StackNav.Notification}
        component={StackRoute.Notification}
      />
      <Stack.Screen name={StackNav.Filter} component={StackRoute.Filter} />
      <Stack.Screen
        name={StackNav.CourseDetail}
        component={StackRoute.CourseDetail}
      />
      <Stack.Screen
        name={StackNav.EnrollCourse}
        component={StackRoute.EnrollCourse}
      />
      <Stack.Screen
        name={StackNav.PaymentSuccess}
        component={StackRoute.PaymentSuccess}
      />
      <Stack.Screen
        name={StackNav.AddNewCard}
        component={StackRoute.AddNewCard}
      />
      <Stack.Screen
        name={StackNav.MyLearning}
        component={StackRoute.MyLearning}
      />
      <Stack.Screen
        name={StackNav.RateCourse}
        component={StackRoute.RateCourse}
      />
      <Stack.Screen
        name={StackNav.SubjectVideos}
        component={StackRoute.SubjectVideos}
      />
      <Stack.Screen name={StackNav.TestCard} component={StackRoute.TestCard} />
      <Stack.Screen
        name={StackNav.SingleResult}
        component={StackRoute.SingleResult}
      />
      <Stack.Screen
        name={StackNav.MultiSubjectResult}
        component={StackRoute.MultiSubjectResult}
      />
      <Stack.Screen name={StackNav.Results} component={StackRoute.Results} />
      <Stack.Screen
        name={StackNav.StartTest}
        component={StackRoute.StartTest}
      />
      <Stack.Screen
        name={StackNav.CourseCategory}
        component={StackRoute.CourseCategory}
      />
      <Stack.Screen
        name={StackNav.CourseCategoryDetailScreen}
        component={StackRoute.CourseCategoryDetailScreen}
      />
      <Stack.Screen
        name={StackNav.CourseCat}
        component={StackRoute.CourseCat}
      />

      <Stack.Screen
        name={StackNav.CurrentAffairs}
        component={StackRoute.CurrentAffairs}
      />
      <Stack.Screen
        name={StackNav.SelectionScreen}
        component={StackRoute.SelectionScreen}
      />
      <Stack.Screen
        name={StackNav.BasicInfo}
        component={StackRoute.BasicInfo}
      />
      <Stack.Screen
        name={StackNav.Eligibility}
        component={StackRoute.Eligibility}
      />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
      />
      <Stack.Screen
        name={StackNav.MySubscription}
        component={StackRoute.MySubscription}
      />
      <Stack.Screen name={StackNav.Chat} component={StackRoute.Chat} />
      <Stack.Screen
        name={StackNav.TopperJourney}
        component={StackRoute.TopperJourney}
      />
      <Stack.Screen
        name={StackNav.PreparationStrategy}
        component={StackRoute.PreparationStrategy}
      />
      <Stack.Screen
        name={StackNav.UPSCExamDetails}
        component={StackRoute.UPSCExamDetails}
      />
      <Stack.Screen name={StackNav.UPSC_CSE} component={StackRoute.UPSC_CSE} />
      <Stack.Screen
        name={StackNav.Admission}
        component={StackRoute.Admission}
      />
      <Stack.Screen
        name={StackNav.Dashboard}
        component={StackRoute.Dashboard}
      />
      <Stack.Screen
        name={StackNav.MyInvoice}
        component={StackRoute.MyInvoice}
      />
      <Stack.Screen name={StackNav.Payment} component={StackRoute.Payment} />
    </Stack.Navigator>
  );
}
