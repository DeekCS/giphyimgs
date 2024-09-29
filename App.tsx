import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from '@components/ErrorBoundary';

const AppContent: React.FC = () => {
  return <AppNavigator />;
};

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
