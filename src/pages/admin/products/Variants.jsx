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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVariants } from '@/store/thunks/variantThunk';
import { useEffect } from 'react';
import CustomTableHead from '@/components/admin/CustomTableHead';
import CustomTableBody from '@/components/admin/CustomTableBody';

const columns = [
  { key: 'name', label: 'Product Name' },
  { key: 'color', label: 'Color' },
  { key: 'size', label: 'Size' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'actions', label: 'Actions' },
];

const variantColumns = [
  { key: 'name' },
  { key: 'color' },
  { key: 'size' },
  { key: 'price' },

  {
    key: 'stock',
    render: (item) => (
      <span className={item.stock > 10 ? 'text-green-600' : 'text-red-500'}>
        {item.stock > 0 ? item.stock : 'Out of stock'}
      </span>
    ),
  },
];

const variantActions = (variant) => (
  <>
    <Button variant='link'>
      <Pencil />
    </Button>

    <Button variant='link' className='ml-2'>
      <Trash2 />
    </Button>
  </>
);

function Variants() {
  const navigate = useNavigate();
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
        <Button
          onClick={() => navigate(-1)}
          variant='outline'
          className='mb-6 p-5 text-xl hover:bg-gray-200  cursor-pointer'>
          <span>Back</span>
        </Button>
      </div>

      <div className='rounded-lg border overflow-hidden'>
        <Table className='w-full'>
          <CustomTableHead columns={columns} />
          <CustomTableBody
            data={variants}
            columns={variantColumns}
            actions={variantActions}
          />
          {/* <TableBody>
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
          </TableBody> */}
        </Table>
      </div>
    </div>
  );
}

export default Variants;
