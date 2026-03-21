import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Item, ItemTitle } from '../ui/item';

function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <header className='flex h-16 shrink-0 items-center gap-2'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 ' />
      </div>
      <div className='ml-auto mr-12 flex items-center gap-1'>
        <Item>
          <ItemTitle>{userInfo.name}</ItemTitle>
        </Item>
        <Avatar>
          <AvatarImage src={<User />} className='grayscale' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
