import React from 'react';
import { TableHeader, TableRow, TableHead as HeadCell } from '../ui/table';

function CustomTableHead({ columns = [] }) {
  return (
    <TableHeader className='bg-gray-50 border-b'>
      <TableRow className='h-12'>
        {columns.map((col) => (
          <HeadCell
            key={col.key}
            className={`
              px-4 py-3
              text-center text-sm font-semibold text-gray-600
              tracking-wide uppercase
              ${col.headerClassName || ''}
            `}>
            {col.label}
          </HeadCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default CustomTableHead;
