import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ProgressInfo {
  type: 'meditation' | 'journal';
  title: string;
  detail: string;
  link: string;
}

export const ContinueJourney: React.FC = () => {
  const { user, loading } = useAuth();
  const [progress, setProgress] = useState<ProgressInfo | null>(null);
  const [checked, setChecked] = useState(false);
  const animRef = useScrollAnimation();

  useEffect(() => {
    if (loading || !user) {
      setChecked(true);
      return;
    }

    (async () => {
      try {
        const { data: sessions } = await supabase
          .from('meditation_sessions')
          .select('duration, type, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        const { data: entries } = await supabase
          .from('journal_entries')
          .select('title, mood, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        const session = sessions?.[0];
        const entry = entries?.[0];

        if (session && entry) {
          const sDate = new Date(session.created_at);
          const eDate = new Date(entry.created_at);
          if (sDate >= eDate) {
            setProgress({
              type: 'meditation',
              title: 'Meditation session',
              detail: `${session.duration} min · ${session.type}`,
              link: '/meditation',
            });
          } else {
            setProgress({
              type: 'journal',
              title: entry.title || 'Journal entry',
              detail: `Mood: ${entry.mood || 'reflective'}`,
              link: '/mindfulness',
            });
          }
        } else if (session) {
          setProgress({
            type: 'meditation',
            title: 'Meditation session',
            detail: `${session.duration} min · ${session.type}`,
            link: '/meditation',
          });
        } else if (entry) {
          setProgress({
            type: 'journal',
            title: entry.title || 'Journal entry',
            detail: `Mood: ${entry.mood || 'reflective'}`,
            link: '/mindfulness',
          });
        }
      } catch {
        // Silently fail -- section stays hidden
      } finally {
        setChecked(true);
      }
    })();
  }, [user, loading]);

  if (!checked || !progress) {
    return null;
  }

  const Icon = progress.type === 'meditation' ? Clock : BookOpen;

  return (
    <section className="py-20 bg-gradient-to-b from-spiritual-cream to-white">
      <div
        ref={animRef.ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          animRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold mb-3">
            Welcome back
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-spiritual-brown">
            Continue Your Journey
          </h2>
        </div>

        <Link
          to={progress.link}
          className="group block bg-white rounded-2xl shadow-lg border border-spiritual-gold/15 p-8 hover:shadow-xl hover:border-spiritual-gold/30 transition-all duration-300"
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 w-14 h-14 bg-spiritual-gold/15 rounded-xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-spiritual-gold" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm text-spiritual-brown/50 mb-1">Most recent activity</p>
              <h3 className="text-lg font-semibold text-spiritual-brown truncate">{progress.title}</h3>
              <p className="text-sm text-spiritual-brown/60">{progress.detail}</p>
            </div>
            <ArrowRight className="w-6 h-6 text-spiritual-gold flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </Link>
      </div>
    </section>
  );
};
