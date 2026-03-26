import { Button } from '../ui/button';

function CatalogList({ lists, onEdit, onDelete }) {
  return (
    <div className='flex flex-wrap gap-2 mt-8'>
      {lists.map((list) => (
        <div
          key={list._id}
          className='flex items-center gap-2 px-3 py-3 bg-blue-100 rounded-full text-sm'>
          <span>{list.name}</span>
          <Button
            onClick={() => onEdit(list)}
            variant='secondary'
            size='xs'
            className='bg-blue-500'>
            Edit
          </Button>
          <Button
            onClick={() => onDelete(list._id)}
            variant='ghost'
            size='xs'
            className='bg-red-400'>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}

export default CatalogList;
