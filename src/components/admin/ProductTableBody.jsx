import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus } from 'lucide-react';

function ProductTableBody({ products = [], onDelete, onAddVariant }) {
  return (
    <TableBody>
      {products.map((product) => (
        <TableRow key={product._id} className='hover:bg-gray-50 transition'>
          <TableCell className='font-medium text-gray-800'>
            {product.name}
          </TableCell>

          <TableCell className='font-medium text-gray-800'>
            ₹{product.minPrice}
          </TableCell>

          <TableCell
            className={`font-medium ${
              product.stock > 10 ? 'text-green-600' : 'text-red-500'
            }`}>
            {product.stock ? product.stock : 'Out of stock'}
          </TableCell>

          <TableCell className='text-gray-700'>{product.sport?.name}</TableCell>

          <TableCell className='text-yellow-500 font-medium'>
            ⭐ {product.rating}
          </TableCell>

          <TableCell>
            <Link to={`/admin/products/${product._id}/edit`}>
              <Button variant='link' className='cursor-pointer'>
                <Pencil />
              </Button>
            </Link>

            <Button
              onClick={() => onDelete(product._id)}
              className='ml-2 cursor-pointer'
              variant='link'>
              <Trash2 />
            </Button>

            <Button
              onClick={() =>
                onAddVariant({
                  productId: product._id,
                })
              }
              className='ml-2 cursor-pointer hover:bg-blue-600 hover:text-white'
              variant='outline'>
              <Plus />
              <span>Add variant</span>
            </Button>
          </TableCell>

          <TableCell>
            <Link to={`/admin/products/${product._id}/variants`}>
              <span className='hover:text-blue-600'>View variants</span>
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default ProductTableBody;
