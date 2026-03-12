import React from 'react';

function Sidebar() {
  return (
    <div className='bg-white p-5 rounded-xl shadow-sm'>
      <h2 className='font-semibold text-lg mb-4'>Filters</h2>

      {/* Category */}
      <div className='mb-6'>
        <h3 className='font-medium mb-2'>Category</h3>
        <div className='space-y-2 text-sm text-gray-600'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' defaultChecked />
            Men
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' />
            Women
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' />
            Electronics
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' />
            Accessories
          </label>
        </div>
      </div>

      {/* Price Range */}
      <div className='mb-6'>
        <h3 className='font-medium mb-2'>Price Range</h3>
        <input type='range' className='w-full' />
        <div className='flex justify-between text-xs text-gray-500'>
          <span>₹500</span>
          <span>₹10,000</span>
        </div>
      </div>

      {/* Brand */}
      <div className='mb-6'>
        <h3 className='font-medium mb-2'>Brand</h3>
        <div className='space-y-2 text-sm text-gray-600'>
          <label className='flex items-center gap-2'>
            <input type='checkbox' /> Nike
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' defaultChecked /> Adidas
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' /> Puma
          </label>
          <label className='flex items-center gap-2'>
            <input type='checkbox' /> Apple
          </label>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
