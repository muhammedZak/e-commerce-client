import LoaderOverlay from '@/components/LoaderOverlay';
import ProductForm from './ProductForm';
import { fetchCatelog } from '@/store/thunks/catalogSlice';
import { fetchSingleProducts } from '@/store/thunks/fetchProducts';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useProductForm } from '@/customHooks/useProductForm';

function ProductFormContainer({ onFormReady }) {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { product, isLoading } = useSelector((s) => s.products);
  const { sports, categories, subcategories } = useSelector((s) => s.catalog);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatelog());

    if (isEdit) {
      dispatch(fetchSingleProducts(id));
    }
  }, [id]);

  const form = useProductForm();
  const { reset } = form;

  useEffect(() => {
    onFormReady?.({
      resetForm: () => reset(),
      isEdit,
    });
  }, [isEdit]);

  if (isLoading) return <LoaderOverlay />;

  const initialValues =
    isEdit && product
      ? {
          name: product.name,
          description: product.description,
          brand: product.brand,
          sport: product?.sport?._id || '',
          category: product?.category?._id || '',
          subCategory: product?.subCategory?._id || '',
          isActive: product.isActive ?? false,
          isFeatured: product.isFeatured ?? false,
          picture: null,
        }
      : null;

  return (
    <ProductForm
      isEdit={isEdit}
      initialValues={initialValues}
      sports={sports}
      categories={categories}
      subcategories={subcategories}
    />
  );
}

export default ProductFormContainer;
