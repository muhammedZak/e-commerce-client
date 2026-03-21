import { Spinner } from '@/components/ui/spinner';

function LoaderOverlay() {
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <Spinner className='size-10 text-white' />
    </div>
  );
}

export default LoaderOverlay;
