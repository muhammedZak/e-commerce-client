import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  fetchCatelog,
  createCategory,
  createSport,
  createSubCategory,
  updateCategory,
  deleteCategory,
} from '@/store/thunks/catalogSlice';
import SelectField from '@/components/form/SelectField';
import { useEffect, useState } from 'react';
import FormCard from '@/components/form/FormCard';
import CatalogList from '@/components/admin/CatalogList';

function CategoryPage() {
  const [editingCategory, setEditingCategory] = useState(null);
  const { sports, categories, subCategories, isLoading } = useSelector(
    (state) => state.catalog,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatelog());
  }, [dispatch]);

  const sportsOptions = sports.map((sport) => ({
    label: sport.name,
    value: sport._id,
  }));

  //   const categoryOptions = categories.map((category) => ({
  //     label: category.name,
  //     value: category._id,
  //   }));

  // =========================
  // 🟢 FORMS
  // =========================

  const sportForm = useForm({ defaultValues: { name: '' } });

  const categoryForm = useForm({
    defaultValues: { name: '', sport: '' },
  });

  const subCategoryForm = useForm({
    defaultValues: { name: '', sport: '', category: '' },
  });

  const selectedSport = subCategoryForm.watch('sport');

  const filteredCategories = categories
    .filter((c) => c.sport === selectedSport)
    .map((c) => ({ label: c.name, value: c._id }));

  // =========================
  // 🚀 HANDLERS
  // =========================

  const handleCreateSport = (data) => {
    dispatch(createSport(data))
      .unwrap()
      .then(() => {
        toast.success('Sport created');
        sportForm.reset();
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleCreateCategory = (data) => {
    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory._id, data }))
        .unwrap()
        .then(() => {
          toast.success('Category updated');
          categoryForm.reset();
          setEditingCategory(null);
        })
        .catch((err) => toast.error(err?.message));
    } else {
      dispatch(createCategory(data))
        .unwrap()
        .then(() => {
          toast.success('Category created');
          categoryForm.reset();
        })
        .catch((err) => toast.error(err?.message));
    }
  };

  const handleCreateSubCategory = (data) => {
    dispatch(createSubCategory(data))
      .unwrap()
      .then(() => {
        toast.success('SubCategory created');
        subCategoryForm.reset();
      })
      .catch((err) => toast.error(err?.message));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);

    categoryForm.setValue('name', category.name);
    categoryForm.setValue('sport', category.sport);
  };

  const handleDeleteCategory = (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => toast.success('Category deleted'))
      .catch((err) => toast.error(err?.message));
  };

  return (
    <div className='p-6 space-y-6'>
      {/* ================= HEADER ================= */}
      <div>
        <h1 className='text-2xl font-bold'>Catalog Management</h1>
        <p className='text-gray-500'>
          Manage sports, categories, and subcategories
        </p>
      </div>

      {/* ================= SPORTS ================= */}

      <FormCard title='Sports' contentClassName='space-y-4'>
        <form
          onSubmit={sportForm.handleSubmit(handleCreateSport)}
          className='flex gap-4'>
          <Input
            placeholder='Enter sport name'
            {...sportForm.register('name')}
          />
          <Button className='w-40 ms-auto' type='submit' disabled={isLoading}>
            Add
          </Button>
        </form>
        <CatalogList lists={sports} />
      </FormCard>

      {/* ================= CATEGORY ================= */}

      <FormCard title='Categories' contentClassName='space-y-4'>
        <form
          onSubmit={categoryForm.handleSubmit(handleCreateCategory)}
          className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
          <SelectField
            name='sport'
            control={categoryForm.control}
            label='Sport'
            options={sportsOptions}
            placeholder='Select sport'
          />

          <Input
            placeholder='Category name'
            {...categoryForm.register('name')}
          />

          <div className={editingCategory ? 'flex gap-2' : 'flex justify-end'}>
            <Button
              className='w-40 bg-blue-600'
              type='submit'
              disabled={isLoading}>
              {editingCategory ? 'Update' : 'Add'}
            </Button>
            {editingCategory && (
              <Button
                className='w-40 '
                type='button'
                variant='outline'
                onClick={() => {
                  setEditingCategory(null);
                  categoryForm.reset();
                }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
        <CatalogList
          lists={categories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
        />
      </FormCard>

      {/* ================= SUBCATEGORY ================= */}

      <FormCard title='Subcategories' contentClassName='space-y-4'>
        <form
          onSubmit={subCategoryForm.handleSubmit(handleCreateSubCategory)}
          className='grid grid-cols-1 md:grid-cols-4 gap-4 items-end'>
          <SelectField
            name='sport'
            control={subCategoryForm.control}
            label='Sports'
            options={sportsOptions}
            placeholder='Select sport'
          />
          <SelectField
            name='category'
            control={subCategoryForm.control}
            label='Category'
            options={filteredCategories}
            placeholder='Select category'
          />

          <Input
            placeholder='Subcategory name'
            {...subCategoryForm.register('name')}
          />

          <Button className='w-40 ms-auto' type='submit' disabled={isLoading}>
            Add
          </Button>
        </form>

        <CatalogList lists={subCategories} />
      </FormCard>
    </div>
  );
}

export default CategoryPage;
