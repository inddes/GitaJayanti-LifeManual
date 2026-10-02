import React from 'react';
import { Info } from 'lucide-react';

export const SeekerSafetyNote: React.FC = () => {
  return (
    <section className="py-12 bg-spiritual-cream">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 bg-white/60 rounded-lg border border-spiritual-gold/10 p-5">
          <Info className="w-5 h-5 text-spiritual-brown/40 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-spiritual-brown/60 leading-relaxed">
            LifeManual offers spiritual education and reflection, not medical or
            mental-health treatment. If you are struggling severely or feel unsafe,
            please seek appropriate professional or emergency support.
          </p>
        </div>
      </div>
    </section>
  );
};
