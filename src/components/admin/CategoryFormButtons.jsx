import { Button } from '../ui/button';

function CategoryFormButtons({ isEditing, disabled, onCancel, form }) {
  return (
    <div className='flex gap-2 justify-end'>
      <Button
        className='w-40 md:w-1/2 bg-blue-600 block'
        type='submit'
        disabled={disabled}>
        {isEditing ? 'Update' : 'Add'}
      </Button>

      <Button
        className='w-40 md:w-1/2'
        type='button'
        variant='outline'
        onClick={() => {
          onCancel(null);
          form.reset();
        }}>
        Cancel
      </Button>
    </div>
  );
}

export default CategoryFormButtons;
