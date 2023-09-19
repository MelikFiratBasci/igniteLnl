import {configureStore} from "@reduxjs/toolkit"
import {productsReducer,addProduct, changeSearchTerm, resetProducts} from "./slices/productsSlice"


const store = configureStore({
  reducer: {
    products: productsReducer,
  },
})


export { store, addProduct, changeSearchTerm, resetProducts };