import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LoginRequest} from '../../types/formTypes';
import useLogin from '../../hooks/useLogin';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {setUser} from '../../store/slices/authSlice';

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialState: LoginRequest = {userName: '', password: ''};

  const user = {
    userName: 'a.aldeek@gmail.com',
    password: 'password123',
  };

  const onSubmitForm = (data: LoginRequest) => {
    // if no username or password entered, show alert
    if (!data.userName || !data.password) {
      return Alert.alert('Error', 'Please enter your username and password');
    }
    // if username or password is incorrect, show alert
    if (data.userName !== user.userName || data.password !== user.password) {
      return Alert.alert('Error', 'Invalid username or password');
    }
    // if username and password are correct, show alert
    Alert.alert('Success', 'You are logged in!');
    dispatch(setUser(data));
  };

  const {values, onSubmit, getError, handleChange, isDisabled, loading} =
    useLogin({
      onSubmitForm,
      initialState,
    });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Giphy</Text>
        <Text style={styles.subtitle}>Be Animated!</Text>

        <Image source={require('../../assets/logo.png')} style={styles.logo} />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={values.userName ?? ''}
          onChangeText={text => handleChange(text, 'userName')}
        />
        {getError('userName') && (
          <Text style={styles.errorText}>{getError('userName')}</Text>
        )}

        {/* Password Input with Show/Hide Toggle */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={values.password ?? ''}
            onChangeText={text => handleChange(text, 'password')}
            secureTextEntry={!showPassword} // Toggle secure text entry based on state
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        {getError('password') && (
          <Text style={styles.errorText}>{getError('password')}</Text>
        )}

        {loading && <ActivityIndicator size="large" />}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => onSubmitForm(values as LoginRequest)}
          disabled={isDisabled}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#1F1F1F',
    color: '#FFF',
    padding: 18,
    paddingRight: 50,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#6C4FFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default LoginScreen;
