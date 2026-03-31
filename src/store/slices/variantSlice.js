import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchVariants,
  fetchSingleProducts,
  createVariant,
} from '../thunks/variantThunk.js';

const initialState = {
  variants: [],
  count: null,
  totalPages: null,
  currentPage: null,
  // product: null,
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
      .addCase(fetchVariants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.variants = action.payload.data;
        state.count = action.payload.count;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(createVariant.fulfilled, (state, action) => {
        state.isLoading = false;
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
      })
      .addMatcher(
        isAnyOf(fetchVariants.pending, createVariant.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(fetchVariants.rejected, createVariant.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const variantsReducer = variantSlice.reducer;
export const variantsActions = variantSlice.actions;
