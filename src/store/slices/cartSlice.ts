import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export interface CartState {
  items: number;
  calculationId: number | null;
}

const initialState: CartState = {
  items: 0,
  calculationId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<number>) {
      state.items = action.payload;
    },
    setCalculationId(state, action: PayloadAction<number | null>) {
      state.calculationId = action.payload;
    },
    setCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items;
      state.calculationId = action.payload.calculationId;
    },
  },
});

export const useCartItems = () => useSelector((state: RootState) => state.cart.items);
export const useCalculationId = () => useSelector((state: RootState) => state.cart.calculationId);
export const useCart = () => useSelector((state: RootState) => state.cart);

export const {
  setCartItems: setCartItemsAction,
  setCalculationId: setCalculationIdAction,
  setCart: setCartAction,
} = cartSlice.actions;

export default cartSlice.reducer;
