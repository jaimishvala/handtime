import { combineReducers } from "redux";
import { productsReducer } from "./product.reducer";
import { watchSlice } from "../slice/watch.slice";


export const rootReducer = combineReducers({
    products: productsReducer,
    watch: watchSlice
})