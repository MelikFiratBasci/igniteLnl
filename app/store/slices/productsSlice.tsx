import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  qrcode: string;
}

const initialState = {
  products: [],
  searchTerm: '',
} as {
  products: Product[];
  searchTerm: string;
}

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.unshift(...action.payload)
    },
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetProducts(state) {
      state.products = []
    },



  }
})

export const { addProduct, changeSearchTerm, resetProducts } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
