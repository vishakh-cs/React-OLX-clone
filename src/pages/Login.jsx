import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import { userAuth } from "../AuthContext/AuthContext"


const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword] = useState('')

    const {user,Login}=userAuth();
    const navigate = useNavigate()
    
    const handdleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        await Login(email, password);
        navigate("/");
      } catch (err) {
        console.error(err);
        alert("Invalid email or password. Please try again.");
      }
    };
     

    const images = [
        "https://th.bing.com/th/id/R.42d92c21d6094e96b9b255fc06ca5c13?rik=Wcfkz5QHA9zDRA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2facoustic-guitar-transparent%2facoustic-guitar-transparent-6.png&ehk=XRyBKxl37Xo03PXqXucbKreujw1OloxvWwph%2fIJ%2bfco%3d&risl=&pid=ImgRaw&r=0",
        "https://cdn-icons-png.flaticon.com/512/146/146607.png",
        "https://th.bing.com/th/id/OIP.MxnNbrniKMR4RW75DHV8SQHaHZ?rs=1&pid=ImgDetMain"
    ];


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div>
            <div className="bg-gray-100 flex items-center justify-center h-full">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                    <div className="flex justify-center mb-6">
                        <button className='text-2xl font-bold mr-10' onClick={handlePrevImage}>&lt;</button>
                        <img
                            className="w-32 h-24"
                            src={images[currentImageIndex]}
                            alt={`image-${currentImageIndex + 1}`}
                        />
                        <button  className='text-2xl font-bold ml-10' onClick={handleNextImage}>&gt;</button>
                    </div>
                    <h2 className="text-2xl font-semibold text-center mb-4">Login to your account</h2>
                   
                    <form onSubmit={handdleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name='email' className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="email@gmail.com" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
                            <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name='password' className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" />
                   
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Login</button>
                        <p className="text-gray-600 text-xs text-center mt-4">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>

                    </form>
                  
                </div>
            </div>
        </div>
    )
}

export default Login;
