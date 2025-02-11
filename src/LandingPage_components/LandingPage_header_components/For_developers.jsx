import React from 'react';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { useDispatch } from "react-redux";
import { changeforbusiness, changeForDevPage, changeSuperchip } from "../../ReduxStateManagement/user";

// Import components
import LandingPage_Header from "../LandingPage_Header";
import Developers_list from "./Developers_list";
import LandingPage_Footer from "../LandingPage_Footer";

// Import images
// import Supechat_screen from '../../assets/Chat_screen.webp';
import Supechat_screen from '../../assets/SuperchatGIF.gif';
import natural_language_logo from '../../assets/fordevelopers/natural_language.webp';
import legal_logo from '../../assets/fordevelopers/legal.webp';
import media_logo from '../../assets/fordevelopers/media.webp';
import education_logo from '../../assets/fordevelopers/education.webp';
import telecommunication_logo from '../../assets/fordevelopers/telecommunication.webp';
import hospital_logo from '../../assets/fordevelopers/hospital.webp';
import manufacturing_logo from '../../assets/fordevelopers/manufacturing.webp';
import computer_vision_logo from '../../assets/computer_vision/computer_vision.webp';
import reatil_logo from '../../assets/computer_vision/retail.webp';
import agriculture_logo from '../../assets/computer_vision/agriculture.webp';
import security_logo from '../../assets/computer_vision/security.webp';
import logistics_logo from '../../assets/computer_vision/logistics.webp';
import construction_logo from '../../assets/computer_vision/construction.webp';
import healthcare_logo from '../../assets/computer_vision/healthcare.webp';
import speech_audio_logo from '../../assets/speech_audio/speech_audio.webp';
import contact_centre_logo from '../../assets/speech_audio/call_centre.webp';
import ai_manufacture_logo from '../../assets/speech_audio/ai_manufac.webp';
import laws_firms_logo from '../../assets/speech_audio/laws_firms.webp';
import manufacturing_training_logo from '../../assets/speech_audio/man_traning.webp';
import telemedicine_logo from '../../assets/speech_audio/telemedicine.webp';
import reccomendation_sys_logo from '../../assets/recommendation_sys/recommendation.webp';
import consulting_logo from '../../assets/recommendation_sys/consulting_firms.webp';
import corporate_logo from '../../assets/recommendation_sys/corporate_tran.webp';
import propriearity_logo from '../../assets/recommendation_sys/proprity_data.webp';
import subscription_logo from '../../assets/recommendation_sys/subscription.webp';
import universities_logo from '../../assets/recommendation_sys/universities.webp';
import Bnak_logo from '../../assets/recommendation_sys/bank.webp';
import prediction_logo from '../../assets/predicting_analysis_forecasting/predicting.webp';
import Bank_firms from '../../assets/predicting_analysis_forecasting/bank_firms.webp';
import food_logo from '../../assets/predicting_analysis_forecasting/food.webp';
import insurance_logo from '../../assets/predicting_analysis_forecasting/insurance.webp';
import health_bg from '../../assets/health.svg';
import finance_bg from '../../assets/finance.svg';
import reatil_bg from '../../assets/retail.svg';
import education_bg from '../../assets/education.svg';
import travel_bg from '../../assets/travel.svg';
import { useState } from 'react';

const sections = [
  {
    title: "Complete Data Sovereignty for Sensitive Data",
    items: [
      {
        title: "Healthcare",
        description: "Encrypt and process imaging data on secure servers, ensuring compliance with data protection laws.",
      },
      {
        title: "Government & Defense",
        description: "Confidential analysis of intelligence data on-prem, ensuring no leaks to external networks.",
      },
      {
        title: "Banking",
        description: "Keep financial transaction and customer profile data fully internal, mitigating compliance risks.",
      },
    ],
  },
  {
    title: "Optimized for Edge and Private Cloud Deployments",
    items: [
      {
        title: "Manufacturing Plants at the Edge",
        description: "Run anomaly detection models directly on factory floor machines.",
      },
      {
        title: "Healthcare Facilities",
        description: "Deploy AI-equipped edge servers for real-time patient monitoring in intensive care units.",
      },
      {
        title: "Energy Industry",
        description: "Use on-site AI nodes at remote drilling or wind farm locations for instant analytics and decision-making.",
      },
    ],
  },
];

