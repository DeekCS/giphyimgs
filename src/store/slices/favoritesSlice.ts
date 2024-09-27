import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import FavoriteItem from '../../types/favorites';

interface FavoritesState {
  items: FavoriteItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      state.items.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: state => {
      state.items = [];
    },
  },
});

export const {addFavorite, removeFavorite, clearFavorites} =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
