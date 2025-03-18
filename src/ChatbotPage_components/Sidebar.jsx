import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxStateManagement/authslice";
import { useNavigate } from "react-router-dom";
import {
  FaHeadset,
  FaGlobe,
  FaRegMoon,
  FaRegSun,
  FaRegTrashAlt,
  FaHistory,
  FaRegUserCircle,
} from "react-icons/fa";
import superchatLogo from "../assets/superchat_logo.webp";
import { changesidebarwidth, changetodarkmode } from "../ReduxStateManagement/user";
import { toggleChatbot, toggleTranslate } from '../ReduxStateManagement/chatbot';
import { clear_chat_api, get_chat_api } from "../Utils/Apis";
import superchatLogo_white from "../assets/superchat_logo_white.webp";

const Sidebar = () => {
  const { darkmode, sidebarReduced } = useSelector((store) => store.user);
  const { chatbot, translate } = useSelector(store => store.bot);

  const [isDeleting, setIsdeleting] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); // State for toggling chat history view
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(changesidebarwidth());
  };

  const handleTranslate = () => {
    dispatch(toggleChatbot(false));
    dispatch(toggleTranslate(true));
  }

  const handleChatbot = () => {
    dispatch(toggleChatbot(true));
    dispatch(toggleTranslate(false));
  }

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

  const handleRecoverConversations = async () => {
    setIsRecovering(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        navigate("/signup");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      };

      const resp = await fetch(`${get_chat_api}`, {
        method: "GET",
        headers: headers,
        credentials: "include",
      });

      if (!resp.ok) {
        throw new Error(`Failed to fetch chat history: ${resp.status} ${resp.statusText}`);
      }

      const data = await resp.json();

      if (data.message === "Token has expired!") {
        dispatch(logout());
        localStorage.removeItem("messages");
        navigate("/signup");
        return;
      }

      if (data.chat_history) {
        setChatHistory(data.chat_history);
      } else {
        alert("No conversations found to recover.");
      }
    } catch (error) {
      alert(`Error recovering conversations: ${error.message}`);
    } finally {
      setIsRecovering(false);
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

  const menuItemClass = () =>
    `p-2 rounded-full flex items-center cursor-pointer ${
      sidebarReduced
        ? "justify-center bg-gray-700 text-white"
        : ` gap-2 hover:bg-gray-300 ${
            darkmode ? "hover:bg-gray-600 text-white" : "text-gray-600"
          }`
    }`;

  // Toggle chat history visibility
  const toggleHistoryVisibility = () => {
    if (!isHistoryVisible) {
      handleRecoverConversations(); // Load history when opening
    }
    setIsHistoryVisible(!isHistoryVisible); // Toggle visibility
  };

  return (
    <aside
      aria-label="Main Navigation Sidebar"
      className={`${
        darkmode ? "bg-[#3A3B3C] text-white" : "bg-[#777777] bg-opacity-5 text-gray-900"
      } h-screen flex flex-col ${sidebarReduced ? "w-16" : "w-[230px]"} fixed top-0 left-0 z-10 transition-all duration-300 ease-in-out`}
    >
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
          <h1 className={`text-xl font-[250px] pt-7 ml- bg-gradient-to-r ${darkmode ? "from-[#F5EEF8] to-[#D0D3D4]" : "from-[#6F036C] to-[#FF6F61]"} bg-clip-text text-transparent`}>
            Superchat LLC
          </h1>
        )}
      </header>

      <nav className="flex flex-col items-start px-4 mt-auto mb-4" role="navigation">
        <ul className="w-full" role="menu">
          {/* AI Assistant */}
          <li className="relative group">
            <button className={menuItemClass()} onClick={handleChatbot} role="menuitem" aria-label="Ai assistant" title="Ai assistant">
              <FaHeadset aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span className={`${chatbot ? "underline" : ""}`}>AI Assistant</span>}
            </button>
          </li>

          {/* Translate */}
          <li className="relative group">
            <button className={menuItemClass()} onClick={handleTranslate} role="menuitem" aria-label="Translate" title="Translator">
              <FaGlobe aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span className={`${translate ? "underline" : ""}`}>Translator</span>}
            </button>
          </li>

          {/* Theme Toggle */}
          <li className="relative group">
            <button onClick={handleThemeToggle} className={menuItemClass()} role="menuitem" aria-label={darkmode ? "Switch to Light Theme" : "Switch to Dark Theme"} title={darkmode ? "Switch to Light Theme" : "Switch to Dark Theme"}>
              {darkmode ? <FaRegSun aria-hidden="true" /> : <FaRegMoon aria-hidden="true" />}
              {!sidebarReduced && <span>{darkmode ? "Light Theme" : "Dark Theme"}</span>}
            </button>
          </li>

          {/* Clear Conversations */}
          <li className="relative group">
            <button className={menuItemClass()} onClick={handleclearconversations} role="menuitem" aria-label="Clear all conversations" disabled={isDeleting} title="Clear all conversations">
              <FaRegTrashAlt aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span>Clear Conversations</span>}
              {isDeleting && <span className="sr-only">Clearing conversations...</span>}
            </button>
          </li>

          {/* Recover Conversations */}
          <li className="relative group">
            <button className={menuItemClass()} onClick={toggleHistoryVisibility} role="menuitem" aria-label="Recover conversations" disabled={isRecovering} title="Recover deleted conversations">
              <FaHistory aria-hidden="true" className="hover:text-gray-950" />
              {!sidebarReduced && <span>History</span>}
              {isRecovering && <span className="ml-2 text-sm text-gray-500 animate-pulse">Recovering...</span>}
            </button>
          </li>

          {/* Logout */}
          <li className="relative group">
            <button onClick={handleLogout} className={`${sidebarReduced ? "" : "ml-2"} flex gap-2 items-center justify-center cursor-pointer ${darkmode ? "text-white hover:text-red-800" : "text-gray-500 hover:text-red-700"}`} role="menuitem" aria-label="Log out of your account" title="Log out">
              <FaRegUserCircle aria-hidden="true" className="text-lg" />
              {!sidebarReduced && <span>Log out</span>}
            </button>
          </li>
        </ul>
      </nav>

      {/* Display chat history when visible */}
      {isHistoryVisible && (
        <div className="chat-history mt-4 px-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((chat, index) => (
              <div key={index} className="chat-item p-3 bg-white shadow-md rounded-lg mb-2">
                <p><strong>User:</strong> {chat.user_message}</p>
                <p><strong>Bot:</strong> {chat.bot_reply}</p>
              </div>
            ))
          ) : (
            <p>No conversations found.</p>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
