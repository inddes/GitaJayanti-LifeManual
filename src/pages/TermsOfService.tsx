import React from 'react';
import { FileText } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const TermsOfService: React.FC = () => {
  const heroRef = useScrollAnimation();
  const contentRef = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <FileText className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            Terms of Service
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
              Welcome to lifemanual. By accessing or using our platform, you agree to be bound by these Terms of Service.
              Please read them carefully before using our services.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-spiritual-brown/80 mb-6">
              By creating an account or using lifemanual, you acknowledge that you have read, understood, and agree to
              be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please
              do not use our services.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">2. Description of Service</h2>
            <p className="text-spiritual-brown/80 mb-6">
              lifemanual provides a digital platform for spiritual growth, mindfulness practices, meditation guidance,
              and access to teachings from the Bhagavad Gita and other spiritual resources. Our services include but
              are not limited to: guided meditations, journaling tools, festival information, and sacred mantras.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">3. User Accounts</h2>
            <p className="text-spiritual-brown/80 mb-4">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
              <li>Not share your account with others</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">4. User Conduct</h2>
            <p className="text-spiritual-brown/80 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-spiritual-brown/80 space-y-2 mb-6">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful code or malware</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Use the service to distribute spam or unsolicited messages</li>
            </ul>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">5. Intellectual Property</h2>
            <p className="text-spiritual-brown/80 mb-6">
              All content on lifemanual, including text, graphics, logos, images, audio clips, and software, is the
              property of lifemanual or its content suppliers and is protected by intellectual property laws. You may
              not reproduce, distribute, modify, or create derivative works without our express written permission.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">6. User-Generated Content</h2>
            <p className="text-spiritual-brown/80 mb-6">
              You retain ownership of any content you create on our platform (such as journal entries). By using our
              service, you grant us a license to store, display, and process your content solely for the purpose of
              providing our services to you. We will not share your personal journal entries or private content with
              third parties without your consent.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-spiritual-brown/80 mb-6">
              Our services are provided "as is" without warranties of any kind, either express or implied. We do not
              guarantee that our services will be uninterrupted, error-free, or secure. The spiritual guidance and
              meditation practices provided are for informational purposes only and should not replace professional
              medical or mental health advice.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-spiritual-brown/80 mb-6">
              To the fullest extent permitted by law, lifemanual shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">9. Termination</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We reserve the right to suspend or terminate your account at any time for violations of these Terms of
              Service or for any other reason at our sole discretion. You may also terminate your account at any time
              by contacting us. Upon termination, your right to use the service will immediately cease.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-spiritual-brown/80 mb-6">
              We may modify these Terms of Service at any time. We will notify users of significant changes by posting
              the updated terms on our platform. Your continued use of the service after such modifications constitutes
              acceptance of the updated terms.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">11. Governing Law</h2>
            <p className="text-spiritual-brown/80 mb-6">
              These Terms of Service shall be governed by and construed in accordance with applicable laws, without
              regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-bold text-spiritual-brown mt-8 mb-4">12. Contact Information</h2>
            <p className="text-spiritual-brown/80 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:legal@lifemanual.com" className="text-spiritual-gold hover:underline">
                legal@lifemanual.com
              </a>
            </p>

            <p className="text-spiritual-brown/80 mt-8 pt-8 border-t border-spiritual-gold/20">
              By using lifemanual, you acknowledge that you have read and understood these Terms of Service and agree
              to be bound by them.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
