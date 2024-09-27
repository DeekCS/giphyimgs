import {createSelector} from 'reselect';
import {RootState} from '../index';
import FavoriteItem from '../../types/favorites';

const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteItems = createSelector(
  [selectFavoritesState],
  favoritesState => favoritesState.items,
);

export const selectFavoriteCount = createSelector(
  [selectFavoriteItems],
  items => items.length,
);

export const selectIsItemFavorite = (itemId: string) =>
  createSelector([selectFavoriteItems], items =>
    items.some((item: FavoriteItem) => item.id === itemId),
  );
