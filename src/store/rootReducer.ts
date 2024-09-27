import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import favoritesReducer from './slices/favoritesSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  favorites: favoritesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
