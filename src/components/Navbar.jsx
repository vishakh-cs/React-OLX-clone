import { IoIosArrowDropdown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {userAuth} from "../AuthContext/AuthContext"



const Navbar = () => {
  
  const {user,logout}=userAuth();
  const Navigate = useNavigate()

  const handdleLogout = async () => {
    try {
      alert("You have been logged out");
      await logout();
    
      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return ( 
    <div className="navbar-wrapper">
      <div className="bg-gray-200 w-full h-16 flex gap-1 items-center">
        <div className="w-14 ml-4">
        
          <img  onClick={() => Navigate('/')} src="https://logo-marque.com/wp-content/uploads/2022/04/OLX-Logo.png" alt="olx" />
        </div>

        {/* Left Input Box */}
        <div className="flex items-center flex-grow border-2  border-black rounded mx-2 bg-white">
          <input
            placeholder="Find Cars, Mobile Phones and more..."
            className="w-full outline-none py-2 px-2" autoComplete="off" 
          />
         <CiSearch className="text-black mx-5" size={30} />
        </div>

        {/* Right Input Box */}
        <div className="flex items-center flex-grow border-2 max-w-72 border-black rounded mx-2 bg-white">
          <input
            placeholder="Search products in you Location"
            className="w-full outline-none py-2 px-2"
          />
         <MdOutlineLocationOn className="text-black mx-2" size={30} />
        </div>

        {/* Language Dropdown */}
    
        <select
            id="dropdownDefaultButton"
            className="bg-white relative focus:ring-4 focus:outline-none w-1/12 font-medium rounded-lg text-sm px-5 py-2.5 
            text-center inline-flex items-center dark:hover:bg-blue-300 border border-black text-black">
              
          
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            
          </select>
       
        {/* Login Button */}
        {user?.email ?(
          <button onClick={handdleLogout} className="bg-white text-black py-2 px-4 rounded-full shadow uppercase font-bold ml-2">
            Logout
          </button>
        ) : (
          <button onClick={() => Navigate('/login')} className="bg-white text-black py-2 px-4 rounded-full shadow uppercase font-bold ml-2">
            Log in
          </button>
        )}
        <button onClick={user?.email ? () => Navigate('/sellitem') : ()=>Navigate('/login')} className=" mx-4 w-24 font-bold  rounded-2xl py-2  bg-orange-500 text-white hover:bg-orange-600">
          +Sell
        </button>
      </div>
    </div>
    );
};

export default Navbar;
