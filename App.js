import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import các màn hình
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SigninScreen from './src/screens/SigninScreen';
import HomeScreen from './src/screens/HomeScreen';
import MobileNumberScreen from './src/screens/MobileNumberScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import SelectLocationScreen from './src/screens/SelectLocationScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignupScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
        />
        <Stack.Screen 
          name="Onboarding" 
          component={OnboardingScreen} 
        />
        <Stack.Screen 
          name="Signin" 
          component={SigninScreen} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen
          name="MobileScreen"
          component={MobileNumberScreen}
        />
        <Stack.Screen
          name='OTP'
          component={OTPVerificationScreen}
          />
        <Stack.Screen
          name="SelectLocation"
          component={SelectLocationScreen}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
