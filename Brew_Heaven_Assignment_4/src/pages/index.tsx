import React, { useEffect, useState } from 'react';
import Home from '../components/Home';
import { getProducts } from '../api/productService';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const IndexPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from API...'); // Debugging
        const data = await getProducts();
        console.log('Fetched products:', data); // Debugging
        setProducts(data);
        setError(null);
      } catch (error) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    

    fetchProducts();
  }, []);

  return <Home products={products} loading={loading} error={error} />;
};

export default IndexPage;
