import ProductForm from './ProductForm';
import axios from 'axios';

function CreateProduct() {
  const createProduct = async (formData) => {
    await axios.post('/api/products', formData);
  };

  return (
    <div>
      <h1>Create Product</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  );
}

export default CreateProduct;
