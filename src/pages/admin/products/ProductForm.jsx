import { useState } from 'react';

function ProductForm({ onSubmit, product }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        name='name'
        placeholder='Product Name'
        value={form.name}
        onChange={handleChange}
      />

      <input
        name='price'
        placeholder='Price'
        value={form.price}
        onChange={handleChange}
      />

      <input
        name='stock'
        placeholder='Stock'
        value={form.stock}
        onChange={handleChange}
      />

      <button type='submit'>Save Product</button>
    </form>
  );
}

export default ProductForm;
