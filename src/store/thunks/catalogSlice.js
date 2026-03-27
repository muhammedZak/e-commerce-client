import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { data } from 'react-router-dom';

export const fetchCatelog = createAsyncThunk(
  'catalog/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/catalog', {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const createSport = createAsyncThunk(
  'catalog/createSport',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/sports',
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const updateSport = createAsyncThunk(
  'catalog/updateSport',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/sports/${id}`,
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const deleteSport = createAsyncThunk(
  'catalog/deleteSport',
  async (id, { rejectWithValue }) => {
    console.log(typeof id);
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/api/v1/sports/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const createCategory = createAsyncThunk(
  'catalog/createCategory',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/category',
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const updateCategory = createAsyncThunk(
  'catalog/updateCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/category/${id}`,
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'catalog/deleteCategory',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/category/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const createSubCategory = createAsyncThunk(
  'catalog/createSubCategory',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/subcategories',
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const updateSubcategory = createAsyncThunk(
  'catalog/updateSubcategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/subCategories/${id}`,
        data,
        {
          withCredentials: true,
        },
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const deleteSubcategory = createAsyncThunk(
  'catalog/deleteSubcategory',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/subCategories/${id}`, {
        withCredentials: true,
      });
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);
