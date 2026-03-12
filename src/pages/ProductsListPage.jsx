import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/thunks/fetchProducts';
import { productsActions } from '../store/slices/productsSlice';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Container from '../components/Container';
import GridLayout from '../components/GridLayout';
import ProductCard from '../components/ProductCard';
import Breadcrump from '../components/Breadcrump';
import Pagination from '../components/Pagination';
import FilterOffcanvas from '../components/MobileOffcanvasFilter/FilterOffcanvas';

function ProductsListPage() {
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const dispatch = useDispatch();

  const { isLoading, products, error, totalPages, currentPage } = useSelector(
    (state) => state.products,
  );

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

  const onFilterClickHandler = () => setShowMobileFilter(false);

  return (
    <div className='bg-gray-100 py-6'>
      {showMobileFilter && (
        <div
          className='fixed inset-0 bg-black/40 z-40'
          onClick={() => setShowMobileFilter(false)}
        />
      )}
      <FilterOffcanvas
        open={showMobileFilter}
        onButtonClick={onFilterClickHandler}
      />
      <Container>
        <Breadcrump />
        <div className='my-3 text-2xl font-medium text-green-900'>Products</div>
        <div>
          <div className='flex justify-between mb-5 mt-3'>
            <button
              className='cursor-pointer'
              onClick={() => setShowMobileFilter(true)}>
              filter
            </button>
            <div>sort</div>
          </div>
          <GridLayout className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </GridLayout>
        </div>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </Container>
    </div>
  );
}

export default ProductsListPage;
