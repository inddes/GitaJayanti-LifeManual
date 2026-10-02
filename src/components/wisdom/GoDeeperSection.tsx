import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { RelatedContentLink } from '../../data/wisdomTopics';

interface GoDeeperSectionProps {
  links: RelatedContentLink[];
}

export const GoDeeperSection: React.FC<GoDeeperSectionProps> = ({ links }) => {
  const ref = useScrollAnimation();

  return (
    <section id="go-deeper" className="py-20 md:py-28 bg-gradient-to-b from-spiritual-cream to-spiritual-lightGold/30">
      <div
        ref={ref.ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-bold text-spiritual-gold/25 select-none block mb-2">
            05
          </span>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold">
            Go Deeper
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-10 leading-tight">
          Continue exploring
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {links.map((item, idx) => {
            const isHashLink = item.link.includes('#');
            const linkProps = isHashLink
              ? { to: item.link.split('#')[0] }
              : { to: item.link };

            return (
              <Link
                key={idx}
                {...linkProps}
                className="group block bg-white rounded-xl border border-spiritual-gold/15 p-6 transition-all duration-300 hover:shadow-md hover:border-spiritual-gold/30 lm-focus-ring"
              >
                <h3 className="text-base sm:text-lg font-semibold text-spiritual-brown mb-2 leading-snug">
                  {item.label}
                </h3>
                <p className="text-sm text-spiritual-brown/60 leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-medium text-spiritual-gold">
                  <span>Go</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
