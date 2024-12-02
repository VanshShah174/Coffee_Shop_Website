const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function to get the token from localStorage
const getToken = (): string | null => localStorage.getItem('token');

// Helper function to get authorization headers
const authHeader = (): HeadersInit => {
  const token = getToken();
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return { Authorization: `Bearer ${token}` };
};

/**
 * Fetch all products
 */
export const getProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(), // Attach the authorization header
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch all admin products
 */
export const getAdminProducts = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}/products?admin=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(), // Attach the authorization header
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch admin products: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching admin products:', error);
    throw error;
  }
};

/**
 * Create a new product
 */
export const createProduct = async (product: {
  name: string;
  description: string;
  price: number;
  category: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/products/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = async (
  productId: string,
  updatedProduct: {
    name: string;
    description: string;
    price: number;
    category: string;
  }
): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        ...authHeader(),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete product: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
