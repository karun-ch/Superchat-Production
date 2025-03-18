import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxStateManagement/authslice";
import { useNavigate } from "react-router-dom";
import {
 
  FaUserCircle,
  FaRegTrashAlt,
  FaRegMoon,
  FaRegSun,
  FaRegUserCircle,
 
  FaGlobe,
 
  FaHeadset,
} from "react-icons/fa";
import superchatLogo from "../assets/superchat_logo.webp";
import { changesidebarwidth, changetodarkmode } from "../ReduxStateManagement/user";
import {toggleChatbot,toggleTranslate} from '../ReduxStateManagement/chatbot';
import { clear_chat_api } from "../Utils/Apis";
import superchatLogo_white from "../assets/superchat_logo_white.webp";
import { useState } from "react";

const Sidebar = () => {
  const { darkmode, sidebarReduced } = useSelector((store) => store.user);
  const {chatbot,translate} = useSelector(store =>store.bot);

  const [isDeleting, setIsdeleting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(changesidebarwidth());
  };

  const handleTranslate = () =>{
    dispatch (toggleChatbot(false))
    dispatch(toggleTranslate(true))
  }
  
  const handlechatbot = ()=>{
    dispatch (toggleChatbot(true))
    dispatch(toggleTranslate(false))
  }

  const menuItemClass = () =>
    `p-2 rounded-full flex items-center cursor-pointer ${
      sidebarReduced
        ? "justify-center bg-gray-700 text-white"
        : ` gap-2 hover:bg-gray-300 ${
            darkmode ? "hover:bg-gray-600 text-white" : "text-gray-600"
          }`
    }`;

  const tooltipClass = `absolute left-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm rounded-md px-2 py-1 whitespace-nowrap`;

  const handleclearconversations = async () => {
    setIsdeleting(true);
    try {
      const resp = await fetch(clear_chat_api, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
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
      setIsdeleting(false);
    } catch (e) {
      alert(e);
      setIsdeleting(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("messages");
    navigate("/signup");
  };

  const handleThemeToggle = () => {
    const isdarkmode = localStorage.getItem("darkmode");
    if (isdarkmode) {
      localStorage.removeItem("darkmode");
      dispatch(changetodarkmode(false));
    } else {
      localStorage.setItem("darkmode", true);
      dispatch(changetodarkmode(true));
    }
  };

  return (
    <aside
      aria-label="Main Navigation Sidebar"
      className={`${
        darkmode ? "bg-[#3A3B3C] text-white" : "bg-[#777777] bg-opacity-5 text-gray-900"
      } h-screen flex flex-col ${
      //   sidebarReduced ? "w-20" : "w-[230px]"
      // } fixed top-0 left-0 z-10`}
      sidebarReduced ? "w-16" : "w-[230px]"
      } fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out`}
    >
      {/* Logo and Brand Section */}
      <header className="flex flex-col items-center p-4" role="banner">
        {sidebarReduced ? (
          <img
            src={darkmode ? superchatLogo_white : superchatLogo}
            alt="Superchat LLC Logo"
            className="w-10 h-10 ml-4 mt-4"
            width="40"
            height="40"
            loading="eager"
          />
        ) : (
          <h1 
            className={`text-xl font-[250px] pt-7 ml- bg-gradient-to-r ${
              darkmode ? "from-[#F5EEF8] to-[#D0D3D4]" : "from-[#6F036C] to-[#FF6F61]"
            } bg-clip-text text-transparent`}
          >
            Superchat LLC
          </h1>
        )}
      </header>

      {/* Navigation Menu */}
      <nav className="flex flex-col items-start px-4 mt-auto mb-4" role="navigation">
        <ul className="w-full " role="menu">
          {/*AI assiatnt */}
          <li className="relative group" role="none">
            <button
              className={menuItemClass()}
              onClick={handlechatbot}
              role="menuitem"
              aria-label="Ai assistant"
              title="Ai assistant"
            >
              <FaHeadset aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span className={`${chatbot ? "underline" : ""} `}>AI Assistant</span>}
            </button>
            {sidebarReduced && <div className={tooltipClass} role="tooltip">AI Assistant</div>}
          </li>

          {/* Translate */}
          <li className="relative group" role="none">
            <button
              className={menuItemClass()}
              onClick={handleTranslate}
              role="menuitem"
              aria-label="Translate"
              title="Translator"
            >
              <FaGlobe aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span className={`${translate ? "underline" : ""} `}>Translator</span>}
            </button>
            {sidebarReduced && <div className={tooltipClass} role="tooltip">Translator</div>}
          </li>

          {/* Theme Toggle */}
          <li className="relative group" role="none">
            <button
              onClick={handleThemeToggle}
              className={menuItemClass()}
              role="menuitem"
              aria-label={darkmode ? "Switch to Light Theme" : "Switch to Dark Theme"}
              title={darkmode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {darkmode ? <FaRegSun aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
              {!sidebarReduced && (
                <span>{darkmode ? "Light Theme" : "Dark Theme"}</span>
              )}
            </button>
            {sidebarReduced && <div className={tooltipClass} role="tooltip">{darkmode ? "Light Theme" : "Dark Theme"}</div>}
          </li>

          {/* Clear Conversations */}
          <li className="relative group" role="none">
            <button
              className={menuItemClass()}
              onClick={handleclearconversations}
              role="menuitem"
              aria-label="Clear all conversations"
              disabled={isDeleting}
              title="Clear all conversations"
            >
              <FaRegTrashAlt aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span>Clear Conversations</span>}
              {isDeleting && <span className="sr-only">Clearing conversations...</span>}
            </button>
            {sidebarReduced && <div className={tooltipClass} role="tooltip">Clear Conversations</div>}
          </li>

          {/* Logout */}
          <li className="relative group" role="none">
            <button
              onClick={handleLogout}
              className={`${sidebarReduced ? "" : "ml-2"} flex gap-2 items-center justify-center cursor-pointer ${
                darkmode ? "text-white hover:text-red-800" : "text-gray-500 hover:text-red-700"
              }`}
              role="menuitem"
              aria-label="Log out of your account"
              title="Log out"
            >
              {sidebarReduced ? (
                <>
                  <FaUserCircle aria-hidden="true" />
                  <div className={tooltipClass} role="tooltip">Logout</div>
                </>
              ) : (
                <>
                  <FaRegUserCircle aria-hidden="true" className="text-lg" />
                  <span>Log out</span>
                </>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;