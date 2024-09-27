import React from 'react';
import { NavigationContainer } from '@react-navigation/native';


import { useSelector } from 'react-redux';
import { selectUser } from '../store/selectors/authSelectors';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';


const AppNavigator: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;