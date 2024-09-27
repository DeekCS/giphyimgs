import React from 'react';
import {Provider} from 'react-redux';
import store, {useAppDispatch} from './src/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import AppNavigator from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  return <AppNavigator />;
};

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
