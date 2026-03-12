import { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      localStorage.setItem('userInfo', JSON.stringify(data.user));

      navigate('/');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md p-6 bg-white shadow-lg rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4 text-center'>Login</h2>

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
          Login
        </button>

        <p className='text-center mt-4 text-sm'>
          New user?{' '}
          <Link
            to='/register'
            className='text-blue-600 hover:underline font-medium'>
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
