import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const variantSchema = z.object({
  name: z.string().min(2, 'Variant name must be at least 2 characters'),

  productId: z.string().min(1, 'Product is required'),

  color: z.string().optional(),

  size: z.string().optional(),

  price: z.coerce
    .number() 
    .min(0, 'Price must be greater than or equal to 0'),

  stock: z.coerce.number().min(0, 'Stock cannot be negative').default(0),

  isAvailable: z.boolean().default(true),

  images: z.array(z.string().url('Invalid image URL')).optional().default([]),
});

function useVariantForm() {
  const form = useForm({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      name: '',
      productId: '',
      color: '',
      size: '',
      price: 0,
      stock: 0,
      isAvailable: true,
      images: [],
    },
  });

  const resetForm = (item = null) => {
    form.reset({
      name: item?.name || '',
      productId: item?.productId || '',
      color: item?.color || '',
      size: item?.size || '',
      price: item?.price ?? 0,
      stock: item?.stock ?? 0,
      isAvailable: item?.isAvailable ?? true,
      images: item?.images ?? [],
    });
  };

  return { form, resetForm };
}

export { useVariantForm };
