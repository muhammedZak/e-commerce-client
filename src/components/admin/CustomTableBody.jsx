import { TableBody, TableCell, TableRow } from '../ui/table';

function CustomTableBody({ data = [], columns = [], actions }) {
  if (!data.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns.length + (actions ? 1 : 0)}
            className='text-center py-10 text-gray-500 text-sm'>
            No data found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {data.map((item, index) => (
        <TableRow
          key={item._id || item.id}
          className={`
            border-b last:border-0
            hover:bg-gray-50
            transition-colors
          `}>
          {columns.map((col) => (
            <TableCell
              key={col.key}
              className={`
                px-4 py-3
                text-sm text-gray-700
                text-center
                ${col.className || ''}
              `}>
              {col.render ? col.render(item) : item[col.key]}
            </TableCell>
          ))}

          {actions && (
            <TableCell className='px-4 py-3 text-center space-x-2'>
              {actions(item)}
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CustomTableBody;
