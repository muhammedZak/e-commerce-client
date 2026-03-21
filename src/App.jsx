import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';
import ProductsDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminRoute from './components/admin/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminProducts from './pages/admin/products/AdminProducts';
import CreateProduct from './pages/admin/products/CreateProducts';
import EditProduct from './pages/admin/products/EditProduct';
import Dashboard from './pages/admin/Dashboard';
import Variants from './pages/admin/products/Variants';
import AdminUsers from './pages/admin/users/AdminUsers';
import CategoryPage from './pages/admin/category/CategoryPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: <ProductsListPage /> },
      { path: '/products/:productId', element: <ProductsDetailsPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'products/create', element: <CreateProduct /> },
      { path: 'products/:id/edit', element: <EditProduct /> },
      { path: 'products/:id/variants', element: <Variants /> },
      { path: 'categories', element: <CategoryPage /> },
      { path: 'users', element: <AdminUsers /> },

      // { path: 'orders', element: <AdminOrders /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
