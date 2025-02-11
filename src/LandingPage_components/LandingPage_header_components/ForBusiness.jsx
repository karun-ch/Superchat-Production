import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeforbusiness, changeForDevPage, changeSuperchip } from "../../ReduxStateManagement/user";

// Image imports
import Supechat_screen from '../../assets/forbus/chat_app_screen.png';
import reatil_logo from '../../assets/computer_vision/retail.webp';
import healthcare_logo from '../../assets/computer_vision/healthcare.webp';
import Bank_firms from '../../assets/predicting_analysis_forecasting/bank_firms.webp';
import customer_Engaging from '../../assets/forbus/cus_engage.jpeg';
import internal_knowledge from '../../assets/forbus/internal_knowledge.jpeg';
import govt_agencies from '../../assets/forbus/govt_agencies.jpeg';
import health_providers from '../../assets/forbus/providers.jpeg';
import energy_comp from '../../assets/forbus/energy_comp.jpeg';
import R_D from '../../assets/forbus/R_D.jpeg';
import automotive from '../../assets/forbus/automotive.jpeg';
import semiconductor from '../../assets/forbus/semiconductor.jpeg';
import agriculture from '../../assets/forbus/agriculture.jpeg';
import high_compliance from '../../assets/forbus/high.jpeg';
import defence_contractors from '../../assets/forbus/defence.jpeg';
import critical_utilities from '../../assets/forbus/critical.jpeg';

// Component imports
import LandingPage_Header from "../LandingPage_Header";
import LandingPage_Footer from "../LandingPage_Footer";
import Developers_list from "./Developers_list";

import React from 'react';
import { useState } from 'react';


