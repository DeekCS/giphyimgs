import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { useSelector } from 'react-redux';
import { selectUser } from '../store/selectors/authSelectors';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const AppNavigator: React.FC = () => {
  const user = useSelector(selectUser);

  return (
  <SafeAreaProvider>
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;