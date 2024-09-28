import React from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import gifs from '../types/gifs';
import FavoriteButton from './FavoriteButton';
import {truncateText} from '@utils/textUtils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/params';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const imageSize = width / 2 - 12;

type GifItemNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetails'>;

const GifItem: React.FC<{item: gifs}> = ({item}) => {
  const navigation = useNavigation<GifItemNavigationProp>();

  return (
    <Pressable onPress={() => navigation.navigate('ItemDetails', {item})}>
      <Animated.View
        style={styles.gridItem}
        entering={FadeInLeft.delay(300)}
        sharedTransitionTag={`${item.id}-wrapper`}>
        {/* Image Container */}
        <Animated.View sharedTransitionTag={`item.${item.id}-image`}>
          <Animated.Image
            source={{uri: item.images.fixed_height_downsampled.url}}
            style={{...styles.gifImage, height: imageSize, width: imageSize}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Animated.View>

        {/* Title and Description */}
        <Text style={styles.title}>{truncateText(item.title, 20)}</Text>
        <Text style={styles.description}>
          {item?.user?.display_name || 'No description available'}
        </Text>

        {/* Favorite Button */}
        <FavoriteButton item={item} />
      </Animated.View>
    </Pressable>
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
