import React from 'react';

const steps = ['Understand', 'Wisdom', 'Reflect', 'Practice', 'Go Deeper'] as const;

export const JourneyProgress: React.FC = () => {
  return (
    <div className="border-y border-spiritual-gold/15 bg-white/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <nav aria-label="Journey steps" className="overflow-x-auto">
          <ol className="flex items-center gap-1 sm:gap-2 min-w-max sm:min-w-0 sm:justify-center">
            {steps.map((label, idx) => (
              <React.Fragment key={label}>
                <li className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-medium text-spiritual-brown/55">
                    {label}
                  </span>
                </li>
                {idx < steps.length - 1 && (
                  <li aria-hidden="true">
                    <span className="text-spiritual-gold/40 select-none">
                      <span className="hidden sm:inline">{'\u2192'}</span>
                      <span className="sm:hidden">{'\u00B7'}</span>
                    </span>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
