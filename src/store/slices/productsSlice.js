import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchSingleProducts } from '../thunks/fetchProducts.js';

const initialState = {
  products: [],
  count: null,
  totalPages: null,
  currentPage: null,
  product: null,
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(fetchSingleProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const productReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;
