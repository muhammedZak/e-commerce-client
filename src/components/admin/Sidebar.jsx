import { Button } from '@/components/ui/button';
import { LayoutDashboard, Package, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../ui/sidebar';
import { UserCog } from 'lucide-react';
import SidebarNav from './SidebarNav';

function AdminSidebar() {
  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='hover:bg-gray-300 rounded-lg'>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to='/admin'>
              <div className='flex'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-gray-700 text-gray-50'>
                  <UserCog className='size-4' />
                </div>
                <p className='truncate font-bold  self-end '>Admin</p>
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
