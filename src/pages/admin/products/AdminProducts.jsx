import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteProduct,
  fetchProducts,
} from '../../../store/thunks/fetchProducts';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FormModal from '@/components/FormModal';
import { useVariantForm } from '@/customHooks/useVariantForm';
import VariantForm from '@/components/admin/variant/VariantForm';
import CustomTableHead from '@/components/admin/CustomTableHead';
import { createVariant } from '@/store/thunks/variantThunk';
import CustomTableBody from '@/components/admin/CustomTableBody';
import AlertModal from '@/components/admin/AlertModal';

const columns = [
  { key: 'name', label: 'Product Name' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'sport', label: 'Sport' },
  { key: 'rating', label: 'Ratings' },
  { key: 'actions', label: 'Actions' },
];

const productColumns = [
  { key: 'name' },

  {
    key: 'minPrice',
    render: (item) => `₹${item.minPrice}`,
  },

  {
    key: 'stock',
    render: (item) => (
      <span className={item.stock > 10 ? 'text-green-600' : 'text-red-500'}>
        {item.stock > 0 ? item.stock : 'Out of stock'}
      </span>
    ),
  },

  {
    key: 'sport',
    render: (item) => item.sport?.name,
    className: 'text-gray-700',
  },

  {
    key: 'rating',
    render: (item) => `⭐ ${item.rating}`,
    className: 'text-yellow-500',
  },
];

const getProductActions = ({ openAlert, onAddVariant }) => {
  return (product) => (
    <>
      <Link to={`/admin/products/${product._id}/edit`}>
        <Button variant='link'>
          <Pencil />
        </Button>
      </Link>

      <Button onClick={() => openAlert(product._id)} variant='link'>
        <Trash2 />
      </Button>

      <Button
        onClick={() => onAddVariant({ productId: product._id })}
        variant='outline'
        className='ml-2 hover:bg-blue-600 hover:text-white'>
        <Plus />
        <span>Add variant</span>
      </Button>

      <Link to={`/admin/products/${product._id}/variants`}>
        <span className='ml-2 hover:text-blue-600'>View variants</span>
      </Link>
    </>
  );
};

function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [productId, setProductId] = useState(null);

  const navigate = useNavigate();

  const { isLoading, products, error, totalPages, currentPage } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const { form, resetForm } = useVariantForm();

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
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('productId', data.productId);
      formData.append('color', data.color || '');
      formData.append('size', data.size || '');

      data.images.forEach((file) => {
        formData.append('images', file);
      });

      const res = await dispatch(createVariant(formData)).unwrap();
      toast.success('Variant created successfully');
      closeModal();

      navigate(`/admin/products/${res.productId}/variants`);
    } catch (err) {
      toast.error(err || 'Something went wrong!');
    }
  };

  function onAddVariant(item) {
    setIsModalOpen(true);
    if (item) resetForm(item);
  }

  const onDelete = async () => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      toast.success('Product deleted successfully✅');
      setIsAlertOpen(false);
    } catch (err) {
      toast.error(err || 'Something went wrong!🤦‍♂️');
    }
  };

  const openAlert = (id) => {
    setProductId(id);
    setIsAlertOpen(true);
  };

  const actions = getProductActions({ openAlert, onAddVariant });

  const handleModalChange = (val) => {
    if (!val) closeModal();
  };

  const onAlertChange = (open) => {
    setIsAlertOpen(open);
    setProductId(null);
  };

  return (
    <>
      <FormModal open={isModalOpen} onOpenChange={handleModalChange}>
        <VariantForm form={form} onSubmit={onSubmit} />
      </FormModal>
      <AlertModal
        open={isAlertOpen}
        onOpenChange={onAlertChange}
        onSubmit={onDelete}
      />
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
            <CustomTableBody
              data={products}
              columns={productColumns}
              actions={actions}
            />
          </Table>
        </div>
      </div>
    </>
  );
}

export default AdminProducts;
