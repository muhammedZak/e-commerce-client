import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FieldDescription, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormField from '@/components/form/FormField';
import SelectField from '@/components/form/SelectField';
import CheckBoxField from '../../../components/form/CheckBoxField';
import { createProduct } from '@/store/thunks/fetchProducts';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useEffect } from 'react';
import LoaderOverlay from '@/components/LoaderOverlay';
import FormCard from '@/components/form/FormCard';
import { fetchCatelog } from '@/store/thunks/catalogSlice';

const formSchema = z.object({
  name: z
    .string()
    .min(5, 'Product name must be at least 5 characters.')
    .max(32, 'Product name must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(100, 'Description must be at most 100 characters'),
  brand: z.string().min(2, 'Brand must be at least 2 characters'),
  sport: z.string().min(1, 'Please select a sport'),
  category: z.string().min(1, 'Please select a category'),
  subCategory: z.string().min(1, 'Please select a subcategory'),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  picture: z.instanceof(File, { message: 'Image is required' }),
});

function CreateProduct() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      sport: '',
      category: '',
      subCategory: '',
      isActive: false,
      isFeatured: false,
      picture: null,
    },
  });

  const { isLoading, error } = useSelector((state) => state.products);
  const { sports, categories, subcategories } = useSelector(
    (state) => state.catalog,
  );

  const sportsOptions = sports.map((s) => ({
    label: s.name,
    value: s._id,
  }));

  const selectedSport = form.watch('sport');

  const filteredCategories = categories.filter(
    (c) => c.sport === selectedSport,
  );

  const categoryOptions = filteredCategories.map((fc) => ({
    label: fc.name,
    value: fc._id,
  }));

  const selectedCategory = form.watch('category');

  const filteredSubCategories = subcategories.filter(
    (sc) => sc.category === selectedCategory,
  );

  const subcategoryOptions = filteredSubCategories.map((sc) => ({
    label: sc.name,
    value: sc._id,
  }));

  useEffect(() => {
    if (error) {
      toast.error('Something went wrong.');
    }
  }, [error]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatelog());
  }, [dispatch]);

  const handleformSubmit = (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === 'picture') {
        formData.append('picture', value);
      } else {
        formData.append(key, value);
      }
    }
    // if (key === 'images') {
    //   value.forEach((file) => formData.append('images', file));
    // }

    dispatch(createProduct(formData))
      .unwrap()
      .then(() => {
        toast.success('Product created successfully');
        form.reset();
      })
      .catch((err) => {
        console.log(err?.response?.data || err.message);
      });
  };

  if (isLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <div className='flex items-center justify-between '>
        <div>
          <h1 className='text-2xl font-bold  text-gray-800'>Products</h1>
          <p>Enter product details to add to the inventory</p>
        </div>
        <div>
          <Button
            type='submit'
            form='product-create-form'
            size='lg'
            className='mb-6 mr-5 px-5 bg-blue-600 cursor-pointer'>
            <span>Save</span>
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='mb-6 px-5 cursor-pointer'
            onClick={() => form.reset()}>
            <span>Cancel</span>
          </Button>
        </div>
      </div>
      <form
        noValidate
        id='product-create-form'
        onSubmit={form.handleSubmit(handleformSubmit)}
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
            <FormField
              name='brand'
              control={form.control}
              label='Product brand'>
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
              disabled={!selectedSport}
              name='category'
              control={form.control}
              label='Category'
              options={categoryOptions}
              placeholder='Select a category'
            />
            <SelectField
              disabled={!selectedCategory}
              name='subCategory'
              control={form.control}
              label='Sub Category'
              options={subcategoryOptions}
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
                  <FieldDescription>
                    Select a picture to upload.
                  </FieldDescription>
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
    </div>
  );
}

export default CreateProduct;
