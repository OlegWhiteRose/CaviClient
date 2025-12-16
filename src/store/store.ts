import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
  cart: cartReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
