import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

function FormModal({
  open,
  setOpen,
  title,
  form,
  onSubmit,
  editingItem,
  setEditingItem,
  setModalType,
  children,
}) {
  const handleOpenChange = (val) => {
    setOpen(val);

    if (!val) {
      form?.reset({
        name: '',
        sport: '',
        category: '',
      });

      setEditingItem?.(null);
      setModalType?.(null);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Edit' : 'Add'} {title}
          </DialogTitle>
          <DialogDescription>
            Update your {title} details below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {children}
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormModal;
