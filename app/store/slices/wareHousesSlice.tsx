import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { StorageUnit } from "./storageUnitsSlice"

interface WareHouse {
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
  storageUnits: StorageUnit[];
  isSelected: boolean;

}

const initialState = {
  wareHouses: [],
  searchTerm: '',
} as {
  wareHouses: WareHouse[];
  searchTerm: string;
}

const wareHousesSlice = createSlice({
  name: 'wareHouse',
  initialState,
  reducers: {
    addWareHouse(state, action: PayloadAction<WareHouse>) {
      state.wareHouses.unshift(...action.payload)
    },
    changeWareHouseSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetWareHouses(state) {
      state.wareHouses = []
    },
    editWareHouse(state, action: PayloadAction<WareHouse>) {
      const index = state.wareHouses.findIndex(product => product.id === action.payload.id)
      state.wareHouses[index] = action.payload
    },
    removeWareHouse(state, action: PayloadAction<number>) {
      const index = state.wareHouses.findIndex(product => product.id === action.payload)
      state.wareHouses.splice(index, 1)
    },
     updateWareHouseIsSelected(state, action: PayloadAction<number>) {
       const selectedItem = state.wareHouses.find(product => product.id === action.payload);
       if (selectedItem) {
         selectedItem.isSelected = !selectedItem.isSelected;
       }
    },


  }
})

export const { addWareHouse, changeWareHouseSearchTerm, resetWareHouses, removeWareHouse,editWareHouse,updateWareHouseIsSelected } = wareHousesSlice.actions;
export const wareHousesReducer = wareHousesSlice.reducer;
