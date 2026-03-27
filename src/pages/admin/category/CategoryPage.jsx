import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Pencil, Search } from 'lucide-react';
import { Plus } from 'lucide-react';
import {
  fetchCatelog,
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
import SelectField from '@/components/form/SelectField';
import { useEffect, useState } from 'react';
import FormCard from '@/components/form/FormCard';
import CatalogList from '@/components/admin/CatalogList';
import CategoryFormButtons from '@/components/admin/CategoryFormButtons';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Item, ItemActions, ItemGroup, ItemTitle } from '@/components/ui/item';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CatelogFormModal from '@/components/admin/CatelogFormModal';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FieldGroup } from '@/components/ui/field';
import FormField from '@/components/form/FormField';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AlertModal from '@/components/admin/AlertModal';

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

  const getSchema = (type) => {
    switch (type) {
      case 'sport':
        return z.object({
          name: z
            .string()
            .trim()
            .nonempty('Sport required')
            .min(3, 'Use an invalid name'),
        });

      case 'category':
        return z.object({
          name: z.string().nonempty('Category required'),
          sport: z.string().nonempty('Select sport'),
        });

      case 'subcategory':
        return z.object({
          name: z.string().nonempty('Subcategory required'),
          category: z.string().nonempty('Select category'),
        });

      default:
        return z.object({});
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema(modalType)),
    defaultValues: {
      name: '',
      sport: undefined,
      category: undefined,
    },
  });

  useEffect(() => {
    dispatch(fetchCatelog());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (modalType === 'sport') {
      if (editingItem) {
        dispatch(updateSport({ id: editingItem._id, data }))
          .unwrap()
          .then(() => {
            toast.success('Sport updated');
            form.reset({ name: '', sport: '', category: '' });
            setEditingItem(null);
            setIsOpen(false);
          })
          .catch((err) => toast.error(err || 'Somthing went wrong!'));
      } else {
        dispatch(createSport(data))
          .unwrap()
          .then(() => {
            toast.success('Sport Created');
            form.reset({ name: '', sport: '', category: '' });
            setIsOpen(false);
          })
          .catch((err) => toast.error(err || 'Somthing went wrong!'));
      }
    }

    if (modalType === 'category') {
      if (editingItem) {
        dispatch(updateCategory({ id: editingItem._id, data }))
          .unwrap()
          .then(() => {
            toast.success('Category updated');
            form.reset({ name: '', sport: '', category: '' });
            setIsOpen(false);
          })
          .catch((err) => toast.error(err || 'Somthing went wrong!'));
      } else {
        dispatch(createCategory(data))
          .unwrap()
          .then(() => {
            toast.success('Category Created');
            form.reset({ name: '', sport: '', category: '' });
            setIsOpen(false);
          })
          .catch((err) => toast.error(err || 'Somthing went wrong!'));
      }
    }

    if (modalType === 'subcategory') {
      if (editingItem) {
        dispatch(updateSubcategory({ id: editingItem._id, data }))
          .unwrap()
          .then(() => {
            toast.success('Subcategory updated');
            form.reset({ name: '', sport: '', category: '' });
            setIsOpen(false);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err || 'Somthing went wrong!');
          });
      } else {
        dispatch(createSubCategory(data))
          .unwrap()
          .then(() => {
            toast.success('Subcategory Created');
            form.reset({ name: '', sport: '', category: '' });
            setIsOpen(false);
          })
          .catch((err) => toast.error(err || 'Somthing went wrong!'));
      }
    }
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setIsOpen(true);

    if (item) {
      form.reset({
        name: item.name || '',
        sport: item.sport || '',
        category: item.category || '',
      });
    } else {
      form.reset({
        name: '',
        sport: undefined,
        category: undefined,
      });
    }
  };

  console.log(modalType);

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

  const onDelete = () => {
    if (modalType === 'sport') {
      dispatch(deleteSport(editingItem))
        .unwrap()
        .then(() => toast.success('Sport deleted'))
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
    if (modalType === 'category') {
      dispatch(deleteCategory(editingItem))
        .unwrap()
        .then(() => toast.success('Category deleted'))
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
    if (modalType === 'subcategory') {
      dispatch(deleteSubcategory(editingItem))
        .unwrap()
        .then(() => toast.success('Subcategory deleted'))
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
  };

  const catelog = ['sports', 'categories', 'subcategories'];

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(val) => {
          setIsOpen(val);
          if (!val) {
            form.reset({ name: '', sport: undefined, category: undefined });
            setEditingItem(null);
            setModalType(null);
          }
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit' : 'Add'} {modalType}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
          </form>
        </DialogContent>
      </Dialog>
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
              <Card>
                <CardHeader className='my-3'>
                  <CardAction>
                    <Button
                      onClick={() => openModal('sport')}
                      variant='outline'
                      className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                      <Plus />
                      Add
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ItemGroup className=''>
                    {sports.map((s) => (
                      <Item
                        key={s._id}
                        variant='outline'
                        className='w-full flex justify-between'>
                        <ItemTitle>{s.name}</ItemTitle>
                        <ItemActions>
                          <Button
                            onClick={() => openModal('sport', s)}
                            className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                            <Pencil /> Edit
                          </Button>
                          <Button
                            onClick={() => openAlert('sport', s._id)}
                            variant='destructive'
                            className='w-32 cursor-pointer'>
                            Delete
                          </Button>
                        </ItemActions>
                      </Item>
                    ))}
                  </ItemGroup>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='categories'>
              <Card>
                <CardHeader className='my-6'>
                  <CardTitle>
                    <Select
                      value={selectedOption || ''}
                      onValueChange={setSelectedOption}>
                      <SelectTrigger className='w-full max-w-9/12'>
                        <SelectValue placeholder='Select a sport' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        <SelectGroup>
                          <SelectLabel>Sports</SelectLabel>
                          {sports.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardAction>
                    <Button
                      onClick={() => openModal('category')}
                      variant='outline'
                      className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                      <Plus />
                      Add
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ItemGroup className=''>
                    {filteredCategories.map((s) => (
                      <Item
                        key={s._id}
                        variant='outline'
                        className='w-full flex justify-between'>
                        <ItemTitle>{s.name}</ItemTitle>
                        <ItemActions>
                          <Button
                            onClick={() => openModal('category', s)}
                            className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                            <Pencil /> Edit
                          </Button>
                          <Button
                            onClick={() => openAlert('category', s._id)}
                            variant='destructive'
                            className='w-32 cursor-pointer'>
                            Delete
                          </Button>
                        </ItemActions>
                      </Item>
                    ))}
                  </ItemGroup>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='subcategories'>
              <Card>
                <CardHeader className='my-6'>
                  <CardTitle>
                    <Select
                      value={selectedCategory || ''}
                      onValueChange={setSelectedCategory}>
                      <SelectTrigger className='w-full max-w-9/12'>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                      <SelectContent position='popper'>
                        <SelectGroup>
                          <SelectLabel>Category</SelectLabel>
                          {categories.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </CardTitle>
                  <CardAction>
                    <Button
                      onClick={() => openModal('subcategory')}
                      variant='outline'
                      className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                      <Plus />
                      Add
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <ItemGroup className='flex-row flex-wrap'>
                    {filteredSubcategories.map((s) => (
                      <Item
                        key={s._id}
                        variant='outline'
                        className='w-full flex justify-between'>
                        <ItemTitle>{s.name}</ItemTitle>
                        <ItemActions>
                          <Button
                            onClick={() => openModal('subcategory', s)}
                            className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                            <Pencil /> Edit
                          </Button>
                          <Button
                            onClick={() => openAlert('subcategory', s._id)}
                            variant='destructive'
                            className='w-32 cursor-pointer'>
                            Delete
                          </Button>
                        </ItemActions>
                      </Item>
                    ))}
                  </ItemGroup>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </>
  );
}

export default CategoryPage;

// card
// item for lists
// Button for action
// dialog box for edit
// alert box for deleting
