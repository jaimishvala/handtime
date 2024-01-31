import { combineReducers } from "redux";
import watchReducer from "../slice/watch.slice";
import productsReducer from "../slice/product.slice";
import cartReducer from "../slice/cart.slice";
import watchcatReducer from "../slice/watchcat.slice";
import watchsubcatReducer from "../slice/watchsub.slice";
import { authReducer } from "./auth.reducer";
import alertReducer from "../slice/alert.slice";
import orderReducer from "../slice/order.slice";


export const rootReducer = combineReducers({
    products: productsReducer,
    watch: watchReducer,
    cart: cartReducer,
    watchcat: watchcatReducer,
    watchsubcat: watchsubcatReducer,
    auth: authReducer,
    alert: alertReducer,
    order: orderReducer
})