import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createSport,
  createCategory,
  createSubCategory,
  deleteCategory,
  fetchCatelog,
  updateCategory,
} from '../thunks/catalogSlice.js';

const initialState = {
  sports: [],
  categories: [],
  subCategories: [],
  isLoading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // =========================
      // 📦 FETCH CATALOG
      // =========================
      .addCase(fetchCatelog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatelog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sports = action.payload.sports;
        state.categories = action.payload.categories;
        state.subCategories = action.payload.subCategories;
      })
      .addCase(fetchCatelog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // =========================
      // ✅ CREATE SPORT
      // =========================
      .addCase(createSport.fulfilled, (state, action) => {
        state.sports.push(action.payload);
      })

      // =========================
      // ✅ CREATE CATEGORY
      // =========================
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // =========================
      // ✅ CREATE SUBCATEGORY
      // =========================
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subCategories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id,
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload,
        );
      })

      // =========================
      // 🔄 GLOBAL PENDING (ALL CREATE)
      // =========================
      .addMatcher(
        isAnyOf(
          createSport.pending,
          createCategory.pending,
          createSubCategory.pending,
          updateCategory.pending,
          deleteCategory.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )

      // =========================
      // ❌ GLOBAL REJECTED (ALL CREATE)
      // =========================
      .addMatcher(
        isAnyOf(
          createSport.rejected,
          createCategory.rejected,
          createSubCategory.rejected,
          updateCategory.rejected,
          deleteCategory.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      )

      // =========================
      // ✅ GLOBAL FULFILLED (STOP LOADING)
      // =========================
      .addMatcher(
        isAnyOf(
          createSport.fulfilled,
          createCategory.fulfilled,
          createSubCategory.fulfilled,
          updateCategory.fulfilled,
          deleteCategory.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const catalogReducer = catalogSlice.reducer;
