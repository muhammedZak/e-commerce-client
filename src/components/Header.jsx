import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import NavItems from './NavItems';
import MenuIcon from './MenuIcon';
import MobileDrawer from './MobileDrawer';
import { useSelector } from 'react-redux';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className='sticky top-0 z-50 bg-white shadow-sm border-b py-4'>
        <Container>
          <div className='flex justify-between items-center gap-8'>
            <NavLink to='/'>
              <img src='/buyvora_logo_svg.svg' alt='buyvora' className='w-40' />
            </NavLink>
            <SearchBar />
            <NavItems user={userInfo}>
              <MenuIcon onClick={() => setIsOpen(true)} className='md:hidden' />
            </NavItems>
          </div>
        </Container>
      </header>

      <MobileDrawer isOpen={isOpen} handleClick={setIsOpen} />
    </>
  );
}

export default Header;
