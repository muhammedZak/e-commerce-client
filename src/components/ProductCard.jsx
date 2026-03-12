import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function ProductCard({ product }) {
  return (
    <div className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer group'>
      <Link to={`/products/${product._id}`}>
        <img
          src={`http://localhost:5000${product.thumbNailImage}`}
          alt={product.name}
          className='w-full h-auto object-cover transform group-hover:scale-105 transition duration-500'
        />
      </Link>
      <div className='px-2'>
        <Link to={`/products/${product._id}`}>
          <h1 className='text-lg font-semibold text-gray-800 mt-3'>
            {product.name}
          </h1>
        </Link>
        <div className='flex justify-between mt-3'>
          <p>{product.minPrice}</p>
          <Rating value={product.rating} />
        </div>
        <button className='w-full bg-gray-950 rounded-md p-2 text-gray-300 my-3 hover:text-gray-200 hover:bg-gray-900 cursor-pointer'>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
