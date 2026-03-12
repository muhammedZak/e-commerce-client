import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from '../store/slices/productsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});