export default function ForBusiness() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null); // Track the active card
  
  const handleCardClick = (cardId) => {
    setActiveCard(cardId); // Set the clicked card as active
  };

  useEffect(() => {
    dispatch(changeforbusiness(true));
    dispatch(changeForDevPage(false));
    dispatch(changeSuperchip(false));
  }, [dispatch]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Superchat",
    "applicationCategory": "BusinessApplication",
    "description": "AI-powered assistant for seamless collaboration and productivity, integrated into messaging, documents, and workflows with enterprise-grade security.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };
  const toggleTrysuperchat=()=>{
    navigate('/signup');

  }

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
        <link rel="canonical" href="https://superchat.in/forbusiness" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* <div className="min-h-screen"> */}
      <div className="bg-white">
        <header className="fixed top-0 w-full h-12 bg-white shadow z-50">
          <LandingPage_Header />
        </header>
        
        <main className="flex flex-col">
          <section className="flex flex-col md:flex-row mt-16 md:mt-36 p-4 min-h-[50vh] md:px-8 lg:px-44" aria-label="Hero section">
            <div className="w-full md:w-3/5 flex flex-col p-4">
              <h1 className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent text-2xl md:text-4xl max-w-full md:w-[650px] font-semibold">
                Bring your best ideas to life with Superchat for seamless collaboration and productivity
              </h1>
              <p className="text-gray-800 py-2 text-lg md:text-xl max-w-full md:w-[550px] font-thin">
                Superchat is your AI-powered assistant, seamlessly integrated into messaging, documents, workflows, and more, with top-tier security and privacy
              </p>
              <div className="relative flex items-center gap-2 mt-6 md:mt-8">
                <button
                  onClick={toggleTrysuperchat}
                  className="hover:cursor-pointer text-base md:text-[18px] font-[500] bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent"
                  aria-label="Try Superchat"
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
                >
                  <path
                    d="M7.1684 6C6.89234 6 6.66853 6.22374 6.66853 6.49986C6.66853 6.77592 6.89234 6.99973 7.1684 6.99973H12.2798L2.14921 17.1301C1.95026 17.3291 1.95026 17.6518 2.14921 17.8508C2.34823 18.0497 2.67088 18.0497 2.8699 17.8508L13.0003 7.72053V12.8315C13.0003 13.1075 13.2241 13.3313 13.5001 13.3313C13.7762 13.3313 14 13.1075 14 12.8315V6.49986C14 6.22374 13.7762 6 13.5001 6H7.1684Z"
                    fill="#4A0044"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full md:w-2/5 mt-8 md:mt-0 flex justify-center md:justify-end">
              <img
                src={Supechat_screen}
                className="rounded-lg w-[300px] border-2 border-gray-300 h-auto lg:h-[520px] shadow-xl"
                alt="Superchat application interface showing collaboration features"
                loading="lazy"
              />
            </div>
          </section>

          <section className="flex flex-col mb-5 justify-center items-center mx-auto py-6 md:py-12 px-4 text-center mt-4 md:mt-12">
            <h2 className="text-black text-2xl md:text-3xl font-medium p-2 w-full md:w-[750px] leading-relaxed">
              Superchat is your always-on AI assistant for seamless collaboration and productivity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mr-20 ml-20">
              <button
                onClick={() => handleCardClick(1)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                On-Premise AI-Driven Customer Engagement
              </button>
              <button
                onClick={() => handleCardClick(2)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Internal Knowledge Bases & Secure Document Processing
              </button>
              <button
                onClick={() => handleCardClick(3)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Proprietary R&D and Product Innovation Labs
              </button>
              <button
                onClick={() => handleCardClick(4)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                High-Compliance Sectors (Finance, Defense, Healthcare)
              </button>    
            </div>

            
          </section>

          <div className="container mx-auto p-8">
          {activeCard === 1 && (
            <Developers_list
            title="On-Premise AI-Driven Customer Engagement"
            description=""
            logo={customer_Engaging}
            items={[
              {
                title: 'Banking & Financial Services',
                description: 'Deploy advanced chatbots for loan inquiries, account services, and investment advice, all while keeping sensitive financial data in-house',
                logo: Bank_firms
              },
              {
                title: 'Retail',
                description: 'Implement virtual shopping assistants on local store servers to personalize product recommendations without exposing customer purchase histories to external platforms',
                logo: reatil_logo,
              },
              {
                title: 'Health Care',
                description: 'Set up virtual patient intake systems that handle personal health information securely on hospital-owned hardware, accelerating triage without risking data breaches',
                logo: healthcare_logo,
              },
            ]} 
          />
            )}

            {activeCard === 2 && (
              <Developers_list
              title="Internal Knowledge Bases & Secure Document Processing"
              description=""
              logo={internal_knowledge}
              items={[
                {
                  title: 'Government Agencies',
                  description: 'Leverage local language models to summarize classified documents and process internal memos, maintaining confidentiality and strict compliance with national security protocols.',
                  logo: govt_agencies
                },
                {
                  title: 'Healthcare Providers',
                  description: 'Run patient history analysis and medical literature summarization in-house to quickly diagnose patient conditions while maintaining HIPAA-compliant data handling',
                  logo: health_providers,
                },
                {
                  title: 'Energy Companies',
                  description: 'Analyze proprietary geospatial data, exploration reports, and regulatory filings internally to guide resource allocation and project planning securely.',
                  logo: energy_comp,
                },
              ]}
            />            
              )}

            {activeCard === 3 && (
              <Developers_list
              title="Proprietary R&D and Product Innovation Labs"
              description=""
              logo={R_D}
              items={[
                {
                  title: 'Automotive R&D',
                  description: 'Analyze proprietary telemetry, road test data, and advanced driver-assistance logs on-prem to improve engine performance, battery efficiency, and autonomous driving features',
                  logo: automotive,
                },
                {
                  title: 'Semiconductor Design Firms',
                  description: 'Speed up chip design simulations and material performance analyses using on-prem AI models, ensuring trade secrets remain safe.',
                  logo: semiconductor,
                },
                {
                  title: 'Agricultural Technology (AgTech)',
                  description: 'Examine soil composition data, climate models, and crop yield predictions internally to improve proprietary seed engineering and farming techniques',
                  logo: agriculture,
                },
              ]}
            />

                          
            )}
            {activeCard === 4 && (
              <Developers_list
              title="High-Compliance Sectors (Finance, Defense, Healthcare)"
              description=""
              logo={high_compliance}
              items={[
                {
                  title: 'Financial Institutions',
                  description: 'Use local anomaly detection models on transaction data to flag potential fraud instantly, complying with strict regulatory requirements and safeguarding customer confidentiality',
                  logo: Bank_firms
                },
                {
                  title: 'Defense Contractors',
                  description: 'Employ secure on-prem AI to process satellite imagery, radar signals, or classified internal communications, supporting mission-critical decision-making within a secured environment.',
                  logo: defence_contractors,
                },
                {
                  title: 'Utilities & Critical Infrastructure',
                  description: 'Deploy secure AI models onsite for grid monitoring and load balancing, ensuring critical infrastructure data never leaves controlled facilities',
                  logo: critical_utilities,
                },
              ]}
            />                          
            )}
            </div>

          <section aria-label="Industry solutions">
                        
          </section>
        </main>

        <footer className="w-full h-12 bg-white shadow z-10">
          <LandingPage_Footer />
        </footer>
      </div>
    </>
  );
}