const For_developers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCard, setActiveCard] = useState(null); // Track the active card

  const handleCardClick = (cardId) => {
    setActiveCard(cardId); // Set the clicked card as active
  };

  React.useEffect(() => {
    dispatch(changeForDevPage(true));
    dispatch(changeforbusiness(false));
    dispatch(changeSuperchip(false));
  }, [dispatch]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Development Tools - Superchat Developer Platform",
    "description": "Empower your development with AI models, APIs, and tools for natural language processing, computer vision, speech processing, and more.",
    "provider": {
      "@type": "Organization",
      "name": "Superchat",
      "sameAs": "https://superchat.in"
    },
    "offers": {
      "@type": "Offer",
      "category": "AI Development Tools"
    }
  };
  const toggleTrysuperchat=()=>{
    navigate('/signup');

  }

  return (
    <>
      <Helmet>
        <title>AI Development Tools & APIs | Superchat Developer Platform</title>
        <meta name="description" content="Access powerful AI models and development tools for natural language processing, computer vision, speech processing, and more. Build innovative applications with Superchat's developer platform." />
        <meta name="keywords" content="AI development, API, machine learning, developer tools, NLP, computer vision, speech processing" />
        <link rel="canonical" href="https://superchat.in/fordevelopers" />
        <meta property="og:title" content="AI Development Tools & APIs | Superchat Developer Platform" />
        <meta property="og:description" content="Build innovative applications with Superchat's AI development platform. Access powerful models and tools for NLP, computer vision, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superchat.in/fordevelopers" />
        <meta property="og:image" content={Supechat_screen} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
 
      <div className="bg-white">
        <header className="fixed top-0 w-full h-12 bg-white shadow z-20">
          <LandingPage_Header />
        </header>

        <main className="flex flex-col">
          {/* <section className="flex flex-col md:flex-row mt-36 p-2 min-h-[50vh] " aria-label="Hero section"> */}
          <section className="flex flex-col md:flex-row mt-2 p-2 min-h-[72vh]  " aria-label="Hero section">

            {/* <div className="w-full md:w-2/5 flex flex-col p-4 md:p-10">
              <h1 className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent text-4xl md:text-6xl max-w-full md:w-[550px] font-semibold">
                Empowering every developer with AI
              </h1>
              <p className="text-gray-800 py-2 md:py-4 text-lg md:text-xl max-w-full md:w-[550px] font-thin ml-2">
                Leverage AI models to craft innovative applications and streamline development workflows with versatile tools.
              </p>
              <div className="relative md:absolute flex items-center gap-2 mt-6 md:mt-0 md:top-[650px] lg:top-[490px] md:ml-3">
                <button
                  onClick={toggleTrysuperchat}
                  className="hover:cursor-pointer text-base md:text-[18px] font-[500] bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent"
                  aria-label="Try Superchat"
                >
                  Try Superchat
                  <svg
                    width="25"
                    height="23"
                    viewBox="0 0 25 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="inline-block ml-2"
                  >
                    <path
                      d="M7.1684 6C6.89234 6 6.66853 6.22374 6.66853 6.49986C6.66853 6.77592 6.89234 6.99973 7.1684 6.99973H12.2798L2.14921 17.1301C1.95026 17.3291 1.95026 17.6518 2.14921 17.8508C2.34823 18.0497 2.67088 18.0497 2.8699 17.8508L13.0003 7.72053V12.8315C13.0003 13.1075 13.2241 13.3313 13.5001 13.3313C13.7762 13.3313 14 13.1075 14 12.8315V6.49986C14 6.22374 13.7762 6 13.5001 6H7.1684Z"
                      fill="#4A0044"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full md:w-3/5 mt-8 md:mt-0">
              <img
                src={Supechat_screen}
                className="rounded-lg w-full h-auto md:h-[480px] shadow-2xl"
                alt="Superchat platform interface demonstration"
                loading="lazy"
              />
            </div> */}

<div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full p-2  gap-5">  {/* md:p-12*/}
  {/* Left Section */}
  <div className="md:w-2/5 flex flex-col text-center md:text-left mt-20  ml-10">
    {/* <h1 className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] mt-44 bg-clip-text text-transparent text-4xl md:text-6xl font-semibold leading-tight"> */}
    <h1 className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] mt-44 bg-clip-text text-transparent text-2xl md:text-4xl max-w-full md:w-[650px] font-semibold">
      Empowering every developer with AI
    </h1>
    {/* <p className="text-gray-800 mt-4 text-lg md:text-xl font-thin"> */}
    <p className="text-gray-800 py-2 mt-4 text-lg md:text-xl max-w-full md:w-[550px] font-thin">
      Leverage AI models to craft innovative applications and streamline development workflows with versatile tools.
    </p>
    {/* <div className="flex items-center gap-4 mt-6"> */}
    <div className="relative flex items-center gap-2 mt-6 ">
      <button
        onClick={toggleTrysuperchat}
        className="px-6 py-3 bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white rounded-lg shadow-md hover:scale-105 transition-transform"
        //className="hover:cursor-pointer text-base md:text-[18px] font-[500] bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent"
        aria-label="Try Superchat"
      >
        Try Superchat
      </button>
      
    </div>
  </div>

  {/* Right Section */}
  <div className="md:w-3/5 flex flex-col  justify-center ">
    <img
      src={Supechat_screen}
       className="rounded-lg max-w-full shadow-2xl"
     // className="rounded-lg max-w-full h-auto md:max-h-[480px] shadow-2xl border-4 border-gray-300"
      alt="Superchat platform interface demonstration"
      loading="lazy"
    />
  </div>
