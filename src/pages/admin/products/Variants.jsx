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
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVariants } from '@/store/thunks/variantThunk';
import { useEffect } from 'react';

function Variants() {
  const { id } = useParams();
  const { isLoading, variants, error, totalPages, currentPage } = useSelector(
    (state) => state.variants,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVariants(id));
  }, [dispatch, id]);

  const handlePageChange = (page) => {
    dispatch(variantsActions.setPage(page));
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error....</div>;
  }

  return (
    <div className='bg-white p-6 rounded-xl shadow-sm border'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Variants</h1>
        <Button size='lg' className='mb-6 bg-blue-600 cursor-pointer'>
          <Plus />
          <span>Add Variant</span>
        </Button>
      </div>

      <div className='rounded-lg border overflow-hidden'>
        <Table className='w-full'>
          <TableHeader className='bg-gray-100'>
            <TableRow>
              <TableHead className='font-semibold text-gray-700'>
                Product Name
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Color
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Size
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Price
              </TableHead>
              <TableHead className='font-semibold text-gray-700'>
                Stock
              </TableHead>

              <TableHead className='font-semibold text-gray-700'>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant) => (
              <TableRow
                key={variant._id}
                className='hover:bg-gray-50 w-full transition-colors [&>td]:hover:bg-transparent'>
                <TableCell className='font-medium text-gray-800'>
                  {variant.name}
                </TableCell>
                <TableCell className='font-medium text-gray-800'>
                  {variant.color}
                </TableCell>
                <TableCell className='font-medium text-gray-800'>
                  {variant.size}
                </TableCell>
                <TableCell className='font-medium text-gray-800'>
                  {variant.price}
                </TableCell>
                <TableCell
                  className={`font-medium  ${
                    variant.stock > 10 ? 'text-green-600' : 'text-red-500'
                  }`}>
                  {variant.stock ? variant.stock : 'Out of stock'}
                </TableCell>

                <TableCell>
                  <Button variant='link' className='cursor-pointer'>
                    <Pencil />
                  </Button>
                  <Button className='ml-2 cursor-pointer' variant='link'>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Variants;
