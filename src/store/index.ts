export { store } from './store';
export type { RootState, AppDispatch } from './store';
export {
  useFilters,
  useTitle,
  useAgeGroup,
  useDiseaseType,
  setTitleAction,
  setAgeGroupAction,
  setDiseaseTypeAction,
  setFiltersAction,
  resetFiltersAction,
} from './slices/filtersSlice';
export type { FiltersState } from './slices/filtersSlice';
