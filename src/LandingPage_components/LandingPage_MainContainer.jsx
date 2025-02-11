import LandingPage__Left_Container from "./LandingPage__Left_Container";
import useDispatchHeader from "../customHooks/useDispatchHeader";
// import LandingPage_Right_Container from "./LandingPage_Right_Container";
import { Helmet } from 'react-helmet-async';

export default function LandingPage_MainContainer() {
  useDispatchHeader();

  // SEO Constants
  const PAGE_TITLE = "SuperChat - AI-Powered Chat Assistant | Smart Customer Support";
  const PAGE_DESCRIPTION = "Transform your customer experience with SuperChat's intelligent chatbot assistant. Get instant responses, 24/7 support, and seamless conversations. Start your free trial today!";
  const CANONICAL_URL = "https://superchat.in";

  // Structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SuperChat",
    "applicationCategory": "BusinessApplication",
    "description": PAGE_DESCRIPTION,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "24/7 Customer Support",
      "AI-Powered Responses",
      "Multi-language Support",
      "Easy Integration"
    ]
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 bg-slate-50 min-h-[300px] gap-4">
      <Helmet>
        {/* Essential Meta Tags */}
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content="chatbot, AI assistant, customer support, SuperChat, business chat solution, automated support, chat platform" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:site_name" content="SuperChat" />
        
      
        
        {/* Canonical URL */}
        
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://api.superchat.in" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main
        className="col-span-1 sm:col-span-2"
        aria-label="Main Content"
        role="main"
      >
        <LandingPage__Left_Container />
      </main>

      <div className="col-span-1">
        <div className="sm:hidden">
          {/* <LandingPage_Right_Container /> */}
        </div>

        <div className="hidden sm:block">
          {/* <LandingPage_Right_Container /> */}
        </div>
      </div>
    </div>
  );
}