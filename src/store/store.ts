import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filtersSlice';

const rootReducer = combineReducers({
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
