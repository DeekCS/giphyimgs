import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import ErrorMessage from './ErrorMessage';

type Props = {
  value: string;
  placeholder: string;
  error: string | null;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

const TextInputWithError: React.FC<Props> = ({
  value,
  placeholder,
  error,
  onChangeText,
  secureTextEntry = false,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        allowFontScaling={false}
        autoCapitalize="none"
        placeholderTextColor={'#FFF'}
      />
      <ErrorMessage message={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 16,
    color: '#FFF',
  },
});

export default TextInputWithError;
