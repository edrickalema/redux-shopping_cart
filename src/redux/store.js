import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import featuredProductsSlice from './reducers/featured_product_reducer';
import productsSlice from './reducers/products';
import productSlice from './reducers/product';
import cartSlice from './reducers/cart';
const rootReducer = combineReducers({
	featured_products: featuredProductsSlice,
	products: productsSlice,
	product: productSlice,
	cart: cartSlice,
});


const persistConfig = {
	key: 'root',
	version: 2,
	storage,
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});


export const persister = persistStore(store);
