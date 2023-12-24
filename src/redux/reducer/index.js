import { combineReducers } from "redux";
import watchReducer from "../slice/watch.slice";
import productsReducer from "../slice/product.slice";
import cartReducer from "../slice/cart.slice";
import watchcatReducer from "../slice/watchcat.slice";


export const rootReducer = combineReducers({
    products: productsReducer,
    watch: watchReducer,
    cart: cartReducer,
    watchcat: watchcatReducer
})