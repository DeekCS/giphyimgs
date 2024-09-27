import {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

type Props = {
  message: string | null;
};

const ErrorMessage: FC<Props> = ({message}) => {
  if (!message) return null;

  return <Text style={styles.errorText}>{message}</Text>;
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default ErrorMessage;
