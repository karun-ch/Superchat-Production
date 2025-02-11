import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '@fontsource/inter';
import superchatLogo from '../assets/superchat_logo.webp';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage__Left_Container() {
  

  const [dynamicWord, setDynamicWord] = useState('chat');
  const navigate = useNavigate();
  const words = ['chat', 'intelligence', 'fast'];

  // SEO Constants
  const BASE_URL = 'https://superchat.in';
  const PAGE_TITLE = `SuperChat: Accelerate Conversations with AI-Powered ${dynamicWord}`;
  const PAGE_DESCRIPTION = "Experience the future of communication with SuperChat's AI-powered platform. Create code, analyze documents, learn new concepts, and get instant answers. Start your AI journey today!";

  // Schema markup for rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "SuperChat AI Assistant",
    "description": PAGE_DESCRIPTION,
    "image": `${BASE_URL}/assets/superchat_logo.webp`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    },
    "applicationCategory": "BusinessApplication",
    "featureList": [
      "AI-powered chat assistance",
      "Code generation",
      "Document analysis",
      "Document summarization",
      "Image analysis",
      "Educational support"
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicWord((prevWord) => {
        const currentIndex = words.indexOf(prevWord);
        return words[(currentIndex + 1) % words.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleTrysuperchat=()=>{
    navigate('/signup');

  }

  return (
    <section
      className="flex flex-col relative"
      aria-labelledby="superchat-header"
      role="contentinfo"
    >
      <Helmet>
        {/* Primary Meta Tags */}
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content="SuperChat, AI Chatbot, code generation, document analysis, AI assistant, document summarization, AI learning, image analysis, artificial intelligence chat" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={`${BASE_URL}/assets/superchat_logo.webp`} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:site_name" content="SuperChat" />
        
       
        {/* Additional SEO */}
        <link rel="canonical" href={BASE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Logo and Title */}
      <div
        className="absolute flex justify-center items-center gap-0 sm:top-[100px] sm:left-[100px] left-[15px] top-[115px]"
        role="img"
        aria-label="Superchat Logo and Dynamic Title"
      >
        <img
          src={superchatLogo}
          alt="Superchat Logo"
          className="sm:w-auto sm:h-[85px] w-12 h-auto"
        />
        <h1
          id="superchat-header"
          className="font-inter font-[350] py-1 text-left leading-[100px] sm:text-[90px] text-[40px] bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent"
        >
          uper<span className="ml-1 mr-1">{dynamicWord}</span>
        </h1>
      </div>

      {/* Subtitle and Description */}
      <div
        className="absolute sm:top-[220px] sm:left-[99px] top-[205px] left-[15px]"
        role="region"
        aria-labelledby="superchat-subtitle"
      >
        <h2
          id="superchat-subtitle"
          className="sm:text-[24px] text-md font-[400] sm:mb-2"
        >
          Private LLM for your organisation or Intelligence as a Service
        </h2>
        <h1 className=" mt-3 text-base sm:text-lg w-full sm:w-[32rem] text-gray-800 font-light leading-relaxed [text-rendering:optimizeLegibility] max-w-prose">
        Still sharing organisation data to the cloud with existing GPT? Switch to us and have your own private LLM within your organisation. 
        Hardware enabled LLM for your organisation , <Link to={'/contact-us'} className='text-slate-500 font-semibold'> Speak to us today :)</Link>  </h1>
      </div>

      {/* Call-to-Action */}
      <section
        className="absolute pt-10 sm:top-[410px] sm:left-[102px] left-[15px] top-[360px] flex items-center gap-2"
        role="region"
        aria-labelledby="cta-header"
      >
       <h2 id="cta-section-title" className="sr-only">

          Call to Action
        </h2>
        <button
          className="hover:cursor-pointer  sm:text-[20px] text-[18px] font-[500] bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent"
          onClick={toggleTrysuperchat}
          aria-label="Try Superchat now and sign up"
        >
          Try Superchat
        </button>
        <svg
          width="25"
          height="23"
          viewBox="0 0 25 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          aria-label="Arrow icon"
        >
          <path
            d="M7.1684 6C6.89234 6 6.66853 6.22374 6.66853 6.49986C6.66853 6.77592 6.89234 6.99973 7.1684 6.99973H12.2798L2.14921 17.1301C1.95026 17.3291 1.95026 17.6518 2.14921 17.8508C2.34823 18.0497 2.67088 18.0497 2.8699 17.8508L13.0003 7.72053V12.8315C13.0003 13.1075 13.2241 13.3313 13.5001 13.3313C13.7762 13.3313 14 13.1075 14 12.8315V6.49986C14 6.22374 13.7762 6 13.5001 6H7.1684Z"
            fill="#4A0044"
          />
        </svg>
      </section>
    </section>
  );
}