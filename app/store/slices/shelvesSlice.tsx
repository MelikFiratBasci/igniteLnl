import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Product } from "./productsSlice"

export interface Shelve {
  id: number;
  name: string;
  code: string;
  barCode: string;
  type: string;
  size: string;
  description: string;
  category: string;
  address: string;
  capacity: number; // Depo Kapasitesi
  manager: string; // Depo Sorumlusu
  createdTime: Date; // Oluşturma Tarihi
  updatedTime: Date; // Güncelleme Tarihi
  products: Product[];
  isSelected: boolean;

}

const initialState = {
  shelves: [],
  searchTerm: '',
} as {
  shelves: Shelve[];
  searchTerm: string;
}

const shelvesSlice = createSlice({
  name: 'shelves',
  initialState,
  reducers: {
    addShelve(state, action: PayloadAction<Shelve>) {
      state.shelves.unshift(...action.payload)
    },
    changeShelveSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetShelves(state) {
      state.shelves = []
    },
    editShelve(state, action: PayloadAction<Shelve>) {
      const index = state.shelves.findIndex(product => product.id === action.payload.id)
      state.shelves[index] = action.payload
    },
    removeShelve(state, action: PayloadAction<number>) {
      const index = state.shelves.findIndex(product => product.id === action.payload)
      state.shelves.splice(index, 1)
    },
     updateShelveIsSelected(state, action: PayloadAction<number>) {
       const selectedItem = state.shelves.find(product => product.id === action.payload);
       if (selectedItem) {
         selectedItem.isSelected = !selectedItem.isSelected;
       }
    },

  }
})

export const { addShelve, changeShelveSearchTerm, resetShelves, removeShelve,editShelve,updateShelveIsSelected } = shelvesSlice.actions;
export const shelvesReducer = shelvesSlice.reducer;
