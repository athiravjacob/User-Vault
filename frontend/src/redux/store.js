import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
    whiteList:['auth']
}

const persistedReducer = persistReducer(persistConfig,authReducer)

const store = configureStore({
    reducer: {
        auth:persistedReducer
    }
})
export const persistor = persistStore(store)

export default store