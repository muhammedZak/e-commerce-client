import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  fetchVariants,
  fetchSingleProducts,
  createVariant,
  updateVariant,
  deleteVariant,
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
      .addCase(updateVariant.fulfilled, (state, action) => {
        const index = state.variants.findIndex(
          (v) => v._id === action.payload._id,
        );
        if (index !== -1) {
          state.variants[index] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(deleteVariant.fulfilled, (state, action) => {
        state.variants = state.variants.filter((v) => v._id !== action.payload);
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          fetchVariants.pending,
          createVariant.pending,
          updateVariant.pending,
          deleteVariant.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          fetchVariants.rejected,
          createVariant.rejected,
          updateVariant.rejected,
          deleteVariant.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const variantsReducer = variantSlice.reducer;
export const variantsActions = variantSlice.actions;
