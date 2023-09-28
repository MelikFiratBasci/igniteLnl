import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  qrcode: string;
  isSelected: boolean;

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
    changeProductSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetProducts(state) {
      state.products = []
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      state.products[index] = action.payload
    },
    removeProduct(state, action: PayloadAction<number>) {
      const index = state.products.findIndex(product => product.id === action.payload)
      state.products.splice(index, 1)
    },
     updateProductIsSelected(state, action: PayloadAction<number>) {
       const selectedItem = state.products.find(product => product.id === action.payload);
       if (selectedItem) {
         selectedItem.isSelected = !selectedItem.isSelected;
       }
    },



  }
})

export const { addProduct, changeProductSearchTerm, resetProducts, removeProduct,editProduct,updateProductIsSelected } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
