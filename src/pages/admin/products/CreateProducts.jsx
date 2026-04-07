import { Button } from '@/components/ui/button';
import ProductFormContainer from '@/components/admin/product/productFormContainer';
import { useState } from 'react';

function CreateProduct() {
  const [formActions, setFormActions] = useState({
    resetForm: () => {},
    isEdit: false,
  });
  return (
    <div>
      <div className='flex items-center justify-between '>
        <div>
          <h1 className='text-2xl font-bold  text-gray-800'>Products</h1>
          <p>
            Enter product details to
            {formActions.isEdit ? ' update' : ' add to the inventory'}{' '}
          </p>
        </div>
        <div>
          <Button
            type='submit'
            form='product-create-form'
            size='lg'
            className='mb-6 mr-5 px-5 bg-blue-600 cursor-pointer'>
            <span>{formActions.isEdit ? 'Update' : 'Submit'}</span>
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='mb-6 px-5 cursor-pointer'
            onClick={formActions.resetForm}>
            Cancel
          </Button>
        </div>
      </div>
      <ProductFormContainer onFormReady={setFormActions} />
    </div>
  );
}

export default CreateProduct;
