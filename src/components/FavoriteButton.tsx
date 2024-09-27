import React from 'react';
import {useSelector} from 'react-redux';
import {selectIsItemFavorite} from '../store/selectors/favoritesSelectors';
import {useAppDispatch} from '../store';
import {addFavorite, removeFavorite} from '../store/slices/favoritesSlice';
import {TouchableOpacity, StyleSheet} from 'react-native';
import FavoriteItem from '../types/favorites';
import Icon from 'react-native-vector-icons/AntDesign';

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
    <TouchableOpacity
      onPress={toggleFavorite}
      style={[
        styles.buttonContainer,
        isFavorite ? styles.removeFavorite : styles.addFavorite,
      ]}>
      <Icon
        name={isFavorite ? 'heart' : 'hearto'}
        size={24}
        color={isFavorite ? '#ff6b6b' : '#b5b5b5'}
      />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFavorite: {
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
  removeFavorite: {
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
});
