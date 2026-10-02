import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Check } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import type { PracticeStep } from '../../data/wisdomTopics';

interface GuidedPracticeProps {
  heading: string;
  intro: string;
  steps: PracticeStep[];
  intention: string;
  durationSeconds: number;
}

type Phase = 'idle' | 'running' | 'paused' | 'finished';

export const GuidedPractice: React.FC<GuidedPracticeProps> = ({
  heading,
  intro,
  steps,
  intention,
  durationSeconds,
}) => {
  const ref = useScrollAnimation();
  const [phase, setPhase] = useState<Phase>('idle');
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prefersReducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (phase === 'running') {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearTimer();
            setPhase('finished');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [phase]);

  const handleBegin = useCallback(() => {
    setSecondsLeft(durationSeconds);
    setPhase('running');
  }, [durationSeconds]);

  const handlePause = useCallback(() => {
    setPhase(prev => (prev === 'running' ? 'paused' : prev));
    clearTimer();
  }, []);

  const handleResume = useCallback(() => {
    setPhase('running');
  }, []);

  const handleFinish = useCallback(() => {
    clearTimer();
    setSecondsLeft(0);
    setPhase('finished');
  }, []);

  const handleReset = useCallback(() => {
    clearTimer();
    setSecondsLeft(durationSeconds);
    setPhase('idle');
  }, [durationSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeDisplay = `${minutes}:${String(secs).padStart(2, '0')}`;
  const progress = ((durationSeconds - secondsLeft) / durationSeconds) * 100;

  return (
    <section id="practice" className="py-20 md:py-28 bg-white">
      <div
        ref={ref.ref}
        className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-bold text-spiritual-gold/25 select-none block mb-2">
            04
          </span>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold">
            Practice
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-4 leading-tight">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-spiritual-brown/70 mb-10 leading-relaxed">
          {intro}
        </p>

        {/* Steps list */}
        <ol className="space-y-3 mb-10">
          {steps.map((step) => (
            <li key={step.number} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-spiritual-gold/15 rounded-full flex items-center justify-center text-spiritual-gold font-bold text-xs mt-0.5">
                {step.number}
              </span>
              <span className="text-sm sm:text-base text-spiritual-brown/80 leading-relaxed">
                {step.text}
              </span>
            </li>
          ))}
        </ol>

        {/* Timer */}
        <div className="bg-spiritual-cream/40 rounded-2xl border border-spiritual-gold/15 p-6 sm:p-8">
          <div className="text-center mb-6">
            <p className="text-sm text-spiritual-brown/50 mb-2">
              {phase === 'idle' && 'Ready when you are'}
              {phase === 'running' && 'In progress'}
              {phase === 'paused' && 'Paused'}
              {phase === 'finished' && 'Complete'}
            </p>
            <div
              className={`text-5xl sm:text-6xl font-bold text-spiritual-brown tabular-nums ${
                phase === 'running' && !prefersReducedMotion ? 'transition-transform' : ''
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {timeDisplay}
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-spiritual-gold/15 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-spiritual-gold rounded-full"
              style={{
                width: `${phase === 'finished' ? 100 : progress}%`,
                transition: prefersReducedMotion ? 'none' : 'width 1s linear',
              }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {phase === 'idle' && (
              <button
                onClick={handleBegin}
                className="inline-flex items-center gap-2 px-6 py-3 bg-spiritual-brown text-spiritual-cream rounded-lg font-semibold transition-all duration-300 hover:bg-spiritual-darkBrown hover:shadow-lg lm-focus-ring"
              >
                <Play className="w-5 h-5" />
                Begin Practice
              </button>
            )}

            {phase === 'running' && (
              <button
                onClick={handlePause}
                className="inline-flex items-center gap-2 px-6 py-3 bg-spiritual-brown text-spiritual-cream rounded-lg font-semibold transition-all duration-300 hover:bg-spiritual-darkBrown lm-focus-ring"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
            )}

            {phase === 'paused' && (
              <button
                onClick={handleResume}
                className="inline-flex items-center gap-2 px-6 py-3 bg-spiritual-brown text-spiritual-cream rounded-lg font-semibold transition-all duration-300 hover:bg-spiritual-darkBrown lm-focus-ring"
              >
                <Play className="w-5 h-5" />
                Resume
              </button>
            )}

            {(phase === 'running' || phase === 'paused') && (
              <button
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-spiritual-gold/40 text-spiritual-brown rounded-lg font-semibold transition-all duration-300 hover:border-spiritual-gold hover:bg-spiritual-gold/10 lm-focus-ring"
              >
                <Check className="w-5 h-5" />
                Finish
              </button>
            )}

            {phase === 'finished' && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-spiritual-gold/40 text-spiritual-brown rounded-lg font-semibold transition-all duration-300 hover:border-spiritual-gold hover:bg-spiritual-gold/10 lm-focus-ring"
              >
                Begin Again
              </button>
            )}
          </div>

          {phase === 'finished' && (
            <p className="text-center mt-6 text-base sm:text-lg text-spiritual-brown italic leading-relaxed">
              {intention}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
