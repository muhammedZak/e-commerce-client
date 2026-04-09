import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchVariants = createAsyncThunk(
  'variants/fetchVariants',
  async (productId) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/variants/${productId}/variants`,
    );

    return response.data;
  },
);

export const createVariant = createAsyncThunk(
  'variants/createVariant',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/variants/${data.productId}/variants`,
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

export const updateVariant = createAsyncThunk(
  'variants/updateVariant',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/variants/${id}`,
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

export const deleteVariant = createAsyncThunk(
  'variants/deleteVariant',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/variants/${id}`,
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

export const fetchSingleProducts = createAsyncThunk(
  'products/fetchSingleProducts',
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`,
    );

    return response.data;
  },
);
