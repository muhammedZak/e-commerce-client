import { toast } from 'sonner';
import { useDispatch } from 'react-redux';

import {
  createCategory,
  createSport,
  createSubCategory,
  updateCategory,
  deleteCategory,
  updateSport,
  deleteSport,
  updateSubcategory,
  deleteSubcategory,
} from '@/store/thunks/catalogSlice';

const useCatalogActions = ({ form, setIsOpen, setEditingItem }) => {
  const dispatch = useDispatch();

  const emptyForm = {
    name: '',
    sport: '',
    category: '',
  };

  const handleSuccess = (message) => {
    toast.success(message);
    form.reset(emptyForm);
    setEditingItem?.(null);
    setIsOpen(false);
  };

  const handleError = (err) => {
    toast.error(err || 'Something went wrong!');
  };

  const handleSubmit = async (modalType, data, editingItem) => {
    try {
      if (modalType === 'sport') {
        if (editingItem) {
          await dispatch(updateSport({ id: editingItem._id, data })).unwrap();
          handleSuccess('Sport updated');
        } else {
          await dispatch(createSport(data)).unwrap();
          handleSuccess('Sport created');
        }
      }

      if (modalType === 'category') {
        if (editingItem) {
          await dispatch(
            updateCategory({ id: editingItem._id, data }),
          ).unwrap();
          handleSuccess('Category updated');
        } else {
          await dispatch(createCategory(data)).unwrap();
          handleSuccess('Category created');
        }
      }

      if (modalType === 'subcategory') {
        if (editingItem) {
          await dispatch(
            updateSubcategory({ id: editingItem._id, data }),
          ).unwrap();
          handleSuccess('Subcategory updated');
        } else {
          await dispatch(createSubCategory(data)).unwrap();
          handleSuccess('Subcategory created');
        }
      }
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  const handleDelete = async (modalType, id) => {
    try {
      if (modalType === 'sport') {
        await dispatch(deleteSport(id)).unwrap();
        toast.success('Sport deleted');
      }

      if (modalType === 'category') {
        await dispatch(deleteCategory(id)).unwrap();
        toast.success('Category deleted');
      }

      if (modalType === 'subcategory') {
        await dispatch(deleteSubcategory(id)).unwrap();
        toast.success('Subcategory deleted');
      }
    } catch (err) {
      handleError(err);
    }
  };

  return {
    handleSubmit,
    handleDelete,
  };
};

export { useCatalogActions };
