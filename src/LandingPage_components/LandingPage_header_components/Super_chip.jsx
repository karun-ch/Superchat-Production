import { useEffect } from 'react';
import super_chip_vid from '../../assets/superchip/superchat-video-hd.mp4';
import LandingPage_Footer from '../LandingPage_Footer';
import LandingPage_Header from '../LandingPage_Header';
import { useDispatch } from 'react-redux';
import { changeforbusiness, changeForDevPage, changeSuperchip } from '../../ReduxStateManagement/user';
import { Helmet } from "react-helmet-async";

const Super_chip = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeForDevPage(false));
    dispatch(changeforbusiness(false));
    dispatch(changeSuperchip(true));
  }, []);

  return (
    <>
     <Helmet>
            <title>Superchat for Business - AI-Powered Enterprise Collaboration Platform</title>
            <meta name="description" content="Transform your business with Superchat's AI-powered assistant. Secure, seamless integration for messaging, documents, and workflows. Perfect for enterprise collaboration." />
            <meta name="keywords" content="AI assistant, enterprise collaboration, secure messaging, workflow automation, business productivity" />
            <meta property="og:title" content="Superchat for Business - Enterprise AI Assistant" />
            <meta property="og:description" content="Transform your business with Superchat's AI-powered assistant. Secure, seamless integration for enterprise collaboration." />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href="https://superchat.in/superchip" />
           
          </Helmet>
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <LandingPage_Header />

      {/* Hero Video Section */}
      <div className="w-full">
        <div className=" md:block relative w-full min-h-[100svh]">
          <iframe
            className="w-full h-screen"
            src={super_chip_vid}
            title="SuperChip Technology"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-16 bg-gradient-to-b from-white via-[#FFF4F8] to-[#FFEDF3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent mb-4">
                Purpose-Built Excellence
              </h3>
              <p className="text-gray-800 leading-relaxed">
                Crafted by experts for unmatched interaction quality and reliability on the compact SuperChip platform.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent mb-4">
                Lightning-Fast Performance
              </h3>
              <p className="text-gray-800 leading-relaxed">
                State-of-the-art integration ensures seamless communication for both personal and professional applications.
              </p>
            </div>
          </div>

          {/* Empowering the Future */}
          <div className="mt-16 text-center">
            <h2 className="text-4xl py-4 font-bold bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent mb-6">
              Empowering the Future
            </h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Superchat's cutting-edge AI capabilities deliver smooth and intuitive communication, perfectly optimized for the SuperChip ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingPage_Footer />
    </div>
    </>
  );
};

export default Super_chip;
