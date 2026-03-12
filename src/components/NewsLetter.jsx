import Container from './Container';

function NewsletterSection() {
  return (
    <section className='mt-24'>
      <Container>
        <div className='bg-gray-50 rounded-2xl py-12 px-6 md:px-16'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-gray-900'>
              Get 10% off your first order
            </h2>

            <p className='mt-3 text-gray-500 text-sm md:text-base'>
              Subscribe to our newsletter and stay updated with exclusive
              offers.
            </p>

            <form className='mt-8 flex flex-col sm:flex-row gap-3 justify-center'>
              <input
                type='email'
                placeholder='Enter your email address'
                className='flex-1  h-12 sm:max-w-md px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600'
              />

              <button
                type='submit'
                className='h-12 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NewsletterSection;
