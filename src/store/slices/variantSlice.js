import { createSlice } from '@reduxjs/toolkit';
import { fetchVariants, fetchSingleProducts } from '../thunks/variantThunk.js';

const initialState = {
  variants: [],
  count: null,
  totalPages: null,
  currentPage: null,
  product: null,
  isLoading: false,
  error: null,
};

const variantSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVariants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants = action.payload.data;
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchVariants.rejected, (state, action) => {
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

export const variantsReducer = variantSlice.reducer;
export const variantsActions = variantSlice.actions;
