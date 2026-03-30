import React from 'react';
import { TableHeader, TableRow, TableHead as HeadCell } from '../ui/table';

function CustomTableHead({ columns = [] }) {
  return (
    <TableHeader className='bg-gray-100'>
      <TableRow>
        {columns.map((col) => (
          <HeadCell key={col.key} className='font-semibold text-gray-700'>
            {col.label}
          </HeadCell>
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default CustomTableHead;
