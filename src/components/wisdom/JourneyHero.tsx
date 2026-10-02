import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock, ArrowRight } from 'lucide-react';
import type { WisdomTopic } from '../../data/wisdomTopics';

interface JourneyHeroProps {
  topic: WisdomTopic;
}

export const JourneyHero: React.FC<JourneyHeroProps> = ({ topic }) => {
  const scrollToUnderstanding = () => {
    const el = document.getElementById('understand');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-topic-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="1" fill="currentColor" className="text-spiritual-gold" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-topic-dots)" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-spiritual-cream to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-spiritual-brown/50 mb-8">
          <Link to="/" className="hover:text-spiritual-brown transition-colors lm-focus-ring">
            Wisdom for Life
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-spiritual-brown font-medium">{topic.title}</span>
        </nav>

        <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-spiritual-gold mb-5">
          {topic.eyebrow}
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-spiritual-brown mb-6 leading-[1.2]">
          {topic.headline}
        </h1>

        <p className="text-base sm:text-lg text-spiritual-brown/75 mb-8 max-w-2xl leading-relaxed">
          {topic.introduction}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          <button
            onClick={scrollToUnderstanding}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-spiritual-brown text-spiritual-cream rounded-lg font-semibold transition-all duration-300 hover:bg-spiritual-darkBrown hover:shadow-lg lm-focus-ring"
          >
            Begin the Journey
            <ArrowRight className="w-5 h-5" />
          </button>
          <span className="inline-flex items-center gap-2 text-sm text-spiritual-brown/55">
            <Clock className="w-4 h-4" />
            {topic.durationLabel}
          </span>
        </div>
      </div>
    </section>
  );
};
