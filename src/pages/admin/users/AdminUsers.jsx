import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/thunks/fetchProducts';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminUsers() {
  //   const { isLoading, products, error, totalPages, currentPage } = useSelector(
  //     (state) => state.products,
  //   );

  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(fetchProducts(currentPage));
  //   }, [currentPage, dispatch]);

  //   const handlePageChange = (page) => {
  //     dispatch(productsActions.setPage(page));
  //   };

  //   if (isLoading) {
  //     return <div>Loading....</div>;
  //   }

  //   if (error) {
  //     return <div>Error....</div>;
  //   }

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm border'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Products</h1>
        <Button size='lg' className='mb-6 bg-blue-600 cursor-pointer'>
          <Plus />
          <span>Add Product</span>
        </Button>
      </div>
      <div className='rounded-lg border overflow-hidden'>
        <Table>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead className='font-semibold text-gray-700'>
                Product Name
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Price
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Stock
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Sport
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Rating
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Action
              </TableHead>
              <TableHead className='font-semibold text-gray-700'></TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {products.map((product) => (
              <TableRow
                key={product._id}
                className='hover:bg-gray-50 transition'>
                <TableCell className='font-medium text-gray-800'>
                  {product.name}
                </TableCell>
                <TableCell className='font-medium text-gray-800'>
                  {product.minPrice}
                </TableCell>
                <TableCell
                  className={`font-medium ${
                    product.stock > 10 ? 'text-green-600' : 'text-red-500'
                  }`}>
                  {product.stock ? product.stock : 'Out of stock'}
                </TableCell>
                <TableCell className='text-gray-700'>
                  {product.sport.name}
                </TableCell>
                <TableCell className='text-yellow-500 font-medium'>
                  ⭐ {product.rating}
                </TableCell>
                <TableCell>
                  <Button variant='link' className='cursor-pointer'>
                    <Pencil />
                  </Button>
                  <Button className='ml-2 cursor-pointer' variant='link'>
                    <Trash2 />
                  </Button>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product._id}/variants`}>
                    <span className='hover:text-blue-600'>View variants</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </div>
    </div>
  );
}

export default AdminUsers;
