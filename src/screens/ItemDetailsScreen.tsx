import React from 'react';
import {Text, StyleSheet, Dimensions, ScrollView, SafeAreaView} from 'react-native';
import FavoriteItem from '../types/favorites';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from '../types/params';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoriteButton from '@components/FavoriteButton';
import Animated, { FadeInLeft } from 'react-native-reanimated';

type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
type ItemDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ItemDetails'>;

type ItemDetailsProps = {
  route: ItemDetailsScreenRouteProp;
  navigation: ItemDetailsScreenNavigationProp;
};

const {width} = Dimensions.get('window');
const imageSize = width - 24;

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({route}) => {
  const {item} = route.params as {item: FavoriteItem};
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
      <Animated.View
        style={styles.container}
        entering={FadeInLeft.delay(200)}
        sharedTransitionTag={`${item.id}-wrapper`}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Section */}
          <Animated.View sharedTransitionTag={`item.${item.id}-image`}>
            <Animated.Image
              source={{uri: item.images.fixed_height_downsampled.url}}
              style={{...styles.gifImage, height: imageSize, width: imageSize}}
              resizeMode={FastImage.resizeMode.cover}
            />
          </Animated.View>

          {/* Favorite Button */}
          <FavoriteButton item={item} />

          {/* Title and Description */}
          <Text style={styles.title}>{item.title || 'No Title Available'}</Text>
          <Text style={styles.description}>
            {item?.alt_text || 'No description available'}
          </Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 12,
    alignItems: 'center',
    textAlign: 'center',
    paddingEnd: 12,
  },
  gifImage: {
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  description: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 8,
  },
});
