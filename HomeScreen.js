import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import ExplorerScreen from './ExplorerScreen';
import AccountScreen from './AccountScreen';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === 'Explorer') {
            iconSource = focused 
              ? require('../../assets/icon.png')
              : require('../../assets/icon.png');
          } else if (route.name === 'Account') {
            iconSource = focused
              ? require('../../assets/carot.jpg')
              : require('../../assets/carot.jpg');
          }

          return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#46A758',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        }
      })}
    >
      <Tab.Screen name="Explorer" component={ExplorerScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;