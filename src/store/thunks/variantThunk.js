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

export const fetchSingleProducts = createAsyncThunk(
  'products/fetchSingleProducts',
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/v1/products/${id}`,
    );

    return response.data;
  },
);
