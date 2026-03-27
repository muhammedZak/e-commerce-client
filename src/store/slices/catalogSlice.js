import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  createSport,
  createCategory,
  createSubCategory,
  deleteCategory,
  fetchCatelog,
  updateCategory,
  updateSport,
  deleteSport,
  updateSubcategory,
  deleteSubcategory,
} from '../thunks/catalogSlice.js';

const initialState = {
  sports: [],
  categories: [],
  subcategories: [],
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
        state.subcategories = action.payload.subCategories;
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
      .addCase(updateSport.fulfilled, (state, action) => {
        const index = state.sports.findIndex(
          (s) => s._id === action.payload._id,
        );
        if (index !== -1) {
          state.sports[index] = action.payload;
        }
      })
      .addCase(deleteSport.fulfilled, (state, action) => {
        state.sports = state.sports.filter((s) => s._id !== action.payload);
      })

      // =========================
      // ✅ CREATE CATEGORY
      // =========================
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
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
      // ✅ CREATE SUBCATEGORY
      // =========================
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.subcategories.push(action.payload);
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const index = state.subcategories.findIndex(
          (sub) => sub._id === action.payload._id,
        );
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.filter(
          (sub) => sub._id !== action.payload,
        );
      })

      // =========================
      // 🔄 GLOBAL PENDING (ALL CREATE)
      // =========================
      .addMatcher(
        isAnyOf(
          createSport.pending,
          updateSport.pending,
          deleteSport.pending,
          createCategory.pending,
          createSubCategory.pending,
          updateCategory.pending,
          deleteCategory.pending,
          updateSubcategory.pending,
          deleteSubcategory.pending,
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
          updateSport.rejected,
          deleteSport.rejected,
          createCategory.rejected,
          updateCategory.rejected,
          deleteCategory.rejected,
          createSubCategory.rejected,
          updateSubcategory.rejected,
          deleteSubcategory.rejected,
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
          updateSport.fulfilled,
          deleteSport.fulfilled,
          createCategory.fulfilled,
          updateCategory.fulfilled,
          deleteCategory.fulfilled,
          createSubCategory.fulfilled,
          updateSubcategory.fulfilled,
          deleteSubcategory.fulfilled,
        ),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const catalogReducer = catalogSlice.reducer;
