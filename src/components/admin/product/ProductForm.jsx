import CheckBoxField from '@/components/form/CheckBoxField';
import FormCard from '@/components/form/FormCard';
import FormField from '@/components/form/FormField';
import SelectField from '@/components/form/SelectField';
import { FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProductForm } from '@/customHooks/useProductForm';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function ProductForm({
  isEdit,
  initialValues,
  sports,
  categories,
  subcategories,
}) {
  const form = useProductForm(isEdit);

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues]);

  const selectedSport = form.watch('sport');
  const selectedCategory = form.watch('category');

  const sportsOptions = sports.map((s) => ({
    label: s.name,
    value: s._id,
  }));

  const categoryOptions = categories
    .filter((c) => c.sport === selectedSport)
    .map((c) => ({
      label: c.name,
      value: c._id,
    }));

  const subcategoryOptions = subcategories
    .filter((sc) => sc.category === selectedCategory)
    .map((sc) => ({
      label: sc.name,
      value: sc._id,
    }));

  useEffect(() => {
    form.setValue('category', '');
    form.setValue('subCategory', '');
  }, [selectedSport]);

  useEffect(() => {
    form.setValue('subCategory', '');
  }, [selectedCategory]);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    dispatch(createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success(isEdit ? 'Updated' : 'Created');
        form.reset();
      });
  };

  return (
    <form
      noValidate
      id='product-create-form'
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-6'>
      <FormCard
        title='Product Information'
        className='bg-white p-6 mt-6 rounded-xl shadow-sm border'>
        <FieldGroup className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <FormField name='name' control={form.control} label='Product Name'>
            {(field, state) => (
              <Input
                {...field}
                aria-invalid={state.invalid}
                placeholder='Type your product name'
              />
            )}
          </FormField>
          <FormField name='brand' control={form.control} label='Product brand'>
            {(field, state) => (
              <Input
                {...field}
                aria-invalid={state.invalid}
                placeholder='Type your brand name'
              />
            )}
          </FormField>
          <FormField
            name='description'
            control={form.control}
            label='Product Description'>
            {(field, state) => (
              <Textarea
                aria-invalid={state.invalid}
                {...field}
                placeholder='Type your product description'
                autoComplete='off'
              />
            )}
          </FormField>
        </FieldGroup>
      </FormCard>
      <FormCard
        title='Categorization & Details'
        className='bg-white p-6 mt-6 rounded-xl shadow-sm border'>
        <FieldGroup className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <SelectField
            name='sport'
            control={form.control}
            label='Sport'
            options={sportsOptions}
            placeholder='Select a sport'
          />
          <SelectField
            name='category'
            control={form.control}
            options={categoryOptions}
            disabled={!selectedSport}
            label='Category'
            placeholder='Select a category'
          />
          <SelectField
            name='subCategory'
            control={form.control}
            options={subcategoryOptions}
            disabled={!selectedCategory}
            label='Sub Category'
            placeholder='Select a subcategory'
          />
        </FieldGroup>
      </FormCard>
      <FormCard
        title='Visuals & Status'
        contentClassName='grid grid-cols-1 md:grid-cols-3 gap-12'
        className='bg-white p-6 mt-6 rounded-xl shadow-sm border'>
        <FieldGroup>
          <FormField name='picture' control={form.control} label='Picture'>
            {(field, state) => (
              <>
                <Input
                  id={field.name}
                  type='file'
                  aria-invalid={state.invalid}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                  }}
                />
                <FieldDescription>Select a picture to upload.</FieldDescription>
              </>
            )}
          </FormField>
        </FieldGroup>
        <FieldGroup data-slot='checkbox-group' className='mx-auto w-56'>
          <CheckBoxField
            name='isFeatured'
            control={form.control}
            label='Is featured?'
          />
          <CheckBoxField
            name='isActive'
            control={form.control}
            label='Is Active?'
          />
        </FieldGroup>
      </FormCard>
    </form>
  );
}

export default ProductForm;
