import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
interface ScrollToTopButtonProps {
  onPress: () => void;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({onPress}) => (
  <TouchableOpacity style={styles.scrollToTopButton} onPress={onPress}>
    <Text style={styles.scrollToTopText}>
      <Icon name="arrowup" size={24} color="#fff" />
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6C4FFF',
    borderWidth: 1,
    shadowOpacity: 0.25,
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
  scrollToTopText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScrollToTopButton;
