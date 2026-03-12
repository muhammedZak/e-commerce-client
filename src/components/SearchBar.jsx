import { Search } from 'lucide-react';

function SearchBar() {
  return (
    <div className='hidden md:block flex-1'>
      <div className=' flex items-center h-11 bg-gray-100 border border-gray-100 rounded-lg px-4 focus-within:ring-2 focus-within:ring-blue-500'>
        <Search size={18} className='text-gray-500' />
        <input
          type='text'
          aria-label='Search products'
          role='searchbox'
          name=''
          id=''
          placeholder='Search for products'
          className='flex-1 h-full bg-transparent outline-none ml-2 '
        />
      </div>
    </div>
  );
}

export default SearchBar;
