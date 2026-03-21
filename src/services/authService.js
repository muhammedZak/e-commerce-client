import axios from 'axios';

const API_URL = '/api/v1/auth';

export const registerUser = async (userData) => {
  const { data } = await axios.post(
    `http://localhost:5000${API_URL}/register`,
    userData,
  );
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await axios.post(
    `http://localhost:5000${API_URL}/login`,
    userData,
    {
      withCredentials: true,
    },
  );
  return data;
};
