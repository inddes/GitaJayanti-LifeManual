import React from 'react';
import { BookOpen, Video, UserPlus } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

export const StepIn: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useScrollAnimation();
  const cardsRef = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            {t.stepIn.title}
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            {t.stepIn.description}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div ref={cardsRef.ref} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${cardsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a
              href="https://www.youtube.com/watch?v=TPSqthJ364o"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group block relative"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="relative h-64 bg-gradient-to-br from-spiritual-saffron/20 to-spiritual-gold/30 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-spiritual-gold/10 to-spiritual-saffron/20 animate-pulse"></div>
                <Video className="w-32 h-32 text-spiritual-gold opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" style={{ animationDuration: '3s' }} />
              </div>
              <div className="p-8 pointer-events-none">
                <h2 className="text-3xl font-bold text-spiritual-brown mb-4 group-hover:text-spiritual-gold transition-colors duration-300">
                  {t.stepIn.cards.exploreWisdom.title}
                </h2>
                <p className="text-lg text-spiritual-brown/70 mb-6">
                  {t.stepIn.cards.exploreWisdom.description}
                </p>
                <div className="flex items-center text-spiritual-gold font-semibold">
                  <span>{t.stepIn.cards.exploreWisdom.button}</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>

            <a
              href="https://gita3.keshavaswami.com/part-one-think-different/think-different"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group block relative"
              style={{ pointerEvents: 'auto' }}
            >
              <div className="relative h-64 bg-gradient-to-br from-spiritual-lightGold/30 to-spiritual-cream flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-spiritual-cream to-spiritual-lightGold/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <BookOpen className="w-32 h-32 text-spiritual-gold opacity-80 group-hover:opacity-100 transition-opacity duration-300 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              </div>
              <div className="p-8 pointer-events-none">
                <h2 className="text-3xl font-bold text-spiritual-brown mb-4 group-hover:text-spiritual-gold transition-colors duration-300">
                  {t.stepIn.cards.learnWisdom.title}
                </h2>
                <p className="text-lg text-spiritual-brown/70 mb-6">
                  {t.stepIn.cards.learnWisdom.description}
                </p>
                <div className="flex items-center text-spiritual-gold font-semibold">
                  <span>{t.stepIn.cards.learnWisdom.button}</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-spiritual-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-spiritual-brown mb-6">
            {t.stepIn.journeyBegins.title}
          </h2>
          <p className="text-lg text-spiritual-brown/80 leading-relaxed mb-8">
            {t.stepIn.journeyBegins.description}
          </p>
          <a
            href="https://www.thinkgita.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-lg px-12 py-4 bg-spiritual-gold text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-spiritual-gold/90"
            style={{ pointerEvents: 'auto' }}
          >
            <UserPlus className="w-6 h-6" style={{ pointerEvents: 'none' }} />
            <span style={{ pointerEvents: 'none' }}>{t.stepIn.journeyBegins.button}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
