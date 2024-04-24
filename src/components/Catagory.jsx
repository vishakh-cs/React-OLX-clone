import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {userAuth} from "../AuthContext/AuthContext"
import { Auth } from "../Services/firebase";


const Catagory = () => {
    const [Catagories, setCatagories] = useState('All Categories');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleMouseEnter = () => {
        setShowDropdown(true);
    }

    const handleMouseLeave = () => {
        setShowDropdown(false);
    }

    const handleItemClick = (clickedCategory) => {
        setCatagories("Showing items in " + clickedCategory);
        setShowDropdown(false);
    }

    const Navigate=useNavigate()

    const {user}=userAuth();

    return (
        <div className='flex w-full h-10 bg-opacity-15 bg-gray-400 relative'>
            <button
                className="peer text-center px-2 font-medium mx-5 py-2 text-xl cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {Catagories}
            </button>
            <IoIosArrowDropdown className="mt-3 cursor-pointer" size={22} />

            {showDropdown && (
                <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-lg p-2 mt-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Dropdown items */}
                    <h2 onClick={() => handleItemClick("Mobile")} className="text-xl px-10 mt-1 cursor-pointer">Mobile</h2>
                    <h2 onClick={() => handleItemClick("Laptop")} className="text-xl px-10 mt-1 cursor-pointer">Laptop</h2>
                    <h2 onClick={() => handleItemClick("Car")} className="text-xl px-10 mt-1 cursor-pointer">Car</h2>
                    <h2 onClick={() => handleItemClick("House")} className="text-xl px-10 mt-1 cursor-pointer">House</h2>
                    <h2 onClick={() => handleItemClick("Rent")} className="text-xl px-10 mt-1 cursor-pointer">Rent</h2>
                    <h2 onClick={() => handleItemClick("Properties")} className="text-xl px-10 mt-1 cursor-pointer">Properties</h2>
                    <h2 onClick={() => handleItemClick("Shoes")} className="text-xl px-10 mt-1 cursor-pointer">Shoes</h2>
                </div>
            )}
                    <h2 onClick={() => handleItemClick("Cars")} className="text-xl px-10 mt-1 cursor-pointer">Cars</h2>
                    <h2 onClick={() => handleItemClick("Bikes")} className="text-xl px-10 mt-1 cursor-pointer">Bikes</h2>
                    <h2 onClick={() => handleItemClick("Properties")} className="text-xl px-10 mt-1 cursor-pointer">Properties</h2>
                    <div className="ml-auto">
        {user?.email? (
          <button onClick={() => Navigate('/Profile')} className="text-xl font-semibold mr-3 px-3 border border-black py-1">
            Profile
          </button>
        ) : (
          <button onClick={() => Navigate('/login')} className="text-xl font-semibold mr-3 px-3 border border-black py-1">
            Profile
          </button>
        )}
      </div>
        </div>
    )
}

export default Catagory;
