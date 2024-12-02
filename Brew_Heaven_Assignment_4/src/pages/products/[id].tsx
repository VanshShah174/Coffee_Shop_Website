import { GetServerSideProps } from 'next';
import { getProduct } from '../../api/productService';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const product = await getProduct(id as string);
    return { props: { product } };
  } catch (error) {
    console.error(error);
    return { notFound: true }; // Return a 404 page if the product is not found
  }
};

const ProductDetailsPage = ({ product }: { product: any }) => {
  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetailsPage;
