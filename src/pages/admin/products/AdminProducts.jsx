import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/thunks/fetchProducts';

function AdminProducts() {
  const { isLoading, products, error, totalPages, currentPage } = useSelector(
    (state) => state.products,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (page) => {
    dispatch(productsActions.setPage(page));
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error....</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Products</h1>

      <table className='w-full border'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>

              <td className='flex gap-2'>
                <button>Edit</button>
                <button onClick={() => deleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
