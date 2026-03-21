import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from '../store/slices/productsSlice';
import authReducer from './slices/authSlice';
import { variantsReducer } from './slices/variantSlice';
import { catalogReducer } from './slices/catalogSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    variants: variantsReducer,
    catalog: catalogReducer,
  },
});
