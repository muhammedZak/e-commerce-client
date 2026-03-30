import { Dialog, DialogContent } from '@/components/ui/dialog';

function FormModal({ open, onOpenChange, children }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default FormModal;
