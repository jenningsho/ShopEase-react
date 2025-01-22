import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Utilisation du localStorage
import cartReducer from './cartSlice';

// Configuration de redux-persist
const persistConfig = {
    key: 'root', // Clé du stockage
    storage, // LocalStorage
    whitelist: ['cart'], // le reducer "cart" à persister
};

const rootReducer = { 
    cart: cartReducer , // ajout le reducer du panier
}

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

// Configuration du store avec le reducer persistant
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Nécessaire pour redux-persist
        }),
});

// Création du persistor
export const persistor = persistStore(store);

export default store;
