import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { HiMenuAlt3, HiX, HiUserCircle } from "react-icons/hi"; // Naya icon add kiya

const Navbar = () => {
  const { user, logoutUser, url } = useContext(StoreContext); // url context se liya
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const activeStyle = "text-orange-600 font-semibold border-b-2 border-orange-600 pb-1";
  const idleStyle = "text-gray-600 hover:text-orange-500 transition-all duration-300 pb-1";

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          

          <Link to="/" className="flex items-center gap-2 group">
            <img src={assets.logo} alt="Logo" className="w-10 group-hover:rotate-12 transition-transform duration-300" />
            <p className="text-2xl tracking-tight text-gray-800">
              Blog <span className="font-bold text-orange-600">Ora</span>
            </p>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => (isActive ? activeStyle : idleStyle)}
              >
                {link.name}
              </NavLink>
            ))}
          </ul>


          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
       
                <Link to="/profile" className="flex items-center gap-2 group">
                  {user.image ? (
                    <img 
                      src={`${url}/images/${user.image}`} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-orange-500 transition-all"
                    />
                  ) : (
                    <HiUserCircle size={35} className="text-gray-400 group-hover:text-orange-500 transition-all" />
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all active:scale-95"
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={logoutUser}
                  className="border border-orange-500 text-orange-600 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-orange-50 transition-all active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 text-white px-7 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 transition-all active:scale-95"
              >
                Sign In
              </Link>
            )}
          </div>


          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none p-2"
            >
              {isMenuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-2">
           
            {user && (
              <Link 
                to="/profile" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4"
              >
                <img 
                  src={user.image ? `${url}/images/${user.image}` : assets.profile_icon} 
                  className="w-10 h-10 rounded-full object-cover" 
                  alt=""
                />
                <div>
                  <p className="font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </Link>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
               {user ? (
                 <>
                   <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-center bg-gray-900 text-white py-3 rounded-xl">Dashboard</Link>
                   <button onClick={() => {logoutUser(); setIsMenuOpen(false)}} className="text-center border border-orange-500 text-orange-600 py-3 rounded-xl">Logout</button>
                 </>
               ) : (
                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center bg-orange-600 text-white py-3 rounded-xl">Sign In</Link>
               )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;