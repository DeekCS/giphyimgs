import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectIsItemFavorite} from '../store/selectors/favoritesSelectors';
import {addFavorite, removeFavorite} from '../store/slices/favoritesSlice';
import FavoriteItem from '../types/favorites';

interface ItemDetailsProps {
  route: {params: {item: FavoriteItem}};
}

const ItemDetailsScreen: React.FC<ItemDetailsProps> = ({route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const isFavorite = useSelector(selectIsItemFavorite(item.id));

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item.url}} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.type}>Type: {item.type}</Text>
      <Text style={styles.slug}>Slug: {item.slug}</Text>

      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 4,
  },
  slug: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
  },
  favoriteButton: {
    padding: 12,
    backgroundColor: '#6C4FFF',
    borderRadius: 8,
  },
  favoriteButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
