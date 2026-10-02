import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { WisdomTopic } from '../../data/wisdomTopics';

interface UnderstandingSectionProps {
  topic: WisdomTopic;
}

export const UnderstandingSection: React.FC<UnderstandingSectionProps> = ({ topic }) => {
  const ref = useScrollAnimation();

  return (
    <section id="understand" className="py-20 md:py-28 bg-white">
      <div
        ref={ref.ref}
        className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-bold text-spiritual-gold/25 select-none block mb-2">
            01
          </span>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold">
            Understand
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-6 leading-tight">
          {topic.understanding.heading}
        </h2>

        <div className="space-y-5">
          {topic.understanding.paragraphs.map((para, idx) => (
            <p key={idx} className="text-base sm:text-lg text-spiritual-brown/75 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <blockquote className="mt-8 pl-5 border-l-2 border-spiritual-gold/40">
          <p className="text-base sm:text-lg text-spiritual-brown italic leading-relaxed">
            {topic.understanding.transition}
          </p>
        </blockquote>
      </div>
    </section>
  );
};
