import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { fetchAssets } from "../actions"

interface Asset {

  id: number;
  name: string;
  updatedTime?: string;
  epc: string;
  qrCode: string;
  image?: string;
  detailedName: string;

}

const initialState = {
  assets: [],
  searchTerm: "",
} as {
  assets: Asset[];
  searchTerm: string;
}

const assetsSlice = createSlice({
  name: "asset",
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
      const selectedItem = state.assets.find(asset => asset.id === action.payload)
      if (selectedItem) {
        selectedItem.isSelected = !selectedItem.isSelected
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssets.fulfilled, (state, action) => {


      state.assets = action.payload.results.map((item) => ({

        id: item.id,
        name: item.name,
        image: item.image,
        updatedTime: item.updatedTime,
        epc: item.epc,
        qrCode: item.qrCode,
        detailedName: item.detailedName,
        serialNo: item.serialNo,
        isSelected: false,

      }))
    })
  },
})

export const {
  addAsset,
  changeAssetSearchTerm,
  resetAssets,
  removeAsset,
  editAsset,
  updateAssetIsSelected,
} = assetsSlice.actions
export const assetsReducer = assetsSlice.reducer
