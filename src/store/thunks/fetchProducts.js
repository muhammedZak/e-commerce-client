import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page = 1) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/products?page=${page}&limit=20`,
    );

    return response.data;
  },
);

export const fetchSingleProducts = createAsyncThunk(
  'products/fetchSingleProducts',
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`,
    );

    return response.data;
  },
);

export const createProduct = createAsyncThunk(
  'products/createProducts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/products`,
        data,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProducts',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/products/${id}`,
        data,
        {
          withCredentials: true,
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProducts',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/products/${id}`,
        { withCredentials: true },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || error.message,
      );
    }
  },
);
