import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import SelectField from '@/components/form/SelectField';
import FormField from '@/components/form/FormField';

const CatalogForm = ({
  form,
  modalType,
  sports,
  categories,
  editingItem,
  onSubmit,
}) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {editingItem ? 'Edit' : 'Add'} {modalType}
        </DialogTitle>
        <DialogDescription>
          Update your {modalType} details below
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={form?.handleSubmit(onSubmit)} className='space-y-4'>
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
    </>
  );
};

export default CatalogForm;
