import '@fontsource/inter';
import '@fontsource/inter/600.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function LandingPage_Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { fordevelopersPage, forbusiness, superchip } = useSelector((store) => store.user);

  // SEO Constants
  const BASE_URL = 'https://superchat.in';
  const PAGE_TITLE = 'SuperChat LLC - AI-Powered Communication Platform';
  const PAGE_DESCRIPTION = 'SuperChat LLC offers cutting-edge AI solutions for developers and businesses. Experience our revolutionary Super Chip technology for enhanced communication and automation.';

  // Schema markup for organization
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SuperChat LLC",
    "url": BASE_URL,
    "logo": `${BASE_URL}/assets/superchat_logo.webp`,
    
    "offers": [
      {
        "@type": "Offer",
        "name": "Developer Tools",
        "description": "Advanced AI tools and APIs for developers"
      },
      {
        "@type": "Offer",
        "name": "Business Solutions",
        "description": "Enterprise-grade AI communication solutions"
      }
    ]
  };
  const toggleMenu=()=>{
    setIsMenuOpen(!isMenuOpen)

  }
  const dropdown=()=>{
    setIsMenuOpen(false);
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content="SuperChat LLC, AI communication platform, developer tools, business solutions, Super Chip technology, enterprise AI, communication automation, AI APIs" />
        <meta name="author" content="SuperChat LLC" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:site_name" content="SuperChat LLC" />
        <meta property="og:image" content={`${BASE_URL}/assets/superchat_logo.png`} />
        
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <header className="flex justify-between items-center h-[60px] bg-slate-50 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" aria-label="Superchat LLC Home">
            <span
              className="sm:text-[22px] text-xl font-inter font-semibold  cursor-pointer  bg-gradient-to-r 
              from-[#6F036C] to-[#FF6F61] bg-clip-text text-transparent"
            >
              Superchat LLC
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-custom-purple text-[18px] font-medium">
          <Link to="/fordevelopers" aria-label="For Developers">
            <span className={`hover:underline cursor-pointer ${fordevelopersPage && 'underline'}`}>For Developers</span>
          </Link>
          <Link to="/forbusiness" aria-label="For Businesses">
            <span className={`hover:underline cursor-pointer ${forbusiness && 'underline'}`}>For Businesses</span>
          </Link>
          <Link to="/superchip" aria-label="Super Chip">
            <span className={`hover:underline cursor-pointer ${superchip && 'underline'}`}>Super Chip</span>
          </Link>
        </nav>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="text-custom-purple text-[24px]"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            &#9776;
          </button>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-[60px] right-0 w-full bg-white shadow-lg flex flex-col items-center space-y-4 p-4 md:hidden">
            <Link to="/fordevelopers" aria-label="For Developers">
              <span
                className={`hover:underline cursor-pointer text-custom-purple text-[18px] ${fordevelopersPage && 'underline'}`}
                onClick={dropdown}
              >
                For Developers
              </span>
            </Link>
            <Link to="/forbusiness" aria-label="For Businesses">
              <span
                className={`hover:underline cursor-pointer text-custom-purple text-[18px] ${forbusiness && 'underline'}`}
                onClick={dropdown}
              >
                For Businesses
              </span>
            </Link>
            <Link to="/superchip" aria-label="Super Chip">
              <span
                className={`hover:underline cursor-pointer text-custom-purple text-[18px] ${superchip && 'underline'}`}
                onClick={dropdown}
              >
                Super Chip
              </span>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}