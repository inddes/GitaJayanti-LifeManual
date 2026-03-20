import React from 'react';
import { Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const PrivacyPolicy: React.FC = () => {
  const heroRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <Shield className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            Last updated: December 5, 2025
          </p>
        </div>
      </section>

      <section ref={contentRef.ref} className="py-16 bg-white">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${contentRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="prose prose-lg max-w-none">
            <p className="text-spiritual-brown/80 mb-6">
              At lifemanual, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Information We Collect</h2>
            <p className="text-spiritual-brown/80 mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>Account information (name, email address) when you create an account</li>
              <li>Profile information and preferences</li>
              <li>Journal entries and meditation session data</li>
              <li>Newsletter subscription email addresses</li>
              <li>Contact form submissions</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-spiritual-brown/80 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and deliver relevant content</li>
              <li>Send you newsletters and updates (with your consent)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns to enhance our platform</li>
              <li>Protect against fraud and ensure platform security</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Data Security</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We implement appropriate technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. Your data is stored securely using
              industry-standard encryption and security protocols.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Data Sharing</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Your Rights</h2>
            <p className="text-spiritual-brown/80 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>Access and review your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Cookies and Tracking</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns,
              and deliver personalized content. You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Children's Privacy</h2>
            <p className="text-spiritual-brown/80 mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal
              information from children. If you believe we have collected information from a child, please contact us
              immediately.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by
              posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">Contact Us</h2>
            <p className="text-spiritual-brown/80 mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              <br />
              <a href="mailto:privacy@lifemanual.com" className="text-spiritual-gold hover:underline">
                privacy@lifemanual.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
