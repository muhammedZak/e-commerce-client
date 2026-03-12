import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './Container';

function Footer() {
  return (
    <footer className=' border-t border-gray-100 mt-16'>
      <div className='py-12'>
        <Container>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-600'>
            {/* About */}
            <div className=''>
              <h4 className='font-semibold text-gray-800 mb-4'>About Us</h4>
              <ul className='space-y-2'>
                <li>
                  <Link to='#' className='hover:text-blue-600 '>
                    Company
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            {/* Shop */}
            <div>
              <h4 className='font-semibold text-gray-800 mb-4'>Shop</h4>
              <ul className='space-y-2'>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Men
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Women
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className='font-semibold text-gray-800 mb-4'>Support</h4>
              <ul className='space-y-2'>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h4 className='font-semibold text-gray-800 mb-4'>Policies</h4>
              <ul className='space-y-2'>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to='#' className='hover:text-blue-600'>
                    Shipping Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className='font-semibold text-gray-800 mb-4'>Follow Us</h4>
              <div className='flex gap-4'>
                <a href='#' className='hover:text-blue-600'>
                  <Facebook size={20} />
                </a>
                <a href='#' className='hover:text-blue-600'>
                  <Instagram size={20} />
                </a>
                <a href='#' className='hover:text-blue-600'>
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className='mt-12 pt-6 border-t border-gray-100 text-center text-xs text-gray-500'>
            © 2026 Buyvora. All rights reserved.
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
