import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from "../../assets/images/logo.png";
export default function Navbar() {
  const { userData, setUserData, userRole } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [openTabs, setOpenTabs] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);

  const logOut = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <nav className="fixed top-0 w-full z-50 bg-white text-black border-gray-200 dark:text-white shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} width={120} alt="Logo" />
        </Link>

        {/* Desktop Tabs */}
        {userData && (
          <ul className="hidden lg:flex font-medium space-x-8 text-black">
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to=""> Home</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="favorites">Favorites</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="products">Products</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="categories">Categories</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="User-orders">My Orders</NavLink>
            </li>
            {userRole === "Admin" && (
              <li>
                <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="all-orders">Orders</NavLink>
              </li>
            )}
            {userRole === "Admin" && (
              <li>
                <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="all-users">All Users</NavLink>
              </li>
            )}
            <li className="relative">
              <NavLink to="cart">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={numOfCartItems} color="secondary">
                    <ShoppingCartIcon color="info" fontSize="medium" />
                  </StyledBadge>
                </IconButton>
              </NavLink>
            </li>
          </ul>
        )}

        {!userData && (
          <ul className="hidden lg:flex font-medium space-x-8 text-black">
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="">Home</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="products">Products</NavLink>
            </li>
            <li>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7] transition" to="categories">Categories</NavLink>
            </li>
          </ul>
        )}

        {/* Desktop Social + Auth */}
        <div className="hidden lg:flex items-center space-x-5 text-black">
          <div className="flex space-x-4 text-lg text-black">
            <a
              href="https://wa.me/201070606009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab text-2xl fa-whatsapp cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 animate-pulse hover:scale-125 transition-transform"></i>
            </a>
            {/* <i className="hover:scale-110 fab fa-instagram cursor-pointer hover:text-pink-500 hover:drop-shadow-[0_0_10px_#ec4899] transition"></i>
            <i className="hover:scale-110 fab fa-facebook-f cursor-pointer hover:text-blue-500 hover:drop-shadow-[0_0_10px_#3b82f6] transition"></i>
            <i className="hover:scale-110 fab fa-tiktok cursor-pointer hover:text-gray-500 hover:drop-shadow-[0_0_10px_#6b7280] transition"></i>
            <i className="hover:scale-110 fab fa-twitter cursor-pointer hover:text-sky-500 hover:drop-shadow-[0_0_10px_#0ea5e9] transition"></i>
            <i className="hover:scale-110 fab fa-linkedin-in cursor-pointer hover:text-blue-700 hover:drop-shadow-[0_0_10px_#2563eb] transition"></i>
            <i className="hover:scale-110 fab fa-youtube cursor-pointer hover:text-red-600 hover:drop-shadow-[0_0_10px_#dc2626] transition"></i> */}
          </div>
          {userData ? (
            <button
              onClick={logOut}
              className="hover:scale-105 text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 hover:drop-shadow-[0_0_10px_#ef4444] transition"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7]" to="login">Login</NavLink>
              <NavLink className="hover:text-purple-500 hover:drop-shadow-[0_0_8px_#a855f7]" to="register">Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menus */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Tabs Dropdown */}
          <div className="relative">
            <button onClick={() => setOpenTabs(!openTabs)} className="p-2 rounded-md bg-purple-600 text-white">
              <i className="fa-solid fa-bars"></i>
            </button>
            {openTabs && userData && (
              <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-slideDown">
                <li><NavLink to="" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Home</NavLink></li>
                <li><NavLink to="favorites" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Favorites</NavLink></li>
                <li><NavLink to="products" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Products</NavLink></li>
                <li><NavLink to="categories" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Categories</NavLink></li>
                <li><NavLink to="User-orders" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">My Orders</NavLink></li>
                {userRole === "Admin" && <li><NavLink to="all-orders" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Orders</NavLink></li>}
                {userRole === "Admin" && <li><NavLink to="all-users" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">All Users</NavLink></li>}
                <li className="relative">
                  <NavLink to="cart">
                    <IconButton aria-label="cart">
                      <StyledBadge badgeContent={numOfCartItems} color="secondary">
                        <ShoppingCartIcon color="info" fontSize="medium" />
                      </StyledBadge>
                    </IconButton>
                  </NavLink>
                </li>
              </ul>
            )}

            {openTabs && !userData && (
              <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-slideDown">
                <li><NavLink to="" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Home</NavLink></li>
                <li><NavLink to="products" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Products</NavLink></li>
                <li><NavLink to="categories" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Categories</NavLink></li>
              </ul>
            )}
          </div>

          {/* Social + Logout Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenSocial(!openSocial)}
              className="p-2 rounded-md bg-gray-600 text-white"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
            {openSocial && (
              <ul className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-slideDown">
                <li className="flex justify-around py-2 text-lg">
                  <i className="fab fa-instagram hover:text-pink-500"></i>
                  <i className="fab fa-facebook-f hover:text-blue-500"></i>
                  <i className="fab fa-tiktok hover:text-gray-500"></i>
                  <i className="fab fa-twitter hover:text-sky-500"></i>
                  <i className="fab fa-linkedin-in hover:text-blue-700"></i>
                  <i className="fab fa-youtube hover:text-red-600"></i>
                </li>
                {userData ? (
                  <li>
                    <button onClick={logOut} className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-b-lg">
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li><NavLink to="login" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Login</NavLink></li>
                    <li><NavLink to="register" className="block px-4 py-2 hover:bg-purple-100 dark:hover:bg-purple-700">Register</NavLink></li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
      `}</style>
    </nav>
  );
}
