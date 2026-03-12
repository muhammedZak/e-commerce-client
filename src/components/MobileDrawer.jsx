import { ShoppingCart, Heart, UserRound, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

function MobileDrawer({ isOpen, handleClick }) {
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? 'visible' : 'invisible'
      }`}>
      <div
        onClick={() => handleClick(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-6 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-lg font-semibold'>Menu</h2>
          <button onClick={() => handleClick(false)}>
            <X size={22} />
          </button>
        </div>

        <div className='flex items-center h-11 bg-gray-100 border rounded-lg px-4 mb-6'>
          <Search size={18} className='text-gray-500' />
          <input
            type='text'
            placeholder='Search products'
            className='flex-1 h-full bg-transparent outline-none ml-2'
          />
        </div>

        <nav className='flex flex-col gap-4 text-gray-700'>
          <Link
            to='/account'
            onClick={() => handleClick(false)}
            className='flex items-center gap-3 hover:text-blue-600'>
            <UserRound size={20} />
            Account
          </Link>

          <Link
            to='/wishlist'
            onClick={() => handleClick(false)}
            className='flex items-center gap-3 hover:text-blue-600'>
            <Heart size={20} />
            Wishlist
          </Link>

          <Link
            to='/cart'
            onClick={() => handleClick(false)}
            className='flex items-center gap-3 hover:text-blue-600'>
            <ShoppingCart size={20} />
            Cart
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileDrawer;
