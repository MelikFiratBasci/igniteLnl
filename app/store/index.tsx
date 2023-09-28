import {configureStore} from "@reduxjs/toolkit"
import {productsReducer,addProduct, changeProductSearchTerm, resetProducts, removeProduct, editProduct,updateProductIsSelected } from "./slices/productsSlice"
import {assetsReducer,addAsset, changeAssetSearchTerm, resetAssets, removeAsset, editAsset,updateAssetIsSelected } from "./slices/assetsSlice"


const store = configureStore({
  reducer: {
    products: productsReducer,
    assets: assetsReducer,
  },
})


export { store, addProduct, changeProductSearchTerm, resetProducts, removeProduct, editProduct,updateProductIsSelected,addAsset, changeAssetSearchTerm, resetAssets, removeAsset, editAsset,updateAssetIsSelected  };