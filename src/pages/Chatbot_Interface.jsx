import { Helmet } from 'react-helmet-async';
import BotInterface from "../ChatbotPage_components/BotInterface";
import Sidebar from "../ChatbotPage_components/Sidebar";
import ChatbotHeaderSmallScreen from "../ChatbotPage_components/ChatbotHeaderSmallScreen";
import useIsSmallScreen from "../customHooks/useIsSmallScreen";
import { useSelector } from "react-redux";
import { Suspense,lazy } from 'react';
import LoadingSpinner from '../Components/Loading';
import Superchat_translate from '../ChatbotPage_components/Superchat_Translate/Superchat_translate';
const VoiceInterface =lazy(()=>import ('../ChatbotPage_components/BotInterface_components/VoiceInterface'))

export default function ChatbotInterface() {
  const isSmallScreen = useIsSmallScreen();
  const { voiceMode } = useSelector((store) => store.user);
  const {chatbot,translate} = useSelector(store =>store.bot);

  // SEO constants
  const PAGE_TITLE = "Superchat AI Assistant - Interactive Chat Interface";
  const PAGE_DESCRIPTION = "Experience seamless conversations with Superchat's AI assistant. Get instant responses, voice interactions, and intelligent chat support.";
  const CANONICAL_URL = "https://superchat.in/chatbot";

  // If voice mode is active, replace everything with VoiceInterface
  if (voiceMode) {
    return (
      <>
        <Helmet>
          <title>Voice Chat - Superchat AI Assistant</title>
          <meta name="description" content="Interact with Superchat's AI assistant using voice commands. Experience hands-free, natural conversations." />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <Suspense fallback={<div className='text-center '><LoadingSpinner/></div>}>
        <VoiceInterface />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="robots" content="noindex, follow" /> {/* Typically chat interfaces shouldn't be indexed */}
        <link rel="canonical" href={CANONICAL_URL} />
        
        {/* OpenGraph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={CANONICAL_URL} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        
        {/* Additional Meta Tags */}
        <meta name="application-name" content="Superchat" />
        <meta name="keywords" content="AI chat, voice assistant, chatbot, virtual assistant, superchat" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Superchat AI Assistant",
            "applicationCategory": "ChatApplication",
            "operatingSystem": "Web",
            "description": PAGE_DESCRIPTION,
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD" 
            },
            "features": [
              "AI Chat Interface",
              "Voice Interaction",
              "Real-time Responses",
              "Mobile Responsive"
            ]
          })}
        </script>
      </Helmet>

      <main 
        className={`w-full h-screen ${isSmallScreen ? "flex flex-col" : "flex flex-row"}`}
        role="main"
        aria-label="Chatbot Interface"
      >
        {isSmallScreen ? (
          // For small screens, display the header at the top
          <header>
            <ChatbotHeaderSmallScreen />
          </header>
        ) : (
          // For larger screens, display the sidebar on the left
          <nav className="h-full" aria-label="Chat Navigation">
            <Sidebar />
          </nav>
        )}

        {/* BotInterface takes full space regardless of screen size */}
        <section 
          className="flex-grow"
          role="region"
          aria-label="Chat Area"
        >
          {chatbot && <BotInterface/>}
          {translate && <Superchat_translate/>}
        </section>
      </main>
    </>
  );
}