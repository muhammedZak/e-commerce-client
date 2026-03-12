import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Breadcrump() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className='my-3'>
      <Link to='/'>Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const breadcrumbName = name;

        return isLast ? (
          <span key={routeTo}> / {breadcrumbName}</span>
        ) : (
          <span key={routeTo}>
            {' '}
            / <Link to={routeTo}>{breadcrumbName}</Link>
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrump;
