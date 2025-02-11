import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

export default function LandingPage_Footer() {
  // Define social media profiles with complete information
  const socialMediaProfiles = [
    {
      name: "Facebook",
      path: "M22 12a10 10 0 1 0-11.5 9.91v-7.02h-2.26v-2.89h2.26V9.41c0-2.24 1.34-3.5 3.39-3.5.98 0 2 .07 2.26.1v2.63h-1.56c-1.22 0-1.63.77-1.63 1.55v1.85h2.78l-.44 2.89h-2.34V21.9A10 10 0 0 0 22 12z",
      url: "https://facebook.com/superchat",
      ariaLabel: "Visit Superchat's Facebook page"
    },
    {
      name: "Twitter",
      path: "M19.63 7.1c.01.14.01.28.01.42 0 4.3-3.27 9.25-9.25 9.25-1.84 0-3.55-.54-5-1.46h.47c1.52 0 2.92-.52 4.04-1.39a3.27 3.27 0 0 1-3.06-2.28c.2.03.4.06.6.06.29 0 .58-.04.85-.11a3.26 3.26 0 0 1-2.62-3.2v-.04c.44.24.95.39 1.5.41a3.26 3.26 0 0 1-1-4.35 9.25 9.25 0 0 0 6.71 3.41 3.26 3.26 0 0 1 5.56-2.97 6.52 6.52 0 0 0 2.07-.79 3.27 3.27 0 0 1-1.43 1.8 6.49 6.49 0 0 0 1.87-.51 6.72 6.72 0 0 1-1.63 1.69z",
      url: "https://twitter.com/superchat",
      ariaLabel: "Follow Superchat on Twitter"
    },
    {
      name: "LinkedIn",
      path: "M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zM8.5 19h-3v-10.5h3v10.5zM7 7c-1 0-1.8-0.8-1.8-1.8 0-1 0.8-1.8 1.8-1.8s1.8 0.8 1.8 1.8c0 1-0.8 1.8-1.8 1.8zM20 19h-3v-5.5c0-3-3.5-2.8-3.5 0v5.5h-3v-10.5h3v1.5c1.4-2.6 6.5-2.8 6.5 2.5v6.5z",
      url: "https://linkedin.com/company/superchat",
      ariaLabel: "Connect with Superchat on LinkedIn"
    }
  ];

  return (
    <>
      <Helmet>
        <meta name="description" content="Access Superchat's essential information, including privacy policy, terms of service, contact details, and customer support. Connect with us on social media for updates." />
        <meta name="keywords" content="Superchat support, customer service, privacy policy, terms of service, contact information, social media, chat support, help center" />
        <meta name="author" content="Superchat Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags for better social sharing */}
        <meta property="og:title" content="Superchat - Customer Support & Information" />
        <meta property="og:description" content="Access Superchat's essential information, including privacy policy, terms of service, contact details, and customer support." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Superchat" />
        
     
        
        {/* Structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Superchat",
            "url": "https://superchat.in",
            "logo": "https://superchat.in/assets/superchat_logo.webp",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "",
              "contactType": "customer service",
              "availableLanguage": ["English", "Hindi"]
            },
            
          })}
        </script>
      </Helmet>

      <footer className="bg-gray-50 text-black py-6 shadow-sm border-gray-200" role="contentinfo" aria-label="Site footer">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <nav aria-label="Footer navigation">
  <ul className="flex flex-wrap items-center md:justify-start space-x-4 md:space-x-6 mb-4 md:mb-0 text-sm md:text-base">
    <li className="mb-2 md:mb-0">
      <Link to="/about-us" className="transition-all duration-300 text-black hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50">
        <span>About Us</span>
      </Link>
    </li>
    <li className="mb-2 md:mb-0">
      <Link to="/terms-conditions" className="transition-all duration-300 text-black hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50">
        <span>Terms and Conditions</span>
      </Link>
    </li>
    <li className="mb-2 md:mb-0">
      <Link to="/privacy-policy" className="transition-all duration-300 text-black hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50">
        <span>Privacy Policy</span>
      </Link>
    </li>
    <li className="mb-2 md:mb-0">
      <Link to="/cancellation-policy" className="transition-all duration-300 text-black hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50">
        <span>Cancellation/Refund Policies</span>
      </Link>
    </li>
    <li className="mb-2 md:mb-0">
      <Link to="/contact-us" className="transition-all duration-300 text-black hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50">
        <span>Contact Us</span>
      </Link>
    </li>
  </ul>
</nav>

          <div className="flex space-x-6 items-center" aria-label="Social media links">
            {socialMediaProfiles.map((social) => (
              <a
                key={social.name}
                href="#"
                className="text-gray-500 rounded-full text-center hover:text-[#6F036C] transition-all duration-300 hover:scale-125 transform"
                aria-label={social.ariaLabel}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  role="img"
                >
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}