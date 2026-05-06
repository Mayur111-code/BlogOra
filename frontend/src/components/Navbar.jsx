import { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import {
  HiMenuAlt3,
  HiX,
  HiOutlineLightningBolt,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user, logoutUser, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e) => {
      if (!e.target.closest("[data-user-menu]")) setUserMenuOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logoutUser();
    setUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none pt-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center justify-between px-6 py-3 rounded-full border pointer-events-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? "w-[95%] md:w-[85%] lg:w-[75%] bg-white/90 backdrop-blur-xl border-gray-200 shadow-2xl shadow-gray-200/50"
            : "w-[98%] md:w-[90%] bg-white border-gray-100 shadow-sm"
        }`}
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <motion.img
            whileHover={{ rotate: 10, scale: 1.1 }}
            src={assets.logo}
            alt="Blogora logo"
            className="w-8 md:w-10"
          />
          <span className="text-xl font-black tracking-tighter text-gray-900 uppercase hidden sm:block">
            Blog<span className="text-orange-600">Ora</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-full border border-gray-100">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive ? "text-white" : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-orange-600 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" data-user-menu>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 group"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
                aria-label="Open user menu"
              >
                <img
                  src={
                    user.image
                      ? `${url}/images/${user.image}`
                      : assets.profile_icon
                  }
                  className="w-9 h-9 rounded-full border-2 border-orange-100 shadow-sm object-cover"
                  alt="profile"
                  onError={(e) => {
                    e.currentTarget.src = assets.profile_icon;
                  }}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    role="menu"
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <HiOutlineUser size={18} /> Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    >
                      <HiOutlineViewGrid size={18} /> Dashboard
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 border-t border-gray-50"
                    >
                      <HiOutlineLogout size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-full text-[10px] font-black tracking-[0.15em] uppercase hover:bg-orange-600 transition-all shadow-lg active:scale-95"
            >
              Join <HiOutlineLightningBolt size={14} />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2 text-gray-900"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl border border-gray-100 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-black text-gray-900 uppercase tracking-tighter hover:text-orange-600"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-gray-50" />
              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-bold text-gray-700"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="font-bold text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-500 font-bold uppercase tracking-widest text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-orange-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-xl shadow-orange-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
