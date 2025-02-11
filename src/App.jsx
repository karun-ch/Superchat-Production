import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import  { Suspense, lazy } from "react";

// Lazy Loaded Pages
const ForBusiness = lazy(()=>import ('./LandingPage_components/LandingPage_header_components/ForBusiness'))
const CancellationRefundPolicies = lazy(() => import("./LandingPage_components/LandingPage_Footer_Components/Cancellation_refund_policies"));
const For_developers =lazy(()=>import ('./LandingPage_components/LandingPage_header_components/For_developers'))
const Super_chip=lazy(()=>import('./LandingPage_components/LandingPage_header_components/Super_chip'))
// Critical Pages Loaded Upfront
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import AboutUs from "./LandingPage_components/LandingPage_Footer_Components/Aboutus"
import ContactUs from "./LandingPage_components/LandingPage_Footer_Components/Contactus"
import TermsAndConditions from "./LandingPage_components/LandingPage_Footer_Components/Terms_Conditions"
import PrivacyPolicy  from  "./LandingPage_components/LandingPage_Footer_Components/Privacy_policy"
import ChatbotInterface from "./pages/Chatbot_Interface";
import LoadingSpinner from "./Components/Loading";
import Superchat_translate from "./ChatbotPage_components/Superchat_Translate/Superchat_translate";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/">
        <Suspense fallback={<div><LoadingSpinner/></div>}>
          <Routes>
            {/* Critical Pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/fordevelopers" element={<For_developers />} />
            <Route path="/forbusiness" element={<ForBusiness />} />
            <Route path="/superchip" element={<Super_chip />} />

            {/* Lazy Loaded Pages */}
            <Route path="/chatbot" element={<ChatbotInterface />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/cancellation-policy" element={<CancellationRefundPolicies />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/translate" element={<Superchat_translate/>} />

            {/* 404 Fallback */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
