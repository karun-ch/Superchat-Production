import { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { PiPaperclipBold } from "react-icons/pi";
import { BsChatText } from "react-icons/bs";
import { GrDocument, GrDocumentCsv, GrDocumentPdf } from "react-icons/gr";
import { FaMicrophone, FaRedoAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import superchatLogo from "../assets/superchat_logo.webp";
import Chatbot_Message from "./Chatbot_message";
// import { ask_csv, ask_pdf, Chat_api, pdf_upload_api } from "../Utils/Apis";
import { ask_doc, Chat_api, doc_upload_api } from "../Utils/Apis";
import { Capabilities, questionSets } from "../Utils/constants";
import { logout } from "../ReduxStateManagement/authslice";
import superchatLogo_white from "../assets/superchat_logo_white.webp";
import RenderLogo from "./BotInterface_components/RenderLogo";
import { changeVoiceMode } from "../ReduxStateManagement/user";
import { Helmet } from 'react-helmet-async';

const BotInterface = () => {
  const seoMetadata = {
    title: "Superchat AI Assistant - Intelligent Conversation Interface",
    description: "Engage with our AI-powered chat assistant for intelligent conversations, PDF analysis, and CSV data processing. Experience seamless communication with advanced natural language processing.",
    keywords: "AI chat, PDF analysis, CSV processing, chatbot, artificial intelligence, document analysis"
  };

  // Existing hooks and state management
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkmode, sidebarReduced } = useSelector((store) => store.user);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const [activeToggle, setActiveToggle] = useState("chat");
  const [chatStarted, setChatStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [selectedSet] = useState(() => {
    const randomIndex = Math.floor(Math.random() * questionSets.length);
    return questionSets[randomIndex];
  });

  if (!localStorage.getItem("token")) {
    navigate("/signup");
  }

  // Utility Functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);
    setChatStarted(savedMessages.length > 0);
  }, []);
  

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handlevoice = () => {
    dispatch(changeVoiceMode(true));
  };

  // Chat Handlers
  const handleChat = async (userMessage) => {
    if (!userMessage.trim()) return;

    const endpoint = activeToggle === "chat" ? Chat_api : ask_doc;

    try {
      setMessages((prev) => [
        ...prev,
        { type: "user", content: userMessage },
        { type: "bot", content: "", isLoading: true },
      ]);
      setIsLoading(true);
      localStorage.setItem('RegenerateMessage', '');
      localStorage.setItem('Error', false);
      const token = localStorage.getItem("token");
      setMessage('');

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: userMessage, response_length: "short", target_lang: 'en' }),
      });

      const data = await response.json();
      if (data.message) {
        dispatch(logout());
        localStorage.removeItem("messages");
        navigate("/signup");
      }

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { ...msg, content: data.response, isLoading: false }
            : msg
        )
      );
      setChatStarted(true);
      setMessage('');

    } catch (error) {
      localStorage.setItem('RegenerateMessage', userMessage);
      localStorage.setItem('Error', true);
      setMessage('');

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? { isLoading: false }
            : msg
        )
      );
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          content: "Error sending message. Please try again.",
        },
      ]);
      setChatStarted(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // File Handling
  // const handleFile = (fileType) => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.accept =
  //       fileType === "image" ? "image/*" : fileType === "pdf" ? ".pdf" : ".csv";
  //     fileInputRef.current.click();
  //   }
  // };

  const handleFile = (fileType) => {
    const fileTypes = {
      image: "image/*",
      pdf: ".pdf",
      csv: ".csv"
    };
    if (fileInputRef.current) {
      fileInputRef.current.accept = fileTypes[fileType] || "";
      fileInputRef.current.click();
    }
  };


  const handleFileUpload = async (event) => {
    setMessage('');
    localStorage.setItem('RegenerateMessage', '');
    localStorage.setItem('Error', false);


    // localStorage.clear(); // Clear unnecessary values at once
    
    const file = event.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append('files', file);

    try {
      setMessages((prev) => [
        ...prev,
        { type: "user", content: `Uploading ${file.name}...` },
        { type: "bot", content: "", isLoading: true },
      ]);
      setIsLoading(true);

      const uploadResponse = await fetch(doc_upload_api, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await uploadResponse.json();
      
      if (data.message) {
        dispatch(logout());
        localStorage.removeItem("messages");
        navigate("/signup");
      }

      if (!uploadResponse.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1
            ? {
              ...msg,
              content: data.response || `Successfully uploaded ${file.name}`,
              isLoading: false
            }
            : msg
        )
      );
      setChatStarted(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("File upload error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -2),
        {
          type: "system",
          content: `Error uploading file: ${error.message}. Please try again.`,
        },
      ]);
    } finally {
      setIsLoading(false);
      setShowFileMenu(false);
    }
  };

  const fileMenuItems = [
    { type: "doc", label: "Upload Document", icon: <GrDocument className="inline mr-2" aria-hidden="true" /> }
  ];

  const renderFileMenu = () => (
    <div
    role="menu"
    aria-label="File upload options"
    className={`absolute left-0 bottom-full mb-2 w-40 rounded-md shadow-md ${
      darkmode ? "bg-[#3A3A3A] text-gray-300" : "bg-gray-100 text-black"
    }`}
  >
    {/* <button
      role="menuitem"
      aria-label="Upload Document"
      className={`p-2 text-left w-full ${
        darkmode
          ? "text-white hover:bg-[#4A4A4A]"
          : "text-black hover:bg-gray-300"
      }`}
      // onClick={handleDocUpload}
      onClick={() => handleFile("doc")}

    >
      <GrDocument className="inline mr-2" aria-hidden="true" />
      Upload Document
    </button> */}
    
    {fileMenuItems.map(({ type, label, icon }) => (
      <button
        key={type}
        role="menuitem"
        aria-label={label}
        className={`p-2 text-left w-full ${darkmode ? "text-white hover:bg-[#4A4A4A]" : "text-black hover:bg-gray-300"}`}
        onClick={() => handleFile(type)}
      >
        {icon} {label}
      </button>
    ))}
  </div>
  );

 // ... (previous imports and initial code remains the same until renderInputArea)

const renderInputArea = () => (
  <footer className="fixed bottom-4 w-full flex justify-center">
    <div className="relative flex items-center w-[95%] max-w-4xl bg-opacity-90 mb-10">
    <div 
        className={`flex items-center w-full px-4 py-2 rounded-full shadow-lg ${
          darkmode 
            ? "bg-[#3A3B3C] text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {/* File Attachment Button */}
        <button
          aria-label="Attach file"
          aria-expanded={showFileMenu}
          className="p-2 rounded-full flex items-center justify-center mr-2"
          onClick={() => setShowFileMenu(!showFileMenu)}
        >
          <PiPaperclipBold className={`w-5 h-5 ${
            darkmode ? "text-white hover:bg-[#4A4A4A]" : "text-gray-600 hover:bg-gray-300"
          }`} aria-hidden="true" />
        </button>

        {/* File Menu */}
        {showFileMenu && renderFileMenu()}

        {/* Chat Input */}
        <textarea
          aria-label="Chat input"
          role="textbox"
          value={message}
          placeholder="Message Super Chat"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleChat(message);
            }
          }}
          className="w-full resize-none bg-transparent focus:outline-none text-base placeholder-gray-400"
          rows={1}
        />

        {/* Voice Input Button */}
        <button
          aria-label="Toggle voice input"
          className="p-2 rounded-full flex items-center justify-center mx-2"
          onClick={handlevoice}
        >
          <FaMicrophone className={`w-4 h-5 ${
            darkmode ? "text-white hover:bg-[#4A4A4A]" : "text-gray-700 hover:bg-gray-200"
          }`} aria-hidden="true" />
        </button>

        {/* Send Button */}
        <button
          aria-label="Send message"
          className="p-3 rounded-full flex items-center justify-center"
          onClick={() => handleChat(message)}
        >
          <IoSend className={`w-5 h-5 ${
            darkmode ? "text-white hover:bg-[#4A4A4A]" : "text-gray-700 hover:bg-gray-300"
          }`} aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
);

// ... (rest of the component remains the same)

  // Main Render
  return (
    <>
      <Helmet>
        <title>{seoMetadata.title}</title>
        <meta name="description" content={seoMetadata.description} />
        <meta name="keywords" content={seoMetadata.keywords} />
        <meta property="og:title" content={seoMetadata.title} />
        <meta property="og:description" content={seoMetadata.description} />
       
        <link rel="canonical" href={"https://superchat.in/chatbot"} />

        <meta property="og:url" content={"https://superchat.in/chatbot"} />
 
      </Helmet>
      
      <main
        className={`pt-14 h-[800px] ${
          sidebarReduced ? "sm:ml-20" : "sm:ml-[230px]"
        } ${darkmode ? "bg-[#2C2C2C]" : "bg-white"} w-full sm:w-auto flex-1 flex flex-col items-center h-screen relative transition-all duration-300 ease-in-out`} // mx-auto
        role="main"
        aria-label="Chat Interface"
      >
        {!chatStarted ? (
          isLoading ? (
            <div 
              className="flex justify-center items-center h-full mt-4 mb-8"
              style={{ width: '100px', height: '100px' }}
              role="status"
              aria-label="Loading chat interface"
            >
              <img
                src={darkmode ? superchatLogo_white : superchatLogo}
                alt="Superchat Logo Loading Animation"
                className="w-[40px] h-[40px] animate-spin"
              />
            </div>
          ) : (
            <>
              <RenderLogo />
              <section 
                // className="grid grid-cols-2 gap-4 mb-20 w-auto px-20 flex-grow"
               className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20 w-auto px-4 sm:px-10 lg:px-20 flex-grow ${
                window.innerWidth < 700 && window.innerHeight < 600 ? "hidden" : ""
              }`}
                style={{ marginTop: "180px" }}
                aria-label="Chat suggestions and capabilities"
              >
                <div className="hidden sm:block">
                  <h3 className={`font-semibold mt-2 ${
                    darkmode ? "text-gray-300" : "text-gray-800"} text-center text-xl`}
                  >
                    Examples
                  </h3>
                  {selectedSet.examples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChat(example)}
                      aria-label={`Try example: ${example}`}
                      className={`block ${
                        darkmode
                          ? "bg-[#3A3A3A] text-gray-300 hover:bg-[#4A4A4A]"
                          : "bg-black text-white hover:bg-[#1A1A1A]"
                      } w-full py-8 pl-4 pr-4 rounded-lg shadow-md mt-3 flex justify-center items-center`}
                      style={{
                        height: "50px",
                        width: "250px",
                        wordWrap: "break-word",
                        textAlign: "center",
                      }}
                    >
                      {example} →
                    </button>
                  ))}
                </div>

                <div className="hidden sm:block">
                  <h3 className={`font-semibold mt-2 
                    ${darkmode ? "text-gray-300" : "text-gray-800"} text-center text-xl`}
                  >
                    Capabilities
                  </h3>
                  {Capabilities.map((capability, idx) => (
                    <div
                      key={idx}
                      className={`block ${
                        darkmode
                          ? "bg-[#3A3A3A] text-gray-300 hover:bg-[#4A4A4A]"
                          : "bg-black text-white hover:bg-[#1A1A1A]"
                      } w-full py-8 pl-4 pr-4 rounded-lg shadow-md mt-3 flex justify-center items-center`}
                      style={{
                        height: "50px",
                        width: "250px",
                        wordWrap: "break-word",
                        textAlign: "center",
                      }}
                      role="listitem"
                      aria-label={`Capability: ${capability}`}
                    >
                      {capability}
                    </div>
                  ))}
                </div>
              </section>
            </>
          )
        ) : (
          <section 
            className="flex-1 w-full overflow-y-auto p-4 mb-32"
            role="log"
            aria-label="Chat messages"
          >
            {messages.map((msg, index) => (
              <Chatbot_Message
                key={index}
                content={msg.content}
                type={msg.type}
                isLoading={msg.isLoading}
              />
            ))}
            <div ref={messagesEndRef} />
            {localStorage.getItem('Error') === 'true' && (
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => handleChat(localStorage.getItem('RegenerateMessage'))}
                  aria-label="Regenerate response"
                  className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                    darkmode 
                      ? "bg-[#4A4A4A] text-white hover:bg-[#5A5A5A]" 
                      : "bg-slate-700 text-gray-100 hover:bg-gray-500"
                  }`}
                >
                  <FaRedoAlt aria-hidden="true" />
                  Regenerate
                </button>
              </div>
            )}
          </section>
        )}

        {renderInputArea()}

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileUpload}
          aria-label="File upload input"
        />
      </main>
    </>
  );
};

export default BotInterface;