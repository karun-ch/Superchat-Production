import LandingPage_Header from '../LandingPage_Header';
import LandingPage_Footer from '../LandingPage_Footer';
import useDispatchHeader from '../../customHooks/useDispatchHeader';
import { Helmet } from 'react-helmet-async';

export default function AboutUs() {
  useDispatchHeader();

  const companyName = "SuperChat";
  const baseUrl = "https://superchat.in";

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{`About ${companyName} - Leading AI Solutions Provider`}</title>
        <meta name="description" content="Discover SuperChat LLC, a pioneering force in AI solutions. We're revolutionizing communication and business processes through innovative artificial intelligence technology." />
        
        {/* Keywords and Topic Tags */}
        <meta name="keywords" content="SuperChat LLC, AI solutions, artificial intelligence, business automation, communication technology, AGI development, AI consulting, enterprise AI solutions" />
        <meta name="topic" content="Artificial Intelligence, Technology, Business Solutions" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`About ${companyName} - Innovative AI Solutions`} />
        <meta property="og:description" content="Leading provider of innovative AI solutions, revolutionizing business communication and processes through cutting-edge artificial intelligence technology." />
        <meta property="og:url" content={`${baseUrl}/about-us`} />
        <meta property="og:site_name" content={companyName} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About ${companyName} - AI Innovation Leader`} />
        <meta name="twitter:description" content="Discover how SuperChat LLC is revolutionizing business communication with innovative AI solutions and cutting-edge technology." />
        
        {/* Canonical and Language */}
        <link rel="canonical" href="https://superchat.in/about-us" />
        <meta name="language" content="en" />
        
        {/* Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" as="style" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <header className="fixed top-0 w-full h-16 bg-white shadow z-10" role="banner">
          <LandingPage_Header />
        </header>

        <main className="mt-16 flex-grow px-4 py-8 sm:px-6 lg:px-8" role="main">
          <article className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to {companyName}
            </h1>
            
            <section className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                SuperChat LLC is a pioneering force in artificial intelligence, dedicated to revolutionizing how individuals and businesses interact with AI technology. Our mission drives us to create innovative, user-friendly solutions that enhance communication and streamline business processes.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Our Vision & Leadership
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Backed by renowned investors in the AI sector, SuperChat LLC combines strategic vision with robust financial support to drive innovation in this rapidly evolving field. Our leadership team brings extensive experience in artificial intelligence, ensuring we remain at the forefront of technological advancement.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Innovation in AI Development
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                We're pioneering the path toward Artificial General Intelligence (AGI) through innovative approaches using commodity hardware. This strategy allows us to make powerful AI solutions accessible while achieving faster breakthroughs in development.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                Our Commitment
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                Our expert team is dedicated to delivering exceptional AI experiences while maintaining the highest standards of privacy and security. We focus on creating meaningful connections and valuable solutions that address real-world challenges.
              </p>
            </section>

            <section className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Join Us in Shaping the Future of AI
              </h2>
              <p className="text-lg mt-4 text-gray-600">
                Thank you for choosing SuperChat LLC as your partner in AI innovation.
              </p>
            </section>
          </article>
        </main>

        <footer role="contentinfo">
          <LandingPage_Footer />
        </footer>
      </div>
    </>
  );
}