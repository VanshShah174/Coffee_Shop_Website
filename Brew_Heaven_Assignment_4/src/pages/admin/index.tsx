import { GetServerSideProps } from 'next';
import { useAuth } from '../../context/AuthContext';
import AdminPage from '../AdminPage';
import { getProducts } from '../../api/adminApi';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token; // Fetch token from cookies
  const isAdmin = req.cookies.isAdmin === 'true'; // Check admin status from cookies

  // Redirect to login if token or admin status is missing
  if (!token || !isAdmin) {
    return {
      redirect: {
        destination: '/auth/login', // Redirect to login if not admin
        permanent: false,
      },
    };
  }

  try {
    // Pass token to fetch admin products
    const products = await getProducts(token);
    return { props: { products } };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { props: { products: [] } }; // Return empty products on failure
  }
};

const Admin = ({ products }: { products: any[] }) => {
  const { isAdmin, isAuthenticated } = useAuth(); // Validate client-side authentication and admin status

  // Redirect if not authenticated or not admin
  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login'; // Client-side redirect
    }
    return <p>Redirecting to login...</p>;
  }

  if (!isAdmin) {
    return <p>Not Authorized</p>;
  }

  return <AdminPage products={products} />;
};

export default Admin;
