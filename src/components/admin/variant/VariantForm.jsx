import { Input } from '@/components/ui/input';

import FormField from '@/components/form/FormField';
import { FieldGroup } from '@/components/ui/field';
import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const VariantForm = ({ form }) => {
  return (
    <>
      <FieldGroup>
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
        <FormField name='productId' control={form.control} label='Product'>
          {(field, state) => (
            <Input
              {...field}
              value={field.value || ''}
              aria-invalid={state.invalid}
              placeholder='Product'
            />
          )}
        </FormField>
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
      </FieldGroup>
      <DialogFooter>
        <Button type='submit' className='cursor-pointer'>
          Create
        </Button>
      </DialogFooter>
    </>
  );
};

export default VariantForm;
