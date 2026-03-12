import Container from './Container';
import { Headset, ShieldCheck, Truck, Van } from 'lucide-react';

function FeaturesBar() {
  const features = [
    {
      icon: <Van size={22} />,
      title: 'Free Shipping',
      desc: 'On orders above ₹999',
    },
    {
      icon: <ShieldCheck size={22} />,
      title: 'Secure Payment',
      desc: '100% protected checkout',
    },
    {
      icon: <Truck size={22} />,
      title: 'Easy Returns',
      desc: '30-day return policy',
    },
    {
      icon: <Headset size={22} />,
      title: '24/7 Support',
      desc: 'Dedicated customer care',
    },
  ];

  return (
    <section className='bg-gray-50 border-y border-gray-200 mt-20'>
      <Container>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 py-10'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='flex items-start md:items-center gap-4 md:justify-center'>
              <div className='text-blue-600'>{feature.icon}</div>

              <div>
                <h4 className='text-sm font-semibold text-gray-900'>
                  {feature.title}
                </h4>
                <p className='text-xs text-gray-500 mt-1'>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default FeaturesBar;
