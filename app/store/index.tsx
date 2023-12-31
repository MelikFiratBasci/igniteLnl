import { configureStore } from "@reduxjs/toolkit"

import {
  productsReducer,
  addProduct,
  changeProductSearchTerm,
  resetProducts,
  removeProduct,
  editProduct,
  updateProductIsSelected,
} from "./slices/productsSlice"
import {
  assetsReducer,
  addAsset,
  changeAssetSearchTerm,
  resetAssets,
  removeAsset,
  editAsset,
  updateAssetIsSelected,
} from "./slices/assetsSlice"
import {
  wareHousesReducer,
  addWareHouse,
  changeWareHouseSearchTerm,
  resetWareHouses,
  removeWareHouse,
  editWareHouse,
  updateWareHouseIsSelected,
} from "./slices/wareHousesSlice"

const store = configureStore({
  reducer: {
    products: productsReducer,
    assets: assetsReducer,
    wareHouses: wareHousesReducer,
  },
})


export {
  store,
  addProduct, changeProductSearchTerm, resetProducts, removeProduct, editProduct, updateProductIsSelected,
  addAsset, changeAssetSearchTerm, resetAssets, removeAsset, editAsset, updateAssetIsSelected,
  addWareHouse, changeWareHouseSearchTerm, resetWareHouses, removeWareHouse, editWareHouse, updateWareHouseIsSelected,
}