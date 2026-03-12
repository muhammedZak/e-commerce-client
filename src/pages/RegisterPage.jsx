import { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-6 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>
          Create Account
        </h2>

        <input
          type='text'
          name='name'
          placeholder='Name'
          onChange={handleChange}
          className='w-full border p-2 mb-3 rounded'
        />

        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          className='w-full border p-2 mb-3 rounded'
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={handleChange}
          className='w-full border p-2 mb-3 rounded'
        />

        <button className='w-full bg-blue-600 text-white py-2 rounded'>
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
