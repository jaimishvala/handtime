import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { rootReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'cart'] // only navigation will be persisted

}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persist = persistStore(store)

    return { store, persist };
}