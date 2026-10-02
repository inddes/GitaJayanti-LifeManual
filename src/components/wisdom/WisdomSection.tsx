import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ScriptureTeachingCard } from './ScriptureTeachingCard';
import type { ScriptureTeaching } from '../../data/wisdomTopics';

interface WisdomSectionProps {
  teachings: ScriptureTeaching[];
}

export const WisdomSection: React.FC<WisdomSectionProps> = ({ teachings }) => {
  const ref = useScrollAnimation();

  return (
    <section id="wisdom" className="py-20 md:py-28 bg-spiritual-cream">
      <div
        ref={ref.ref}
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-bold text-spiritual-gold/25 select-none block mb-2">
            02
          </span>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold">
            Wisdom from the Gita
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-4 leading-tight">
          What the Gita says about action, the mind, and steadiness
        </h2>

        <p className="text-base sm:text-lg text-spiritual-brown/70 mb-12 leading-relaxed">
          Each passage below is drawn directly from the Bhagavad Gita translations
          used in this application. The reflections that follow are LifeManual&rsquo;s
          commentary, clearly labeled so you always know which words are scripture
          and which are interpretation.
        </p>

        <div className="space-y-8">
          {teachings.map((teaching, idx) => (
            <ScriptureTeachingCard key={idx} teaching={teaching} />
          ))}
        </div>
      </div>
    </section>
  );
};
