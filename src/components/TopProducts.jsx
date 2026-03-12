import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/thunks/fetchProducts';

import Container from './Container';
import Card from './Card';

function TopProducts() {
  const dispatch = useDispatch();

  const { isLoading, products, error } = useSelector((state) => state.products);
  // const isLoading = useSelector((state) => state.products.isLoading);
  // const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading products....</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className='mt-16'>
      <Container>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-12 mb-4'>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-gray-900'>
              Top Products
            </h2>
            <p className='mt-2 text-gray-500 text-sm md:text-base'>
              Discover our most popular products this season.
            </p>
          </div>
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TopProducts;
