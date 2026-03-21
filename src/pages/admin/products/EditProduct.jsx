import React from 'react';
import ProductForm from './ProductForm';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id: productId } = useParams();

  return (
    <div>
      <h1>Edit Product</h1>
      <ProductForm />
    </div>
  );
};

export default EditProduct;
