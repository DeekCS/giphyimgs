import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import gifs from '../types/gifs';

const { width } = Dimensions.get('window');
const imageSize = width / 2 - 12;

const truncateText = (text: string, maxLength: number): string => {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
};

const GifItem: React.FC<{ item: gifs }> = ({ item }) => (
  <View style={styles.gridItem}>
    <FastImage
      style={{ ...styles.gifImage, height: imageSize, width: imageSize }}
      source={{
        uri: item.images.fixed_height_downsampled.url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
    <Text style={styles.title}>
      {truncateText(item.title || 'No Title Available', 20)}
    </Text>
    <Text style={styles.description}>
      {item.description || 'No description available'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  gridItem: {
    margin: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gifImage: {
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  description: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 2,
  },
});

export default GifItem;
