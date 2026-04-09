import ProductFormContainer from '@/components/admin/product/productFormContainer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='flex items-center justify-between '>
        <div>
          <h1 className='text-2xl font-bold  text-gray-800'>Products</h1>
          <p>Enter product details</p>
        </div>
        <div className=''>
          <Button
            onClick={() => navigate(-1)}
            variant='outline'
            className='mb-6 p-5 my-auto text-xl hover:bg-gray-200  cursor-pointer'>
            <span>Back</span>
          </Button>
        </div>
      </div>
      <ProductFormContainer />
    </div>
  );
}

export default CreateProduct;
