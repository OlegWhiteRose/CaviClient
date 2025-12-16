import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export interface FiltersState {
  title: string;
  ageGroup: string;
  diseaseType: string;
}

const initialState: FiltersState = {
  title: '',
  ageGroup: '',
  diseaseType: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setAgeGroup(state, action: PayloadAction<string>) {
      state.ageGroup = action.payload;
    },
    setDiseaseType(state, action: PayloadAction<string>) {
      state.diseaseType = action.payload;
    },
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.title = action.payload.title;
      state.ageGroup = action.payload.ageGroup;
      state.diseaseType = action.payload.diseaseType;
    },
    resetFilters(state) {
      state.title = '';
      state.ageGroup = '';
      state.diseaseType = '';
    },
  },
});

// Селекторы
export const useFilters = () => useSelector((state: RootState) => state.filters);
export const useTitle = () => useSelector((state: RootState) => state.filters.title);
export const useAgeGroup = () => useSelector((state: RootState) => state.filters.ageGroup);
export const useDiseaseType = () => useSelector((state: RootState) => state.filters.diseaseType);

// Actions
export const {
  setTitle: setTitleAction,
  setAgeGroup: setAgeGroupAction,
  setDiseaseType: setDiseaseTypeAction,
  setFilters: setFiltersAction,
  resetFilters: resetFiltersAction,
} = filtersSlice.actions;

export default filtersSlice.reducer;
