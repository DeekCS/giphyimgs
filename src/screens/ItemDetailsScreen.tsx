import React from 'react';
import {Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import FavoriteItem from '../types/favorites';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from '../types/params';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import FavoriteButton from '@components/FavoriteButton';

type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
type ItemDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetails'
>;

type ItemDetailsProps = {
  route: ItemDetailsScreenRouteProp;
  navigation: ItemDetailsScreenNavigationProp;
};

const {width} = Dimensions.get('window');

const imageSize = width - 24;

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({route}) => {
  const {item} = route.params as {item: FavoriteItem};
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <FastImage
        style={{...styles.gifImage, height: imageSize, width: imageSize}}
        source={{
          uri: item.images.fixed_height_downsampled.url,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <FavoriteButton item={item} />
      <Text style={styles.title}>{item.title || 'No Title Available'}</Text>
      <Text style={styles.description}>
        {item?.alt_text || 'No description available'}
      </Text>
    </ScrollView>
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
    flexGrow: 1,
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
