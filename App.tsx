import React from 'react';
import {Provider} from 'react-redux';
import store, {useAppDispatch} from './src/store';

import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  return <AppNavigator />;
};

const App: React.FC = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
