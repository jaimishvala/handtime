import { combineReducers } from "redux";
import { productsReducer } from "./product.reducer";

export const rootReducer = combineReducers({
    products: productsReducer
})