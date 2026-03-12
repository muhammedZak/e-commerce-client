import React from 'react';
import HeroSlider from '../components/HeroSlider';
import TopProducts from '../components/TopProducts';
import Container from '../components/Container';
import { Headset, ShieldCheck, Truck, Van } from 'lucide-react';
import FeaturesBar from '../components/FeaturesBar';
import NewsletterSection from '../components/NewsLetter';

function HomePage() {
  return (
    <>
      <HeroSlider />
      <TopProducts />
      <FeaturesBar />
      <NewsletterSection />
    </>
  );
}

export default HomePage;
