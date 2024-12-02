import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/adminApi';

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, category: '' });
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Hot Drinks', 'Cold Drinks', 'Pastries', 'Sandwiches', 'Others'];

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = async () => {
    try {
      const createdProduct = await createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setNewProduct({ name: '', description: '', price: 0, category: '' });
    } catch (error) {
      console.error('Error creating product:', error);
      setError('Failed to create product. Please try again later.');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!editingProduct) return;
      const updatedProduct = await updateProduct(editingProduct._id, editingProduct);
      setProducts(
        products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again later.');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product. Please try again later.');
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel - Manage Menu Items</h1>

      {/* New Product Form */}
      <div className="mb-8 p-4 bg-white rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="border p-2 mb-2 w-full"
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 mb-4 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={handleCreateProduct} className="bg-blue-600 text-white py-2 px-4 rounded">
          Add Product
        </button>
      </div>

      {/* Product List */}
      <div className="w-full max-w-3xl bg-white rounded shadow-md p-4">
        <h2 className="text-2xl font-semibold mb-4">Existing Products</h2>
        {products.map((product) => (
          <div key={product._id} className="flex justify-between items-center mb-4">
            {editingProduct && editingProduct._id === product._id ? (
              <>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="border p-2 w-1/5"
                />
                <input
                  type="text"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="border p-2 w-1/3"
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                  }
                  className="border p-2 w-1/6"
                />
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="border p-2 w-1/6"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button onClick={handleUpdateProduct} className="bg-green-600 text-white py-1 px-2 rounded">
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="w-1/5 text-left">{product.name}</span>
                <span className="w-1/3 text-left">{product.description}</span>
                <span className="w-1/6 text-left">${product.price.toFixed(2)}</span>
                <span className="w-1/6 text-left">{product.category}</span>
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-red-600 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
