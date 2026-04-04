import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteVariant,
  fetchVariants,
  updateVariant,
} from '@/store/thunks/variantThunk';

import { useVariantForm } from '@/customHooks/useVariantForm';

import VariantForm from '@/components/admin/variant/VariantForm';
import FormModal from '@/components/FormModal';
import CustomTableHead from '@/components/admin/CustomTableHead';
import CustomTableBody from '@/components/admin/CustomTableBody';

import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import AlertModal from '@/components/admin/AlertModal';
import { da } from 'zod/locales';

const columns = [
  { key: 'name', label: 'Product Name' },
  { key: 'color', label: 'Color' },
  { key: 'size', label: 'Size' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'actions', label: 'Actions' },
];

const variantColumns = [
  { key: 'name' },
  { key: 'color' },
  { key: 'size' },
  { key: 'price' },

  {
    key: 'stock',
    render: (item) => (
      <span className={item.stock > 10 ? 'text-green-600' : 'text-red-500'}>
        {item.stock > 0 ? item.stock : 'Out of stock'}
      </span>
    ),
  },
];

const getVariantActions = ({ openAlert, onEdit }) => {
  return (variant) => (
    <>
      <Button
        className='cursor-pointer'
        variant='link'
        onClick={() => onEdit(variant)}>
        <Pencil />
      </Button>

      <Button
        variant='link'
        className='ml-2 cursor-pointer'
        onClick={() => openAlert(variant._id)}>
        <Trash2 />
      </Button>
    </>
  );
};

function Variants() {
  const [isOpen, setIsOpen] = useState(false);
  const [variantId, setVariantId] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, variants, error, totalPages, currentPage } = useSelector(
    (state) => state.variants,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVariants(id));
  }, [dispatch, id]);

  const loadingContent = (
    <div className='h-screen flex items-center justify-center'>
      <Spinner className='size-16' />
    </div>
  );

  const errorMessage = <div>Error....</div>;

  const { form, resetForm } = useVariantForm();

  function onEdit(item) {
    setVariantId(item._id);
    setIsOpen(true);
    resetForm({
      ...item,
      productId: item.productId._id,
      images: [],
    });
  }

  const onDelete = async () => {
    try {
      await dispatch(deleteVariant(variantId)).unwrap();
      toast.success('Variant deleted successfully');
      setVariantId(null);
    } catch (err) {
      toast.error(err || 'Something went wrong!');
    }
  };

  const openAlert = (id) => {
    setIsAlertOpen(true);
    setVariantId(id);
  };

  const actions = getVariantActions({ onEdit, openAlert });

  const closeModal = () => {
    resetForm();
    setVariantId(null);
    setIsOpen(false);
  };

  const handleModalChange = (val) => {
    if (!val) closeModal();
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('price', data.price);
      formData.append('productId', data.productId);
      formData.append('color', data.color || '');
      formData.append('size', data.size || '');
      formData.append('stock', data.stock || 0);
      formData.append('isAvailable', data.isAvailable);

      data.images?.forEach((file) => {
        formData.append('images', file);
      });

      await dispatch(updateVariant({ id: variantId, data: formData })).unwrap();
      toast.success('Variant updated successfully');
      closeModal();
    } catch (err) {
      toast.error(err || 'Something went wrong!');
    }
  };

  const onAlertChange = (open) => {
    setIsAlertOpen(open);
    if (!open) setVariantId(null);
  };

  return (
    <>
      <FormModal open={isOpen} onOpenChange={handleModalChange}>
        <VariantForm form={form} onSubmit={onSubmit} title='Edit' />
      </FormModal>
      <AlertModal
        open={isAlertOpen}
        onOpenChange={onAlertChange}
        onSubmit={onDelete}
      />
      <div className='bg-white p-6 rounded-xl shadow-sm border'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold mb-6 text-gray-800'>Variants</h1>
          <Button
            onClick={() => navigate(-1)}
            variant='outline'
            className='mb-6 p-5 text-xl hover:bg-gray-200  cursor-pointer'>
            <span>Back</span>
          </Button>
        </div>

        <div className='rounded-lg border overflow-hidden'>
          {isLoading ? (
            loadingContent
          ) : error ? (
            errorMessage
          ) : (
            <Table className='w-full'>
              <CustomTableHead columns={columns} />
              <CustomTableBody
                data={variants}
                columns={variantColumns}
                actions={actions}
              />
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default Variants;
