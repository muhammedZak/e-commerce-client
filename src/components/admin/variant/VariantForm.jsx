import FormField from '@/components/form/FormField';

import { Input } from '@/components/ui/input';
import { FieldDescription, FieldGroup } from '@/components/ui/field';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const VariantForm = ({ form, onSubmit, title = 'Add' }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{title} Variant</DialogTitle>
        <DialogDescription>Update your variant details below</DialogDescription>
      </DialogHeader>
      <form onSubmit={form?.handleSubmit(onSubmit)} className='space-y-4'>
        <FieldGroup>
          <FormField name='name' control={form.control} label='Name'>
            {(field, state) => (
              <Input
                {...field}
                value={field.value || ''}
                aria-invalid={state.invalid}
                placeholder='Enter variant name'
              />
            )}
          </FormField>
          <FormField name='productId' control={form.control} label='Product'>
            {(field, state) => (
              <Input
                {...field}
                value={field.value || ''}
                aria-invalid={state.invalid}
                placeholder='Product'
                disabled
              />
            )}
          </FormField>
          <FormField name='color' control={form.control} label='Color'>
            {(field, state) => (
              <Input
                {...field}
                value={field.value || ''}
                aria-invalid={state.invalid}
                placeholder='e.g. Red'
              />
            )}
          </FormField>
          <FormField name='size' control={form.control} label='Size'>
            {(field, state) => (
              <Input
                {...field}
                value={field.value || ''}
                aria-invalid={state.invalid}
                placeholder='e.g. M, L, XL'
              />
            )}
          </FormField>
          <FormField name='price' control={form.control} label='Price'>
            {(field, state) => {
              const formatCurrency = (value) => {
                if (!value && value !== 0) return '';
                return new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(value);
              };

              const parseValue = (value) => {
                return value.replace(/[^0-9]/g, '');
              };
              return (
                <Input
                  value={formatCurrency(field.value)}
                  onChange={(e) => {
                    const raw = parseValue(e.target.value);
                    field.onChange(raw ? Number(raw) : '');
                  }}
                  aria-invalid={state.invalid}
                  placeholder='₹0'
                />
              );
            }}
          </FormField>
          <FormField name='stock' control={form.control} label='Stock'>
            {(field, state) => (
              <Input
                type='number'
                {...field}
                value={field.value ?? 0}
                aria-invalid={state.invalid}
                placeholder='Enter stock quantity'
              />
            )}
          </FormField>
          <FormField name='images' control={form.control} label='Images'>
            {(field, state) => (
              <>
                <Input
                  id={field.name}
                  type='file'
                  multiple
                  aria-invalid={state.invalid}
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);
                    field.onChange([...(field.value || []), ...newFiles]);
                  }}
                />
                <FieldDescription>Select a picture to upload.</FieldDescription>
              </>
            )}
          </FormField>
          <FormField
            name='isAvailable'
            control={form.control}
            label='Available'>
            {(field) => (
              <input
                type='checkbox'
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          </FormField>
        </FieldGroup>
        <DialogFooter>
          <Button type='submit' className='cursor-pointer'>
            {title === 'Add' ? 'Create' : 'Update'}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default VariantForm;
