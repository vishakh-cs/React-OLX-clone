import { useEffect, useState } from 'react';
import { db } from '../Services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';

const ProductData = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
        console.log('Products fetched successfully:', productsData);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductData;
