import React from 'react';
import { Heart, Users, Target, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useScrollAnimation();
  const missionRef = useScrollAnimation();
  const valuesRef = useScrollAnimation();

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <Heart className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            {t.about.title}
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            {t.footer.description}
          </p>
        </div>
      </section>

      <section ref={missionRef.ref} className="py-16 bg-white">
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${missionRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <Target className="w-12 h-12 text-spiritual-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-spiritual-brown mb-4">{t.about.mission.title}</h2>
            <p className="text-lg text-spiritual-brown/70 leading-relaxed">
              {t.about.mission.description}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-spiritual-brown/80">
            <p className="mb-4">
              {t.about.approach.description}
            </p>
            <p className="mb-4">
              {t.about.commitment}
            </p>
          </div>
        </div>
      </section>

      <section ref={valuesRef.ref} className="py-16 bg-spiritual-cream">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${valuesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <Sparkles className="w-12 h-12 text-spiritual-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-spiritual-brown mb-4">Our Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-spiritual-gold/20 rounded-full mb-4">
                <Heart className="w-8 h-8 text-spiritual-gold" />
              </div>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">Compassion</h3>
              <p className="text-spiritual-brown/70">
                We approach every individual's spiritual journey with empathy, understanding, and non-judgment.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-spiritual-gold/20 rounded-full mb-4">
                <Target className="w-8 h-8 text-spiritual-gold" />
              </div>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">Authenticity</h3>
              <p className="text-spiritual-brown/70">
                We stay true to the original teachings while making them relevant and accessible for today's world.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-spiritual-gold/20 rounded-full mb-4">
                <Users className="w-8 h-8 text-spiritual-gold" />
              </div>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">Community</h3>
              <p className="text-spiritual-brown/70">
                We believe in the power of shared spiritual growth and supporting each other on this journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-spiritual-brown mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-spiritual-brown/70 leading-relaxed mb-8">
            Whether you're just beginning your spiritual journey or seeking to deepen your practice,
            we welcome you to explore our resources and join our growing community of mindful individuals.
          </p>
        </div>
      </section>
    </div>
  );
};
