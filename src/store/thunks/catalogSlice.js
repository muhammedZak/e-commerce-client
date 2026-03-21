import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCatelog = createAsyncThunk(
  'catalog/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/catalog', {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
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
    } catch (err) {
      return rejectWithValue(err.response.data);
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
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
