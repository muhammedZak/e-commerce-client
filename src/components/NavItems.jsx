import { ShoppingCart, Heart, UserRound, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

function NavItems({ children, user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='flex items-center gap-6'>
      {!user ? (
        <Link
          to='/login'
          className='flex items-center gap-2 hover:text-blue-600 transition'>
          <UserRound size={20} />
          <span className='hidden md:block'>Login</span>
        </Link>
      ) : (
        <div className='relative group'>
          <div className='flex items-center gap-2 cursor-pointer hover:text-blue-600'>
            <UserRound size={20} />
            <span className='hidden md:block'>{user.name}</span>
          </div>
          <div className='absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all'>
            <Link to='/profile' className='block px-4 py-2 hover:bg-gray-100'>
              Profile
            </Link>

            <Link to='/orders' className='block px-4 py-2 hover:bg-gray-100'>
              Orders
            </Link>

            <button
              onClick={handleLogout}
              className='w-full text-left px-4 py-2 hover:bg-gray-100'>
              Logout
            </button>
          </div>
        </div>
      )}
      <Link
        to='/wishlist'
        className='flex items-center gap-2 hover:text-blue-600 transition'>
        <Heart size={20} />
        <span className='hidden md:block'>Wishlist</span>
      </Link>
      <Link to='/cart' className='relative hover:text-blue-600 transition'>
        <ShoppingCart size={20} />
        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
          2
        </span>
      </Link>
      {children}
    </div>
  );
}

export default NavItems;
