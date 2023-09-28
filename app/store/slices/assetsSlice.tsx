import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

interface Asset {
  id: number;
  title: string;
  image: string;
  price: number;
  qrcode: string;
  isSelected: boolean;

}

const initialState = {
  assets: [],
  searchTerm: '',
} as {
  assets: Asset[];
  searchTerm: string;
}

const assetsSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset(state, action: PayloadAction<Asset>) {
      state.assets.unshift(...action.payload)
    },
    changeAssetSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload
    },
    resetAssets(state) {
      state.assets = []
    },
    editAsset(state, action: PayloadAction<Asset>) {
      const index = state.assets.findIndex(asset => asset.id === action.payload.id)
      state.assets[index] = action.payload
    },
    removeAsset(state, action: PayloadAction<number>) {
      const index = state.assets.findIndex(asset => asset.id === action.payload)
      state.assets.splice(index, 1)
    },
    updateAssetIsSelected(state, action: PayloadAction<number>) {
      const selectedItem = state.assets.find(asset => asset.id === action.payload);
      if (selectedItem) {
        selectedItem.isSelected = !selectedItem.isSelected;
      }
    },



  }
})

export const { addAsset, changeAssetSearchTerm, resetAssets, removeAsset,editAsset,updateAssetIsSelected } = assetsSlice.actions;
export const assetsReducer = assetsSlice.reducer;
