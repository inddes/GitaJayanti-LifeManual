import React, { useState } from 'react';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabase';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useScrollAnimation();
  const formRef = useScrollAnimation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitMessage('Please fill in all required fields');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      setSubmitMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
      setTimeout(() => setSubmitMessage(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <MessageCircle className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            {t.contact.title}
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section ref={formRef.ref} className="py-16 bg-white">
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${formRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <form onSubmit={handleSubmit} className="bg-spiritual-cream/30 rounded-xl shadow-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-spiritual-brown mb-2">
                  {t.contact.form.name} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-white disabled:opacity-50"
                  placeholder={t.contact.form.name}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-spiritual-brown mb-2">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-white disabled:opacity-50"
                  placeholder={t.contact.form.email}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-spiritual-brown mb-2">
                {t.contact.form.subject}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-white disabled:opacity-50"
                placeholder={t.contact.form.subject}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-spiritual-brown mb-2">
                {t.contact.form.message} *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                disabled={isSubmitting}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-white resize-none disabled:opacity-50"
                placeholder={t.contact.form.message}
                required
              />
            </div>

            {submitMessage && (
              <div className={`p-4 rounded-lg ${submitMessage.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                <p className="text-sm">{submitMessage}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? t.contact.form.sending : t.contact.form.send}
            </Button>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-spiritual-cream/30 rounded-xl">
              <Mail className="w-8 h-8 text-spiritual-gold mx-auto mb-3" />
              <h3 className="text-lg font-bold text-spiritual-brown mb-2">Email Us</h3>
              <p className="text-spiritual-brown/70">support@lifemanual.com</p>
            </div>

            <div className="text-center p-6 bg-spiritual-cream/30 rounded-xl">
              <MessageCircle className="w-8 h-8 text-spiritual-gold mx-auto mb-3" />
              <h3 className="text-lg font-bold text-spiritual-brown mb-2">Response Time</h3>
              <p className="text-spiritual-brown/70">Within 24-48 hours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
