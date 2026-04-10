import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchSingleProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../thunks/fetchProducts.js';

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
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSingleProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.data;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id,
        );
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchProducts.pending,
          createProduct.pending,
          fetchSingleProducts.pending,
          updateProduct.pending,
          deleteProduct.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchProducts.rejected,
          createProduct.rejected,
          fetchSingleProducts.rejected,
          updateProduct.rejected,
          deleteProduct.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const productReducer = productsSlice.reducer;
export const productsActions = productsSlice.actions;
