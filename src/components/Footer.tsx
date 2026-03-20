import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-spiritual-brown text-spiritual-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-spiritual-gold" />
              <span className="text-xl font-bold">lifemanual</span>
            </div>
            <p className="text-sm text-spiritual-cream/80">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-spiritual-gold">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/mindfulness')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.mindfulness}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/meditation')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.meditation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/soul-rejuvenation')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.soulRejuvenation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/stepin')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.stepIn}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-spiritual-gold">{t.footer.resources}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleLinkClick('/about')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/contact')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/privacy-policy')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.footer.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLinkClick('/terms-of-service')}
                  className="text-sm hover:text-spiritual-gold transition-colors text-left"
                >
                  {t.footer.termsOfService}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-spiritual-gold/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-spiritual-cream/60">
              {t.footer.copyright.replace('{year}', currentYear.toString())}
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-spiritual-cream/60 hover:text-spiritual-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-spiritual-cream/60 hover:text-spiritual-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-spiritual-cream/60 hover:text-spiritual-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-spiritual-cream/60 hover:text-spiritual-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
