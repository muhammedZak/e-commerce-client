import AdminSidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className='flex h-screen'>
          <div className='flex flex-col flex-1'>
            <Header />
            <main className='p-6 bg-gray-100 flex-1 overflow-y-auto'>
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}

export default AdminLayout;
