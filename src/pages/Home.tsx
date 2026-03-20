import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, PenTool, ChevronDown } from 'lucide-react';
import { Card } from '../components/Card';
import { DailyWisdom } from '../components/DailyWisdom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const featuresRef = useScrollAnimation();
  const carouselRef = useScrollAnimation();

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="currentColor" className="text-spiritual-gold" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-spiritual-brown/20 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-spiritual-gold/20 backdrop-blur-sm border border-spiritual-gold/30">
              <span className="text-spiritual-brown font-semibold">{t.home.hero.welcome}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-spiritual-brown mb-6 leading-tight">
              {t.home.hero.title}
              <span className="block text-gradient">{t.home.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl md:text-2xl text-spiritual-brown/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t.home.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-spiritual-gold" />
        </div>
      </section>

      <section ref={carouselRef.ref} className="py-20 bg-white">
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${carouselRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex justify-center">
            <DailyWisdom />
          </div>
        </div>
      </section>

      <section ref={featuresRef.ref} className="py-20 bg-gradient-to-b from-white to-spiritual-cream">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${featuresRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-spiritual-brown text-center mb-16">
            {t.home.features.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/mindfulness" className="block h-full transform transition-all duration-300 hover:scale-105">
              <Card hover={true} className="h-full">
                <div className="flex flex-col items-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 bg-spiritual-gold/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-spiritual-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-spiritual-brown">{t.home.features.gita.title}</h3>
                  <p className="text-spiritual-brown/70">
                    {t.home.features.gita.description}
                  </p>
                </div>
              </Card>
            </Link>

            <Link to="/meditation" className="block h-full transform transition-all duration-300 hover:scale-105">
              <Card hover={true} className="h-full">
                <div className="flex flex-col items-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 bg-spiritual-gold/20 rounded-full flex items-center justify-center">
                    <Brain className="w-8 h-8 text-spiritual-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-spiritual-brown">{t.home.features.meditation.title}</h3>
                  <p className="text-spiritual-brown/70">
                    {t.home.features.meditation.description}
                  </p>
                </div>
              </Card>
            </Link>

            <a
              href="https://www.youtube.com/watch?v=A3WCGMh4wx0&list=PL-rHhgT5KVHc1W9OI1VzsWt-ER4hFUsSQ&index=1"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full transform transition-all duration-300 hover:scale-105"
            >
              <Card hover={true} className="h-full">
                <div className="flex flex-col items-center text-center space-y-4 h-full">
                  <div className="w-16 h-16 bg-spiritual-gold/20 rounded-full flex items-center justify-center">
                    <PenTool className="w-8 h-8 text-spiritual-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-spiritual-brown">{t.home.features.journaling.title}</h3>
                  <p className="text-spiritual-brown/70">
                    {t.home.features.journaling.description}
                  </p>
                </div>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
