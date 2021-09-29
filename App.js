import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card } from 'react-native-paper';
import Home from './screens/home';
import Statistics from './screens/statistics';

const Stack = createNativeStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen
          options={{ headerShown: false }}
          name="home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="statistics"
          component={Statistics}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
