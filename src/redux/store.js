import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { rootReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootSaga from "./saga/rootSaga"
import createSagaMiddleware from 'redux-saga'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['products', 'cart','auth','order'] // only navigation will be persisted

}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()
const Middleware = [thunk, sagaMiddleware]


export const configureStore = () => {
    let store = createStore(persistedReducer, applyMiddleware(...Middleware))
    sagaMiddleware.run(rootSaga)

    return store;
}

export let store = configureStore()
export let persist = persistStore(store)
