import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Check } from 'lucide-react';

const ContactFormSubmit = () => {
    const navigate = useNavigate();
    
    // Schema.org JSON-LD data
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Request Received Confirmation",
        "description": "Thank you for your request. Our team will contact you shortly."
    };

    return (
        <>
            <Helmet>
                <title>Request Received - Thank You | Your Company Name</title>
                <meta name="description" content="Thank you for your request. Our team will contact you shortly." />
                <meta name="robots" content="noindex, nofollow" /> {/* Since this is a success page */}
                <link rel="canonical" href="/contact/success" />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <main className="min-h-screen flex items-center justify-center p-4">
                <section className="max-w-md w-full text-center" role="status" aria-live="polite">
                    <div className="space-y-6">
                        {/* Success Icon */}
                        <div className="inline-flex p-2 bg-green-600 rounded-full">
                            <Check className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>

                        {/* Success Message */}
                        <h1 className="text-lg font-semibold text-slate-600 pb-4 border-b-2 border-gray-400">
                            We have received your request
                        </h1>

                        {/* Follow-up Message */}
                        <p className="text-gray-500">
                            Our team will get in touch with you shortly. Please wait patiently.
                        </p>

                        {/* Navigation Button */}
                        <button 
                            onClick={() => navigate('/')}
                            className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white rounded-lg w-40 transition-colors"
                            aria-label="Return to homepage"
                        >
                            Return Home
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
};

export default ContactFormSubmit;