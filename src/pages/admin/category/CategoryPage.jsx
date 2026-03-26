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

function CategoryPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { sports, categories, subcategories, isLoading } = useSelector(
    (state) => state.catalog,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatelog());
  }, [dispatch]);

  const filteredCategories = categories.filter(
    (c) => c.sport === selectedOption,
  );

  const filteredSubcategories = subcategories.filter(
    (c) => c.category === selectedCategory,
  );

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

  // const selectedSport = subCategoryForm.watch('sport');

  // =========================
  // 🚀 HANDLERS
  // =========================

  const handleCreateSport = (data) => {
    if (editingSport) {
      dispatch(updateSport({ id: editingSport._id, data }))
        .unwrap()
        .then(() => {
          toast.success('Sport updated');
          sportForm.reset();
          setEditingSport(null);
        })
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    } else {
      dispatch(createSport(data))
        .unwrap()
        .then(() => {
          toast.success('Sport created');
          sportForm.reset();
        })
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
  };

  const handleEditSport = (sport) => {
    setEditingSport(sport);

    sportForm.setValue('name', sport.name);
  };

  const handleDeleteSport = (id) => {
    if (!confirm('Are you sure you want to delete this sport?')) return;

    dispatch(deleteSport(id))
      .unwrap()
      .then(() => toast.success('Sport deleted'))
      .catch((err) => toast.error(err || 'Somthing went wrong!'));
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
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    } else {
      dispatch(createCategory(data))
        .unwrap()
        .then(() => {
          toast.success('Category created');
          categoryForm.reset();
        })
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
  };

  const handleCreateSubCategory = (data) => {
    if (editingSubcategory) {
      dispatch(updateSubcategory({ id: editingSubcategory._id, data }))
        .unwrap()
        .then(() => {
          toast.success('Sports updated');
          subCategoryForm.reset();
          setEditingSubategory(null);
        })
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    } else {
      dispatch(createSubCategory(data))
        .unwrap()
        .then(() => {
          toast.success('SubCategory created');
          subCategoryForm.reset();
        })
        .catch((err) => toast.error(err || 'Somthing went wrong!'));
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);

    categoryForm.setValue('name', category.name);
    // categoryForm.setValue('sport', category.sport);
  };

  const handleDeleteCategory = (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    dispatch(deleteCategory(id))
      .unwrap()
      .then(() => toast.success('Category deleted'))
      .catch((err) => toast.error(err || 'Somthing went wrong!'));
  };

  const handleEditSubcategory = (subcategory) => {
    setEditingSubategory(subcategory);

    // subCategoryForm.setValue('sport', subcategory.sport);
    subCategoryForm.setValue('name', subcategory.name);
    // subCategoryForm.setValue('category', subcategory.category);
  };

  const handleDeleteSubcategory = (id) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    dispatch(deleteSubcategory(id))
      .unwrap()
      .then(() => toast.success('Subcategory deleted'))
      .catch((err) => toast.error(err || 'Somthing went wrong!'));
  };

  const catelog = ['sports', 'categories', 'subcategories'];

  return (
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
                        <Button className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                          <Pencil /> Edit
                        </Button>
                        <Button
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
                    value={selectedOption}
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
                        <Button className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                          <Pencil /> Edit
                        </Button>
                        <Button
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
                    value={selectedCategory}
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
                        <Button className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                          <Pencil /> Edit
                        </Button>
                        <Button
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
  );
}

export default CategoryPage;

// card
// item for lists
// Button for action
// dialog box for edit
// alert box for deleting
