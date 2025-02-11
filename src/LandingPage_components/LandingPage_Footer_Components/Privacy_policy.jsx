import  { useEffect } from 'react';
import LandingPage_Header from '../LandingPage_Header';
import LandingPage_Footer from '../LandingPage_Footer';
import { Link } from 'react-router-dom';
import useDispatchHeader from '../../customHooks/useDispatchHeader';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  const subHeadingStyle = "text-slate-900";
  useDispatchHeader();
  
  useEffect(() => {
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Privacy Policy - SuperChat LLC | Data Protection & Security</title>
        <meta name="description" content="Learn about SuperChat LLC's privacy policy, how we protect your data, and your rights regarding personal information collection, usage, and security." />
        <meta name="keywords" content="privacy policy, data protection, personal data, user rights, data security, SuperChat LLC" />
        <link rel="canonical" href="https://superchat.in/privacy-policy" />
        <meta property="og:title" content="Privacy Policy - SuperChat LLC" />
        <meta property="og:description" content="Learn about SuperChat LLC's privacy policy, how we protect your data, and your rights regarding personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://superchat.in/privacy-policy" />
       
      </Helmet>

      <header className="fixed top-0 w-full h-16 bg-white shadow z-10" role="banner">
        <LandingPage_Header />
      </header>
      
      <main className="mt-16 max-w-4xl mx-auto px-4 sm:px-6 md:px-8" role="main">
        <article className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm">
          <h1 className={`text-2xl sm:text-3xl font-bold mb-4 text-slate-900`}>Privacy Policy for SuperChat LLC</h1>
          <div className="mb-4">
            <strong>Effective Date:</strong> 9th Nov 2024
          </div>
          
          <div className="text-base sm:text-lg mb-6">
            <p>At SuperChat LLC ("we," "our," or "us"), we are committed to protecting your privacy and ensuring the security of any information we collect from you or about you. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your Personal Data when you use our website, applications, and services (collectively referred to as "Services").</p>
          </div>

          <div className="text-base sm:text-lg mb-4">
            <p>This Privacy Policy does not apply to content processed on behalf of customers of our business offerings, such as our API. The use of that data is governed by our customer agreements.</p>
          </div>

          <nav className="mb-8" aria-label="Table of Contents">
            <h2 className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-slate-800">Table of Contents</h2>
            <ul className="list-disc space-y-2 pl-4 sm:pl-8">
              {['personal-data', 'data-use', 'data-disclosure', 'data-retention', 'your-rights', 'children', 'security', 'changes', 'contact'].map((id, index) => (
                <li key={id}>
                  <a 
                    href={`#${id}`}
                    className="text-slate-700 hover:text-black hover:underline transition-colors"
                    aria-label={`Jump to section ${index + 1}`}
                  >
                    {id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </article>

        <div className="mt-8 space-y-8">
          <section id="personal-data" className="scroll-mt-16" aria-labelledby="personal-data-heading">
            <h2 id="personal-data-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              1. Personal Data We Collect
            </h2>
            <div className="ml-2 sm:ml-4 space-y-4">
              <p>We collect Personal Data relating to you ("Personal Data") as follows:</p>
              
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Data You Provide:</h3>
                  <p>We collect Personal Data when you create an account to use our Services or communicate with us, including:</p>
                  <ul className="list-disc pl-4 pt-2 space-y-2">
                    <li>Account Information: When you create an account, we collect information associated with your account, including your name, contact information, account credentials, date of birth, payment information, and transaction history.</li>
                    <li>User Content: We collect Personal Data that you provide in the input to our Services, including prompts and other content you upload, such as files, images, and audio, depending on the features you use.</li>
                    <li>Communication Information: If you communicate with us via email or social media, we may collect Personal Data such as your name and contact information and the contents of your messages.</li>
                    <li>Other Information You Provide: We collect additional information you may provide, such as when you participate in events or surveys or provide information to establish your identity or age.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Personal Data We Receive from Your Use of the Services:</h3>
                  <p>When you visit, use, or interact with the Services, we receive the following information about your visit, use, or interactions:</p>
                  <ul className="list-disc pl-4 pt-2 space-y-2">
                    <li>Log Data: Information that your browser or device automatically sends when you use our Services, including your Internet Protocol address, browser type and settings, date and time of your request, and how you interact with our Services.</li>
                    <li>Usage Data: Information about your use of the Services, such as the types of content you view or engage with, features you use, actions you take, time zone, country, dates and times of access, user agent and version, type of device, and your computer connection.</li>
                    <li>Device Information: Information about the device you use to access the Services, including device name, operating system, device identifiers, and browser type.</li>
                    <li>Location Information: We may determine the general area from which your device accesses our Services based on information like its IP address. Some Services allow you to provide more precise location information from your device.</li>
                    <li>Cookies and Similar Technologies: We use cookies and similar technologies to operate and administer our Services and improve your experience. For details about our use of cookies, please read our Cookie Notice.</li>
                    <li>Information from Other Sources: We may receive information from trusted partners, such as security partners, to protect against fraud and abuse, and from marketing vendors who provide information about potential customers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="data-use" className="scroll-mt-16" aria-labelledby="data-use-heading">
            <h2 id="data-use-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              2. How We Use Personal Data
            </h2>
            <div className="ml-2 sm:ml-4">
              <p className="mb-4">We may use Personal Data for the following purposes:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>To provide, analyze, and maintain our Services.</li>
                <li>To improve and develop our Services and conduct research.</li>
                <li>To communicate with you, including sending information about our Services and events.</li>
                <li>To prevent fraud, illegal activity, or misuse of our Services, and to protect the security of our systems.</li>
                <li>To comply with legal obligations and protect rights, privacy, safety, or property of our users, SuperChat LLC, or third parties.</li>
              </ul>
              <p className="mt-4">
                We may aggregate or de-identify Personal Data so that it no longer identifies you and use this information for the purposes described above. We will maintain and use de-identified information in de-identified form and will not attempt to reidentify the information unless required by law.
              </p>
            </div>
          </section>

          <section id="data-disclosure" className="scroll-mt-16" aria-labelledby="data-disclosure-heading">
            <h2 id="data-disclosure-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              3. Disclosure of Personal Data
            </h2>
            <div className="ml-2 sm:ml-4">
              <p className="mb-4">We may disclose your Personal Data in the following circumstances:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>Vendors and Service Providers: We may disclose Personal Data to vendors and service providers to assist us in meeting business operations needs and performing certain services.</li>
                <li>Business Transfers: In the event of a strategic transaction, reorganization, bankruptcy, or transition of service, your Personal Data may be disclosed and transferred as part of that transaction.</li>
                <li>Government Authorities or Other Third Parties: We may share your Personal Data with government authorities or other third parties as required by law or to protect our rights or property.</li>
                <li>Affiliates: We may disclose Personal Data to our affiliates, who may use it in a manner consistent with this Privacy Policy.</li>
                <li>Business Account Administrators: If you join a business account, administrators may access and control your account, including your Content.</li>
                <li>Other Users and Third Parties: Certain features allow you to interact or share information with other users or third parties. Information shared with third parties is governed by their own terms and privacy policies.</li>
              </ul>
            </div>
          </section>

          <section id="data-retention" className="scroll-mt-16" aria-labelledby="data-retention-heading">
            <h2 id="data-retention-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              4. Retention of Personal Data
            </h2>
            <div className="ml-2 sm:ml-4">
              <p className="mb-4">We will retain your Personal Data only as long as necessary to provide our Services or for other legitimate business purposes, such as resolving disputes or complying with legal obligations. The retention period will depend on various factors, including:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>The purpose for processing the data</li>
                <li>The nature and sensitivity of the information</li>
                <li>The potential risk of harm from unauthorized use</li>
                <li>Legal requirements we are subject to</li>
              </ul>
              <p className="mt-4">In some cases, the length of time we retain data may depend on your settings. For example, temporary chats may not appear in your history and will be kept for a limited time for safety purposes.</p>
            </div>
          </section>

          <section id="your-rights" className="scroll-mt-16" aria-labelledby="your-rights-heading">
            <h2 id="your-rights-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              5. Your Rights
            </h2>
            <div className="ml-2 sm:ml-4">
              <p className="mb-4">Depending on your location, you may have certain rights regarding your Personal Data, including:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>The right to access your Personal Data and information about how it is processed.</li>
                <li>The right to request deletion of your Personal Data.</li>
                <li>The right to update or correct your Personal Data</li>
                <li>The right to transfer your Personal Data to a third party.</li>
                <li>The right to restrict how we process your Personal Data</li>
                <li>The right to withdraw consent where we rely on consent for processing.</li>
                <li>The right to object to how we process your personal data.</li>
                <li>The right to lodge complaints with your local data protection authority.</li>
              </ul>
              <p className="mt-4">
                You can exercise some of these rights through your SuperChat account. If you cannot exercise your rights through your account, please submit your request through our designated privacy contact.
              </p>
            </div>
          </section>

          <section id="children" className="scroll-mt-16" aria-labelledby="children-heading">
            <h2 id="children-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              6. Children
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                Our Services are not directed to children under 13. We do not knowingly collect Personal Data from children under 13. If you believe that a child under 13 has provided Personal Data to us, please contact us, and we will take appropriate action to delete such information.
              </p>
            </div>
          </section>

          <section id="security" className="scroll-mt-16" aria-labelledby="security-heading">
            <h2 id="security-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              7. Security
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                We implement reasonable technical, administrative, and organizational measures to protect Personal Data from loss, misuse, and unauthorized access. However, no Internet or email transmission is completely secure. You should take care in deciding what information you provide to our Services.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-16" aria-labelledby="changes-heading">
            <h2 id="changes-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              8. Changes to the Privacy Policy
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                We may update this Privacy Policy from time to time. When we do, we will publish an updated version and effective date on this page. Your continued use of the Services after any changes constitutes your acceptance of the new policy.
              </p>
            </div>
          </section>

          <section id="contact" className="scroll-mt-16" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className={`text-xl sm:text-2xl font-bold mb-4 ${subHeadingStyle}`}>
              9. How to Contact Us
            </h2>
            <div className="ml-2 sm:ml-4">
              <p>
                If you have any questions or concerns regarding this Privacy Policy, please{' '}
                <Link 
                  to="/contactus"
                  className="inline-block transition-all duration-300 text-gray-700 hover:text-[#6F036C] hover:scale-105 cursor-pointer hover:underline decoration-[#6F036C]/50"
                  aria-label="Contact SuperChat Support"
                >
                  contact us
                </Link>.
              </p>
            </div>
          </section>
        </div>

        <footer className="text-center py-12 mt-8 border-t border-gray-200" role="contentinfo">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Thank you for choosing SuperChat LLC!
          </h2>
          <p className="mt-4 text-slate-600">
            Last updated: November 9, 2024
          </p>
        </footer>
      </main>
      
      <footer role="contentinfo">
        <LandingPage_Footer />
      </footer>
    </>
  );
};

// Add PropTypes validation if needed
// import PropTypes from 'prop-types';
// PrivacyPolicy.propTypes = {
//   // Add prop validations here
// };

export default PrivacyPolicy;