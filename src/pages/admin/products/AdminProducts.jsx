import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/thunks/fetchProducts';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FormModal from '@/components/FormModal';
import { useVariantForm } from '@/customHooks/useVariantForm';
import VariantForm from '@/components/admin/variant/VariantForm';
import CustomTableHead from '@/components/admin/CustomTableHead';
import ProductTableBody from '@/components/admin/ProductTableBody';
import { createVariant } from '@/store/thunks/variantThunk';

const columns = [
  { key: 'name', label: 'Product Name' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'sport', label: 'Sport' },
  { key: 'rating', label: 'Ratings' },
  { key: 'actions', label: 'Actions' },
  { key: 'defualt', label: '' },
];

function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const { isLoading, products, error, totalPages, currentPage } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const { form, resetForm } = useVariantForm();

  // const handlePageChange = (page) => {
  //   dispatch(productsActions.setPage(page));
  // };

  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Spinner className='size-16' />
      </div>
    );
  }

  if (error) {
    return <div>Error....</div>;
  }

  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(createVariant(data)).unwrap();
      toast.success('Variant created successfully');
      closeModal();

      navigate(`/admin/products/${res.productId}/variants`);
    } catch (err) {
      toast.error(err || 'Something went wrong!');
    }
  };

  const modalOpen = (item = null) => {
    setIsModalOpen(true);
    if (item) {
      resetForm(item);
    }
  };

  const handleModalChange = (val) => {
    if (!val) closeModal();
  };

  /* 
  todos
  --------
  1. modify create submit handler with async ✅
  2. navigate to variants list page after succussfull variant creation ✅
  3. edit variant 
  4. delete variant
  5. file upload on variant form
  */

  return (
    <>
      <FormModal open={isModalOpen} onOpenChange={handleModalChange}>
        <VariantForm form={form} onSubmit={onSubmit} />
      </FormModal>
      <div className='bg-white p-6 rounded-xl shadow-sm border'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold mb-6 text-gray-800'>Products</h1>
          <Link to='/admin/products/create'>
            <Button size='lg' className='mb-6 bg-blue-600 cursor-pointer'>
              <Plus />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
        <div className='rounded-lg border overflow-hidden'>
          <Table>
            <CustomTableHead columns={columns} />
            <ProductTableBody
              products={products}
              onDelete={(id) => console.log('delete', id)}
              onAddVariant={(data) => modalOpen(data)}
            />
          </Table>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
