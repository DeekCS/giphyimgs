import React from 'react';
import {useSelector} from 'react-redux';
import {selectIsItemFavorite} from '../store/selectors/favoritesSelectors';
import {useAppDispatch} from '../store';
import {addFavorite, removeFavorite} from '../store/slices/favoritesSlice';
import {TouchableOpacity, Text} from 'react-native';
import FavoriteItem from '../types/favorites';

interface FavoriteButtonProps {
  item: FavoriteItem;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({item}) => {
  const dispatch = useAppDispatch();
  const isFavorite = useSelector(selectIsItemFavorite(item.id));

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite}>
      <Text>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
