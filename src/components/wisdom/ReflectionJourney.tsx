import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Save, Check } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import type { ReflectionQuestion } from '../../data/wisdomTopics';

interface ReflectionJourneyProps {
  questions: ReflectionQuestion[];
  topicSlug: string;
}

export const ReflectionJourney: React.FC<ReflectionJourneyProps> = ({ questions, topicSlug }) => {
  const ref = useScrollAnimation();
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError(null);

    try {
      const reflectionText = questions
        .map(q => `Q: ${q.question}\nA: ${answers[q.id] || '(not answered)'}`)
        .join('\n\n');

      const { error } = await supabase.from('journal_entries').insert({
        user_id: user.id,
        title: `Reflection: ${topicSlug}`,
        content: reflectionText,
        mood: 'reflective',
      });

      if (error) throw error;
      setSaved(true);
    } catch {
      setSaveError('Could not save your reflection. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    setSaved(false);
  }, [currentIndex]);

  return (
    <section id="reflect" className="py-20 md:py-28 bg-gradient-to-b from-spiritual-lightGold/30 to-spiritual-cream">
      <div
        ref={ref.ref}
        className={`max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          ref.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-8">
          <span className="text-5xl sm:text-6xl font-bold text-spiritual-gold/25 select-none block mb-2">
            03
          </span>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold">
            Reflect
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-10 leading-tight">
          Bring the wisdom into your life
        </h2>

        <div className="bg-white rounded-2xl border border-spiritual-gold/15 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="text-sm text-spiritual-brown/50 font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {questions.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-spiritual-gold' : 'w-1.5 bg-spiritual-gold/25'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-lg sm:text-xl font-semibold text-spiritual-brown mb-5 leading-snug">
            {currentQuestion.question}
          </h3>

          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Take your time. There are no right answers here."
            rows={5}
            className="w-full p-4 rounded-lg border border-spiritual-gold/20 bg-spiritual-cream/30 text-spiritual-brown text-base leading-relaxed resize-none focus:outline-none focus:border-spiritual-gold focus:ring-2 focus:ring-spiritual-gold/20 transition-colors"
            aria-label={currentQuestion.question}
          />

          <div className="flex items-center justify-between mt-6 gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={isFirst}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-spiritual-brown border border-spiritual-gold/25 rounded-lg transition-all duration-200 hover:bg-spiritual-gold/10 disabled:opacity-30 disabled:cursor-not-allowed lm-focus-ring"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                disabled={isLast}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-spiritual-brown border border-spiritual-gold/25 rounded-lg transition-all duration-200 hover:bg-spiritual-gold/10 disabled:opacity-30 disabled:cursor-not-allowed lm-focus-ring"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {user && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-spiritual-brown bg-spiritual-gold/20 rounded-lg transition-all duration-200 hover:bg-spiritual-gold/30 disabled:opacity-50 lm-focus-ring"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Reflection'}
                  </>
                )}
              </button>
            )}
          </div>

          {saveError && (
            <p className="mt-4 text-sm text-red-700/80" role="alert">{saveError}</p>
          )}

          {!user && (
            <p className="mt-4 text-xs text-spiritual-brown/45">
              Sign in to save your reflections to your private journal.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
