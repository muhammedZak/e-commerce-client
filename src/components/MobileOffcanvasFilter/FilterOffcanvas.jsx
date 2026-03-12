import React from 'react';

function FilterOffcanvas({ open, onButtonClick }) {
  return (
    <div
      className={`z-50 h-full fixed top-0 left-0 bg-gray-100 overflow-hidden transition-all duration-300 ${open ? 'w-full' : 'w-0'}`}>
      <button
        onClick={onButtonClick}
        className='absolute top-0 right-6 text-4xl ml-14 cursor-pointer'>
        &times;
      </button>
      <a href='#'>About</a>
      <a href='#'>Services</a>
      <a href='#'>Clients</a>
      <a href='#'>Contact</a>
    </div>
  );
}

export default FilterOffcanvas;
