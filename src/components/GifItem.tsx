import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import gifs from '../types/gifs';
import FavoriteButton from './FavoriteButton';
import {truncateText} from '@utils/textUtils';

const {width} = Dimensions.get('window');
const imageSize = width / 2 - 12;

import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/params';

type GifItemNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetails'
>;

const GifItem: React.FC<{item: gifs}> = ({item}) => {
  const navigation = useNavigation<GifItemNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetails', {item})}>
      <View style={styles.gridItem}>
        <FastImage
          style={{...styles.gifImage, height: imageSize, width: imageSize}}
          source={{
            uri: item.images.fixed_height_downsampled.url,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.title}>
          { truncateText(item.title, 20)}
        </Text>
        <Text style={styles.description}>
          {item?.user?.display_name || 'No description available'}
        </Text>
        <FavoriteButton item={item} />
      </View>
    </TouchableOpacity>
  );
};

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