</div>
          </section>

          <section className="flex flex-col justify-center items-center mx-auto py-6 md:py-12 px-4 text-center mt-4 md:mt-12">
            <h2 className="text-slate-700 text-3xl md:text-6xl font-medium p-2">
              Start Building
            </h2>
            <p className="p-2 md:p-4 text-gray-500 text-sm md:text-md max-w-lg">
              Start developing with powerful AI models and tools now.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
              <button
                onClick={() => handleCardClick(1)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Natural Language Processing
              </button>
              <button
                onClick={() => handleCardClick(2)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Computer Vision
              </button>
              <button
                onClick={() => handleCardClick(3)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Speech Processing
              </button>
              <button
                onClick={() => handleCardClick(4)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Predictive Analytics
              </button>
              <button
                onClick={() => handleCardClick(5)}
                className="bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                AI Model Deployment
              </button>
            </div>

            
          </section>
          <div className="container mx-auto p-8">
          {activeCard === 1 && (
          <Developers_list
          title={"Natural Language Processing APIs"}
          description={
            "Text Summarization & Abstractive Question Answering and Sentiment Analysis & Topic Classification"
          }
          logo={natural_language_logo}
          bg_svg={finance_bg}
          items={[
            {
              title: "Legal",
              description:
                "Summarize long legal documents and court transcripts for faster case preparation",
              logo: legal_logo,
            },
            {
              title: "Media & Journalism",
              description:
                "Provide real-time summaries of breaking news articles for internal editorial teams",
              logo: media_logo,
            },
            {
              title: "Education",
              description:
                "Create study guides from large textbook datasets managed on local school servers",
              logo: education_logo,
            },
            {
              title: "Telecommunications",
              description:
                "Classify customer feedback on internal service channels, directing issues to the right teams",
              logo: telecommunication_logo,
            },
            {
              title: "Hospitality",
              description:
                "Evaluate guest feedback stored on-prem to improve services without sending data offsite",
              logo: hospital_logo,
            },
            {
              title: "Manufacturing",
              description:
                "Analyze internal safety reports and employee suggestions to improve workplace conditions",
              logo: manufacturing_logo,
            },
          ]}
        />
          )}
          {activeCard === 2 && (
            <Developers_list
            title="Computer Vision APIs"
            description="Object Detection & Image Classification and Video Analytics"
            logo={computer_vision_logo}
            bg_svg={education_bg}
            items={[
              {
                title: 'Retail',
                description: 'Identify product defects on conveyor belts or verify stock levels on store shelves using local camera feeds',
                logo: reatil_logo
              },
              {
                title: 'Agriculture',
                description: 'Detect crop diseases in images of fields captured by on-site drones, ensuring data remains farm-owned',
                logo: agriculture_logo,
              },
              {
                title: 'Security',
                description: 'Deploy facial recognition at secure access points within corporate campuses without relying on external cloud databases',
                logo: security_logo
              },
              {
                title: 'Logistics & Warehousing',
                description: 'Track pallet movements and detect misplaced goods on premises to maintain inventory accuracy',
                logo: logistics_logo
              },
              {
                title: 'Construction',
                description: 'Monitor safety compliance on construction sites, ensuring no video data leaves the organizations private network',
                logo: construction_logo,
              },
              {
                title: 'Healthcare',
                description: 'Analyze patient movement within a hospital ward to prevent falls or improve staff allocation securely',
                logo: healthcare_logo,
              }
            ]}
          />
          )}

            {activeCard === 3 && (
              <Developers_list
              title="Speech and Audio Processing APIs"
              description="Speech-to-Text & Text-to-Speech Services and Language Translation & Transcription Services"
              logo={speech_audio_logo}
              bg_svg={travel_bg}
              items={[
                {
                  title: 'Contact Centers (Telecom)',
                  description: 'Transcribe and analyze support calls locally, improving customer service workflows while maintaining confidentiality',
                  logo: contact_centre_logo
                },
                {
                  title: 'Healthcare',
                  description: 'Convert doctors voice notes into text-based patient records, ensuring patient privacy by keeping data on hospital servers',
                  logo: healthcare_logo,
                },
                {
                  title: 'Manufacturing Training',
                  description: 'Provide voice-guided instructions for machine operators, converting safety manuals into audio prompts stored on-prem',
                  logo: manufacturing_training_logo
                },
                {
                  title: 'International Law Firms',
                  description: 'Translate internal case files between languages for multinational clients without external translation services',
                  logo: laws_firms_logo,
                },
                {
                  title: 'Global Manufacturing Plants',
                  description: 'Transcribe and translate safety briefings and technical instructions for multilingual workforces on-site',
                  logo: ai_manufacture_logo,
                },
                {
                  title: 'Telemedicine',
                  description: 'Offer immediate translation for patient-doctor consultations in multinational healthcare networks, all hosted internally',
                  logo: telemedicine_logo
                }
              ]}
            />   
            )}

          {activeCard === 4 && (
            <Developers_list
            title="Recommendation Systems and Personalization APIs"
            description="Internal Resource Recommendations and Privacy-Preserving E-Commerce or Service Recommendations"
            logo={reccomendation_sys_logo}
            bg_svg={health_bg}
            items={[
              {
                title: 'Corporate Training',
                description: 'Suggest personalized training modules to employees based on their role and previous course completions, all managed internally',
                logo: corporate_logo
              },
              {
                title: 'Consulting Firms',
                description: 'Recommend relevant internal research papers, project lessons, and methodology guides for consultants',
                logo: consulting_logo
              },
              {
                title: 'Universities',
                description: 'Direct students to appropriate scholarly articles, courses, or departmental events using secure, on-prem recommendation engines',
                logo: universities_logo
              },
              {
                title: 'Retailers with Proprietary Data',
                description: 'Suggest products to customers shopping in a private showroom environment, ensuring purchase histories remain confidential',
                logo: propriearity_logo
              },
              {
                title: 'Banking & Wealth Management',
                description: 'Recommend investment products or saving plans internally, safeguarding account details from external servers',
                logo: Bnak_logo
              },
              {
                title: 'Subscription-Based Businesses',
                description: 'Tailor premium content or service bundles to clients preferences without sending user profiles to third parties',
                logo: subscription_logo
              }
            ]}
          />
          )}

        {activeCard === 5 && (
          <Developers_list
          title="Predictive Analytics and Forecasting APIs"
          description="Demand Forecasting & Supply Chain Optimization and Real-Time Risk Scoring"
          logo={prediction_logo}
          bg_svg={reatil_bg}
          items={[
            {
              title: 'Food & Beverage',
              description: 'Forecast perishable inventory requirements to minimize waste and maintain fresh stock locally',
              logo: food_logo
            },
            {
              title: 'Banking & Investment Firms',
              description: 'Assess credit risk or fraud probabilities on internal transaction streams to expedite lending decisions while maintaining regulatory compliance',
              logo: Bank_firms
            },
            {
              title: 'Insurance Companies',
              description: 'Evaluate claims risks, policy lapses, and premium optimizations on company-owned hardware for tighter data security',
              logo: insurance_logo,
            }
          ]}
        />
        )}

            </div>




          <section aria-label="API features">          
            
        </section>

        <section className="container mx-auto p-8" aria-label="Data sovereignty and deployment options">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <DataCard key={index} title={section.title} items={section.items} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bottom-0 w-full h-12 bg-white shadow z-10">
        <LandingPage_Footer />
      </footer>
    </div>
  </>
);
};

const DataCard = ({ title, items }) => (
<article className="bg-white shadow-xl rounded-lg p-6 m-4">
  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6F036C] to-[#FF6F61E5] bg-clip-text text-transparent mb-4">
    {title}
  </h3>
  <ul className="space-y-3">
    {items.map((item, index) => (
      <li key={index} className="flex flex-col space-y-1">
        <h4 className="text-md font-semibold text-gray-700">{item.title}</h4>
        <p className="text-gray-600 text-sm">{item.description}</p>
      </li>
    ))}
  </ul>
</article>
);

export default For_developers;