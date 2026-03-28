import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Search, Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import SelectField from '@/components/form/SelectField';
import FormField from '@/components/form/FormField';

import AlertModal from '@/components/admin/AlertModal';
import CatelogFormModal from '@/components/admin/CatelogFormModal';

import { fetchCatelog } from '@/store/thunks/catalogSlice';
import CatalogCard from '@/components/admin/catalog/CatalogCard';

import { useCatalogActions } from '@/customHooks/useCatalogActions';
import { useCatalogForm } from '@/customHooks/useCatalogForm';

function CategoryPage() {
  const dispatch = useDispatch();

  const { sports, categories, subcategories, isLoading } = useSelector(
    (state) => state.catalog,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  useEffect(() => {
    dispatch(fetchCatelog());
  }, [dispatch]);

  const { form, resetForm } = useCatalogForm(modalType);

  const { handleSubmit, handleDelete } = useCatalogActions({
    form,
    setIsOpen,
    setEditingItem,
  });

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsOpen(true);

    if (item) {
      resetForm(item);
    } else {
      resetForm();
    }
  };

  const openAlert = (type, id) => {
    setModalType(type);
    setEditingItem(id);
    setIsAlertOpen(true);
  };

  const onAlertChange = () => {
    setIsAlertOpen(!isAlertOpen);
    setEditingItem(null);
    setModalType(null);
  };

  const filteredCategories = categories.filter(
    (c) => c.sport === selectedOption,
  );

  const filteredSubcategories = subcategories.filter(
    (c) => c.category === selectedCategory,
  );

  const onSubmit = (data) => {
    handleSubmit(modalType, data, editingItem);
  };

  const onDelete = () => {
    handleDelete(modalType, editingItem);
  };

  const catelog = ['sports', 'categories', 'subcategories'];

  return (
    <>
      <CatelogFormModal
        open={isOpen}
        setOpen={setIsOpen}
        title={modalType}
        form={form}
        onSubmit={onSubmit}
        editingItem={editingItem}
        setEditingItem={setEditingItem}
        setModalType={setModalType}>
        <FormField name='name' control={form.control} label='Name'>
          {(field, state) => (
            <Input
              {...field}
              value={field.value || ''}
              aria-invalid={state.invalid}
              placeholder='Enter name'
            />
          )}
        </FormField>

        {modalType === 'category' && (
          <SelectField
            name='sport'
            control={form.control}
            label='Sport'
            placeholder='Select sport'
            options={sports.map((s) => ({
              label: s.name,
              value: s._id,
            }))}
          />
        )}

        {modalType === 'subcategory' && (
          <SelectField
            name='category'
            control={form.control}
            label='Category'
            placeholder='Select category'
            options={categories.map((c) => ({
              label: c.name,
              value: c._id,
            }))}
          />
        )}
        <DialogFooter>
          <Button type='submit'>{editingItem ? 'Update' : 'Create'}</Button>
        </DialogFooter>
      </CatelogFormModal>
      <AlertModal
        open={isAlertOpen}
        onOpenChange={onAlertChange}
        onSubmit={onDelete}
      />
      <div className='p-6 space-y-6'>
        <div className='flex justify-between bg-gray-200 p-6 rounded-md text-gray-900 shadow-md'>
          <h1 className='text-2xl'>Catalog Management</h1>
          <div className='flex gap-2'>
            <InputGroup className='max-w-xs border-gray-500'>
              <InputGroupInput placeholder='Search...' />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
            <Button className='w-32 text-gray-100 bg-blue-700 text-md'>
              <Plus /> Add
            </Button>
          </div>
        </div>
        <section className='p-6 bg-gray-200 rounded-md shadow-sm'>
          <Tabs defaultValue='sports'>
            <TabsList className='py-6'>
              {catelog.map((c) => (
                <TabsTrigger key={c} className='py-4' value={c}>
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value='sports'>
              <CatalogCard
                openModal={openModal}
                lists={sports}
                type='sport'
                openAlert={openAlert}
              />
            </TabsContent>
            <TabsContent value='categories'>
              <CatalogCard
                openModal={openModal}
                lists={filteredCategories}
                type='category'
                openAlert={openAlert}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                selectConfig={{
                  label: 'Sports',
                  placeholder: 'Select a sport',
                  options: sports,
                }}
              />
            </TabsContent>
            <TabsContent value='subcategories'>
              <CatalogCard
                openModal={openModal}
                lists={filteredSubcategories}
                type='subcategory'
                openAlert={openAlert}
                selectedOption={selectedCategory}
                setSelectedOption={setSelectedCategory}
                selectConfig={{
                  label: 'Category',
                  placeholder: 'Select a category',
                  options: categories,
                }}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
}

export default CategoryPage;
