import React from 'react';

function GridLayout({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export default GridLayout;
