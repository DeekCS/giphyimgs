import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
