import '@fontsource/inter';
import '@fontsource/inter/600.css';
import { useState } from 'react';
import {
 
  FaRegSun,
  FaRegMoon,
  FaRegTrashAlt,
  FaRegUserCircle,
} from 'react-icons/fa';
import superchatLogo from '../assets/superchat_logo.webp';
import superchatLogo_white from "../assets/superchat_logo_white.webp";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../ReduxStateManagement/authslice';
import { useNavigate } from 'react-router-dom';
import { changetodarkmode } from '../ReduxStateManagement/user';
import { clear_chat_api } from '../Utils/Apis';

export default function ChatbotHeaderSmallScreen() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { darkmode, sidebarReduced } = useSelector((store) => store.user);
  const [isDeleting, setIsdeleting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSidebarToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItemClass = () =>
    `p- rounded-full flex items-center cursor-pointer ${
      sidebarReduced
        ? 'justify-center bg-gray-700 text-white'
        : `gap-2 hover:bg-gray-300 ${
            darkmode ? 'hover:bg-gray-600 text-white' : 'text-gray-600'
          }`
    }`;

  const handleClearConversations = async () => {
    setIsdeleting(true);
    try {
      const resp = await fetch(clear_chat_api, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await resp.json();
      if (data.message === 'Token has expired!') {
        dispatch(logout());
        localStorage.removeItem("messages");
        navigate("/signup");
        return;
      }
      localStorage.removeItem('messages');
      window.location.reload();
      alert('Conversations cleared successfully');
    } catch (e) {
      alert(e);
    } finally {
      setIsdeleting(false);
    }
  };

  const handleThemeToggle = () => {
    const isDarkMode = localStorage.getItem('darkmode');
    if (isDarkMode) {
      localStorage.removeItem('darkmode');
      dispatch(changetodarkmode(false));
    } else {
      localStorage.setItem('darkmode', true);
      dispatch(changetodarkmode(true));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('messages');
    navigate('/signup');
  };

  return (
    <header 
      className={`fixed z-10 w-full ${
        darkmode ? "bg-[#3A3B3C] text-white" : "bg-gray-300 text-gray-900"
      }`}
      role="banner"
    >
      <div className="flex justify-between items-center h-[60px] px-4">
        {/* Brand Name */}
        <h1 
          className={`text-xl font-bold bg-gradient-to-r ${
            darkmode ? "from-[#F5EEF8] to-[#D0D3D4]" : "from-[#6F036C] to-[#FF6F61E5]"
          } bg-clip-text text-transparent`}
        >
          Superchat LLC
        </h1>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden flex items-center ${
            darkmode ? "text-white" : "text-custom-purple"
          } text-[24px]`}
          onClick={handleSidebarToggle}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span aria-hidden="true">&#9776;</span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className={`${
            darkmode ? 'bg-[#3A3B3C] text-white' : 'bg-gray-300 text-gray-900'
          } h-screen fixed top-0 left-0 z-10 w-[230px]`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            {/* Logo Section */}
            <div className="flex justify-center mt-4" role="banner">
              <img 
                src={darkmode ? superchatLogo_white : superchatLogo}
                alt="Superchat LLC Logo"
                className="w-10 h-10"
                width="40"
                height="40"
                loading="eager"
              />
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col items-start px-4 mt-4" role="navigation">
              <ul className="w-full space-y-4" role="menu">

              <li role="none">
                  <button
                    onClick={handleThemeToggle}
                    className={menuItemClass()}
                    role="menuitem"
                    aria-label={darkmode ? "Switch to light theme" : "Switch to dark theme"}
                  >
                    {darkmode ? <FaRegSun aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
                    <span className={darkmode ? "text-white" : "text-black"}>
                      {darkmode ? "Light Theme" : "Dark Theme"}
                    </span>
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={handleThemeToggle}
                    className={menuItemClass()}
                    role="menuitem"
                    aria-label={darkmode ? "Switch to light theme" : "Switch to dark theme"}
                  >
                    {darkmode ? <FaRegSun aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
                    <span className={darkmode ? "text-white" : "text-black"}>
                      {darkmode ? "Light Theme" : "Dark Theme"}
                    </span>
                  </button>
                </li>
                
                {/* Theme Toggle */}
                <li role="none">
                  <button
                    onClick={handleThemeToggle}
                    className={menuItemClass()}
                    role="menuitem"
                    aria-label={darkmode ? "Switch to light theme" : "Switch to dark theme"}
                  >
                    {darkmode ? <FaRegSun aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
                    <span className={darkmode ? "text-white" : "text-black"}>
                      {darkmode ? "Light Theme" : "Dark Theme"}
                    </span>
                  </button>
                </li>

                {/* Clear Conversations */}
                <li role="none">
                  <button
                    onClick={handleClearConversations}
                    className={menuItemClass()}
                    role="menuitem"
                    aria-label="Clear all conversations"
                    disabled={isDeleting}
                  >
                    <FaRegTrashAlt aria-hidden="true" />
                    <span className={darkmode ? "text-white" : "text-black"}>
                      Clear Conversations
                    </span>
                    {isDeleting && <span className="sr-only">Clearing conversations...</span>}
                  </button>
                </li>

                {/* Logout */}
                <li role="none">
                  <button
                    onClick={handleLogout}
                    className={`ml- text-lg flex gap-2 items-center justify-center cursor-pointer ${
                      darkmode
                        ? 'text-white hover:text-red-800'
                        : 'text-gray-800 hover:text-red-700'
                    }`}
                    role="menuitem"
                    aria-label="Log out of your account"
                  >
                    <FaRegUserCircle aria-hidden="true" className="text-2xl" />
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </nav>
      )}
    </header>
  );
}