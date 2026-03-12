import { useState, useEffect, useRef } from 'react';
import { slides } from '../data/sliderData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 5000;

  // Reset auto slide timer
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto slide
  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, delay);

    return () => resetTimeout();
  }, [current]);

  return (
    <section className='relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] overflow-hidden'>
      {/* Slides */}
      <div className='relative w-full h-full'>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}>
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className='w-full h-full object-cover'
            />

            {/* Overlay */}
            <div className='absolute inset-0 bg-black/40' />

            {/* Content */}
            <div className='absolute inset-0 flex items-center'>
              <div className='container mx-auto px-4 lg:px-8'>
                <div className='max-w-xl text-white space-y-4 animate-fadeIn'>
                  <p className='text-sm md:text-base text-gray-200'>
                    {slide.subtitle}
                  </p>

                  <h1 className='text-3xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    {slide.title}
                  </h1>

                  <Link
                    to={slide.buttonLink}
                    className='inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-medium'>
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition z-20'>
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition z-20'>
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className='absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-20'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
