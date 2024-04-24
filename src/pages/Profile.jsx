import { useEffect, useState } from 'react';
import { db } from '../Services/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { userAuth } from '../AuthContext/AuthContext';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const { user } = userAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (user) {
          //  get products based on the user ID
          const q = query(collection(db, 'products'), where('userId', '==', user.uid));
          const gettingData = await getDocs(q);

          const productsData = gettingData.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setProducts(productsData);
          console.log('Products fetched successfully users:', productsData);
        }
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [user]);

  if (products.length === 0) {
    return <div><h1>You Are not selled or selling any item.</h1></div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {products.map((product) => (
        <div key={product.id} className="max-w-md mx-auto w-64 mt-5 py-5 rounded-md overflow-hidden shadow-md hover:shadow-lg">
          <div className="relative">
            <img className="w-full h-52 object-contain" src={product.imageUrl} alt="Product Image" />
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
              {product.sale ? 'SALE' : ''}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium mb-2">{product.productName}</h3>
            <p className="text-gray-600 text-sm mb-4">{product.productCategory}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">${product.price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
