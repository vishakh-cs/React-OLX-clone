import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar'
import Login from './Pages/Login';
import Signup from './pages/Signup';
import { AuthContextProvider } from "./AuthContext/AuthContext"
import Sell from './pages/Sell';
import Profile from './pages/Profile';
import ProductDetails from './pages/ProductDetails';

function App() {


  return (
   <>
   <AuthContextProvider>
    <Router>
   <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/sellitem' element={<Sell/>} />
      <Route path='/profile' element={<Profile />}/>
      <Route path='/productDetail/:productId' element={<ProductDetails/>} />
    </Routes>
   </Router>
   </AuthContextProvider>

   </>
    
   
  )
}

export default App
