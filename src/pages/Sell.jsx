import { useState } from "react";
import { db, Auth, storage } from "../Services/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Navigate, useNavigate } from 'react-router-dom';

const Sell = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  const Navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const filePreviewUrl = URL.createObjectURL(file);
      setFilePreviewUrl(filePreviewUrl);
    }
  };

  const addProductToDatabase = async () => {
    try {
      const user = Auth.currentUser;
      if (!user) {
        console.error('User not authenticated');
        return;
      }

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `images/${user.uid}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);

      //  download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      const productData = {
        userId: user.uid,
        productName,
        price,
        productCategory,
        imageUrl,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'products'), productData);
      console.log('Product added with ID: ', docRef.id);

      const allProductsData = {
        ...productData,
        productId: docRef.id,
      };

      await addDoc(collection(db, 'allProducts'), allProductsData);
      console.log('Product added to "allProducts" collection');

      Navigate('/');
    } catch (error) {
      console.error('Error adding product to database: ', error.message);
    }
  };

  const handdleProductSubmit = (e) => {
    e.preventDefault();
    addProductToDatabase();
  };

      return (
        <div className="relative min-h-screen flex items-center justify-center
     bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
          <div className="absolute bg-white opacity-60 inset-0 z-0"></div>
          <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <h2 className="mt-5 text-3xl font-bold text-gray-900">
                Sell your Product or items
              </h2>
              <p className="mt-2 text-sm text-gray-400">Someone Wants that</p>
            </div>
            <form onSubmit={handdleProductSubmit} className="mt-8 space-y-3">
              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Product Name</label>
                <input onChange={(e) => setProductName(e.target.value)} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" name='ProductName' type="text" placeholder="Product Name" />
              </div>

              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Product Price</label>
                <input onChange={(e) => setPrice(e.target.value)} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" name='Price' type="text" placeholder="Product Price" />
              </div>

              <div className="grid grid-cols-1 space-y-2">
                <label className="text-sm font-bold text-gray-500 tracking-wide">Product Category</label>
                <select onChange={(e) => setProductCategory(e.target.value)} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500">
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Kitchen items">Kitchen items</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Mobile">Mobile</option>
                </select>
              </div>

              <p className="text-sm text-gray-500">
                <span className='font-bold'>File type: Images Only</span>
              </p>
              <div>
                <div className="grid grid-cols-1 space-y-2">
                  <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                      <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                      <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
  {filePreviewUrl ? (
    <img className="has-mask h-36 object-center" src={filePreviewUrl} alt="preview" />
  ) : (
    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
  )}
</div>
                        <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <label htmlFor="fileInput" className="text-blue-600 hover:underline cursor-pointer">select a file</label> from your computer</p>
                      </div>
                      <input id="fileInput" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
                <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };

    export default Sell;
    