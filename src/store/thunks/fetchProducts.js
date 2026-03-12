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
