import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProducts } from '../store/thunks/fetchProducts';
import Breadcrump from '../components/Breadcrump';

function ProductDetailsPage() {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchSingleProducts(productId));
  }, [productId]);

  return (
    <section>
      <Breadcrump />
    </section>
  );
}

export default ProductDetailsPage;
