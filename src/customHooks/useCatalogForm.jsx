import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

function useCatalogForm(modalType) {
  const form = useForm({
    resolver: zodResolver(getSchema(modalType)),
    defaultValues: {
      name: '',
      sport: '',
      category: '',
    },
  });

  const resetForm = (item = null) => {
    form.reset({
      name: item?.name || '',
      sport: item?.sport || '',
      category: item?.category || '',
    });
  };

  return { form, resetForm };
}

export { useCatalogForm };
