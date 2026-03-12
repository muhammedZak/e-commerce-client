import RatingStars from './RatingStars';

const RatingStar = () => {
  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 relative'>
      {product.badge && (
        <span className='absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded'>
          {product.badge}
        </span>
      )}

      <img
        src={product.image}
        alt={product.name}
        className='w-full h-44 object-contain mb-3'
      />

      <h3 className='font-medium text-gray-800'>{product.name}</h3>

      <RatingStars rating={product.rating} />

      <div className='flex items-center gap-2 mt-2'>
        <span className='text-lg font-semibold text-gray-900'>
          ₹{product.price.toLocaleString()}
        </span>
        <span className='text-sm text-gray-400 line-through'>
          ₹{product.oldPrice.toLocaleString()}
        </span>
      </div>

      <button className='mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'>
        Add to Cart
      </button>
    </div>
  );
};

export default RatingStar;
