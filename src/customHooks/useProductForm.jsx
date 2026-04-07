import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

function getFormSchema(mode) {
  return z.object({
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
    picture: mode
      ? z.any().optional()
      : z.instanceof(File, { message: 'Image is required' }),
  });
}

function useProductForm(isEdit) {
  return useForm({
    resolver: zodResolver(getFormSchema(isEdit)),
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
}

export { useProductForm };
