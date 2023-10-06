import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Shelve } from "./shelvesSlice"

export interface StorageUnit {
  id: number;
  name: string;
  code: string;
  barCode: string;
  type: string;
  description: string;
  category: string;
  address: string;
  capacity: number;
  manager: string;
  createdTime: Date;
  updatedTime: Date;
  shelves: Shelve[];
  isSelected: boolean;

}

const initialState = {
  storageUnits: [],
  searchTerm: '',
} as {
  storageUnits: StorageUnit[];
  searchTerm: string;
}

const storageUnitsSlice = createSlice({
  name: 'storageUnit',
  initialState,
  reducers: {
    addStorageUnit(state, action: PayloadAction<StorageUnit>) {
      state.storageUnits.unshift(...action.payload)
    },
    changeStorageUnitSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetStorageUnits(state) {
      state.storageUnits = []
    },
    editStorageUnit(state, action: PayloadAction<StorageUnit>) {
      const index = state.storageUnits.findIndex(product => product.id === action.payload.id)
      state.storageUnits[index] = action.payload
    },
    removeStorageUnit(state, action: PayloadAction<number>) {
      const index = state.storageUnits.findIndex(product => product.id === action.payload)
      state.storageUnits.splice(index, 1)
    },
     updateStorageUnitIsSelected(state, action: PayloadAction<number>) {
       const selectedItem = state.storageUnits.find(product => product.id === action.payload);
       if (selectedItem) {
         selectedItem.isSelected = !selectedItem.isSelected;
       }
    },


  }
})

export const { addStorageUnit, changeStorageUnitSearchTerm, resetStorageUnits, removeStorageUnit,editStorageUnit,updateStorageUnitIsSelected } = storageUnitsSlice.actions;
export const storageUnitsReducer = storageUnitsSlice.reducer;
