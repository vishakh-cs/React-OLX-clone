import { useEffect, useState } from 'react';
import { db } from '../Services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const gettingData = await getDocs(collection(db, 'allProducts'));
        const productsData = gettingData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    <div className="flex flex-wrap justify-center">
    {products.map((product) => (
      <div key={product.id} className="max-w-md mx-auto w-64 mt-5 py-5 rounded-md overflow-hidden shadow-md hover:shadow-lg">
        <div className="relative" onClick={() => navigate(`/productDetail/${encodeURIComponent(product.id)}`)}>
          <img className="w-full h-52 object-contain " src={product.imageUrl} alt="Product Image" />
          <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
            {product.sale ? 'SALE' : ''}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{product.productName}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.productCategory}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Rs.{product.price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
};
export default ProductCard;
