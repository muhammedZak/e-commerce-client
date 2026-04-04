import React from 'react';
import { Link } from 'react-router-dom';

function Card({ product }) {
  return (
    <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'>
      <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition'>
        <Link to={`/products/${product._id}`}>
          <img
            src={`http://localhost:5000/${product.thumbNailImage}`}
            alt='Product'
            className='w-full h-56 object-cover'
          />
        </Link>

        {/* Content */}
        <div className='p-4 space-y-2'>
          <Link to={`/products/${product._id}`}>
            <h3 className='text-lg font-semibold text-gray-900 leading-snug'>
              {product.name}
            </h3>
          </Link>

          <p className='text-sm text-gray-500 line-clamp-2'>
            {product.description}
          </p>

          <p className='text-base font-semibold text-blue-600'>
            {/* ₹{product.variants[0].discountPrice} */}
          </p>

          <button className='w-full mt-3 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 transition'>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
