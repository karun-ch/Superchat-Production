import LandingPage_Header from '../LandingPage_Header';
import LandingPage_Footer from '../LandingPage_Footer';
import { Link } from 'react-router-dom';
import useDispatchHeader from '../../customHooks/useDispatchHeader';
import { Helmet } from 'react-helmet-async';

export default function CancellationRefundPolicies() {
  useDispatchHeader();

  // Constants for SEO
  const PAGE_TITLE = "Cancellation and Refund Policy | SuperChat LLC - Official Policies";
  const PAGE_DESCRIPTION = "Learn about SuperChat LLC's comprehensive cancellation and refund policies. Clear guidelines on subscription cancellations, our no-refund policy, and service terms. Updated November 2024.";
  const CANONICAL_URL = "https://superchat.in/cancellation-policy";

  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": PAGE_TITLE,
    "description": PAGE_DESCRIPTION,
    "publisher": {
      "@type": "Organization",
      "name": "SuperChat LLC",
      "url": "https://superchat.in"
    },
    "dateModified": "2024-11-09",
    "mainEntity": {
      "@type": "WebContent",
      "about": {
        "@type": "Thing",
        "name": "Cancellation and Refund Policy"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <meta name="keywords" content="SuperChat cancellation policy, refund policy, subscription cancellation, SuperChat LLC terms, chat service policy, messaging platform terms" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:site_name" content="SuperChat LLC" />
        
      
        
        {/* Canonical URL */}
        <link rel="canonical" href={CANONICAL_URL} />
        
        {/* Resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" as="style" />
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <header className="fixed top-0 w-full h-16 bg-white shadow z-10">
        <LandingPage_Header />
      </header>

      <main className="mt-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <article className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900">
            Cancellation and Refund Policy
          </h1>
          
          <div className="text-base sm:text-lg">
            <p className="mb-4">
              <strong>Effective Date:</strong> 9th Nov 2024
            </p>
            <p className="mb-6">
              Thank you for using the services provided by SuperChat LLC. This Cancellation and Refund Policy outlines the terms under which you may cancel your use of our Services and our policy regarding refunds.
            </p>
          </div>

          <nav aria-label="Table of Contents" className="mb-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-2 text-slate-800">
              Table of Contents
            </h2>
            <ul className="list-disc space-y-2 pl-4 sm:pl-8">
              <li>
                <a href="#cancellation" className="text-slate-700 hover:text-black hover:underline transition-colors">
                  Cancellation of Services
                </a>
              </li>
              <li>
                <a href="#no-refunds" className="text-slate-700 hover:text-black hover:underline transition-colors">
                  No Refunds
                </a>
              </li>
              <li>
                <a href="#changes-to-policy" className="text-slate-700 hover:text-black hover:underline transition-colors">
                  Changes to the Policy
                </a>
              </li>
              <li>
                <a href="#contact-info" className="text-slate-700 hover:text-black hover:underline transition-colors">
                  Contact Information
                </a>
              </li>
            </ul>
          </nav>
        </article>

        <div className="mt-8 space-y-8">
          <section id="cancellation" className="scroll-mt-16" aria-labelledby="cancellation-title">
            <h2 id="cancellation-title" className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
              Cancellation of Services
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                You may cancel your subscription to our Services at any time. To cancel, you must follow the cancellation procedures outlined in your account settings or contact our customer support team. Upon cancellation, you will retain access to the Services until the end of your current billing cycle.
              </p>
            </div>
          </section>

          <section id="no-refunds" className="scroll-mt-16" aria-labelledby="no-refunds-title">
            <h2 id="no-refunds-title" className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
              No Refunds
            </h2>
            <div className="ml-2 sm:ml-4">
              <p className="mb-4">
                All payments made for our Services are final and non-refundable. This includes, but is not limited to, subscription fees, service credits, and any other fees associated with the use of our Services. By using our Services, you acknowledge and agree that:
              </p>
              <ul className="list-disc ml-8 sm:ml-12 text-slate-800">
                <li>You will not receive a refund for any unused portion of your subscription or for any service credits purchased.</li>
                <li>No exceptions will be made to this policy, regardless of the circumstances surrounding your cancellation or the reason for your request.</li>
              </ul>
            </div>
          </section>

          <section id="changes-to-policy" className="scroll-mt-16" aria-labelledby="changes-title">
            <h2 id="changes-title" className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
              Changes to the Policy
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                SuperChat LLC reserves the right to modify this Cancellation and Refund Policy at any time. Any changes will be effective immediately upon posting the updated policy on our website. Your continued use of the Services after any changes constitutes your acceptance of the new policy.
              </p>
            </div>
          </section>

          <section id="contact-info" className="scroll-mt-16" aria-labelledby="contact-title">
            <h2 id="contact-title" className="text-xl sm:text-2xl font-bold mb-2 text-slate-900">
              Contact Information
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                <strong>Need assistance? </strong>
                <Link to="/contact-us" className="inline-block transition-all duration-300 text-gray-700 hover:text-[#6F036C] hover:scale-105 hover:underline decoration-[#6F036C]/50">
                  Click here to contact our support team {"->"}
                </Link>
              </p>
            </div>
          </section>
        </div> 

        <footer className="text-center py-12 mt-8 border-t border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Thank you for choosing SuperChat LLC!
          </h2>
        </footer>
      </main>

      <LandingPage_Footer />
    </>
  );
}