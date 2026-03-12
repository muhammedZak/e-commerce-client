import { Menu } from 'lucide-react';

function MenuIcon({ ...props }) {
  return (
    <button {...props}>
      <Menu size={24} />
    </button>
  );
}

export default MenuIcon;
