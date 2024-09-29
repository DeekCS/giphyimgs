import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({resetErrorBoundary}) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/error.png')} style={styles.image} />
      <Text style={styles.title}>Oops! Something went wrong.</Text>
      <Text style={styles.description}>
        We're sorry, but an unexpected error occurred. Please try again later or
        reload the app.
      </Text>
      <Button onPress={resetErrorBoundary} title="Try Again" color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ErrorFallback;
