import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/sidebar';
import { User, ShoppingBasket, LayoutDashboard, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: ShoppingBasket,
  },
  {
    title: 'Categories',
    url: '/admin/categories',
    icon: Cog,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: User,
  },
];

function SidebarNav() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) => (
          <Collapsible key={item.title}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default SidebarNav;
