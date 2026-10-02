import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  Compass,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { DailyWisdom } from '../components/DailyWisdom';
import { ContinueJourney } from '../components/ContinueJourney';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { lifeTopics, journeyCards, beginnerSteps } from '../data/homepageData';

export const Home: React.FC = () => {
  const heroRef = useScrollAnimation();
  const topicsRef = useScrollAnimation();
  const journeyRef = useScrollAnimation();
  const wisdomRef = useScrollAnimation();
  const beginnerRef = useScrollAnimation();
  const trustRef = useScrollAnimation();

  const scrollToTopics = () => {
    const el = document.getElementById('what-are-you-facing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* ─────────── Section 1: Hero ─────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
          <div className="absolute inset-0 opacity-[0.07]">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hero-dots" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                  <circle cx="24" cy="24" r="1" fill="currentColor" className="text-spiritual-gold" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-dots)" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-spiritual-cream to-transparent" />

        <div
          ref={heroRef.ref}
          className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-spiritual-gold mb-6">
            Ancient Wisdom &middot; Modern Life
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-spiritual-brown mb-6 leading-[1.15]">
            Ancient wisdom for the
            <span className="block text-gradient mt-1">life you're living today.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-spiritual-brown/75 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore the Bhagavad Gita as a practical guide to understanding yourself,
            mastering the mind, navigating life's challenges, and discovering deeper
            purpose.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/mindfulness"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-spiritual-brown text-spiritual-cream rounded-lg font-semibold transition-all duration-300 hover:bg-spiritual-darkBrown hover:shadow-lg lm-focus-ring"
            >
              Explore the Gita
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={scrollToTopics}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-spiritual-gold/40 text-spiritual-brown rounded-lg font-semibold transition-all duration-300 hover:border-spiritual-gold hover:bg-spiritual-gold/10 lm-focus-ring"
            >
              Find Wisdom for My Situation
            </button>
          </div>
        </div>

        <button
          onClick={scrollToTopics}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-spiritual-gold/60 hover:text-spiritual-gold transition-colors lm-focus-ring"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </section>

      {/* ─────────── Section 2: What Are You Facing? ─────────── */}
      <section
        id="what-are-you-facing"
        className="py-20 md:py-28 bg-white"
      >
        <div
          ref={topicsRef.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            topicsRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-spiritual-brown mb-4 leading-tight">
              What are you facing right now?
            </h2>
            <p className="text-base sm:text-lg text-spiritual-brown/70 max-w-2xl mx-auto">
              Begin with your life. Discover what timeless wisdom says about it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {lifeTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.id}
                  to={topic.link}
                  className="group block bg-spiritual-cream/40 rounded-xl border border-spiritual-gold/15 p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:shadow-lg hover:border-spiritual-gold/30 hover:-translate-y-1 lm-focus-ring"
                >
                  <div className="flex flex-col h-full">
                    <div className="w-11 h-11 bg-spiritual-gold/15 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-spiritual-gold/25">
                      <Icon className="w-5 h-5 text-spiritual-gold" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-spiritual-brown mb-1.5">
                      {topic.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-spiritual-brown/60 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Section 3: Choose Your Journey ─────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-spiritual-cream to-spiritual-lightGold/40">
        <div
          ref={journeyRef.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            journeyRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-spiritual-brown mb-4 leading-tight">
              Choose your journey
            </h2>
            <p className="text-base sm:text-lg text-spiritual-brown/70 max-w-2xl mx-auto">
              Three ways to begin exploring the wisdom of the Bhagavad Gita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {journeyCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  to={card.link}
                  className="group relative block bg-white rounded-2xl shadow-md border border-spiritual-gold/10 p-8 transition-all duration-300 hover:shadow-xl hover:border-spiritual-gold/25 hover:-translate-y-2 lm-focus-ring"
                >
                  <div className="absolute top-6 right-6 text-6xl font-bold text-spiritual-gold/10 select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  <div className="relative">
                    <div className="w-14 h-14 bg-spiritual-gold/15 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-spiritual-gold/25">
                      <Icon className="w-7 h-7 text-spiritual-gold" />
                    </div>

                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-spiritual-gold mb-2">
                      {card.label}
                    </p>

                    <h3 className="text-xl sm:text-2xl font-bold text-spiritual-brown mb-3 leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-spiritual-brown/65 leading-relaxed mb-6">
                      {card.description}
                    </p>

                    <div className="flex items-center gap-2 text-spiritual-gold font-semibold text-sm">
                      <span>Begin</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Section 4: Wisdom for Today ─────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div
          ref={wisdomRef.ref}
          className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            wisdomRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold mb-3">
              Daily Verse
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-spiritual-brown leading-tight">
              Wisdom for Today
            </h2>
          </div>

          <div className="flex justify-center">
            <DailyWisdom />
          </div>
        </div>
      </section>

      {/* ─────────── Section 5: Beginner Journey ─────────── */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-spiritual-darkBrown via-spiritual-brown to-spiritual-darkBrown relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="beginner-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" className="text-spiritual-gold" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#beginner-dots)" />
          </svg>
        </div>

        <div
          ref={beginnerRef.ref}
          className={`relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            beginnerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-spiritual-gold mb-4">
              New Here?
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-spiritual-cream mb-6 leading-tight">
              New to the Bhagavad Gita?
            </h2>
            <p className="text-base sm:text-lg text-spiritual-cream/75 max-w-2xl mx-auto leading-relaxed">
              You don't need to know Sanskrit or Indian philosophy to begin.
              Start with the questions the Gita was written to illuminate.
            </p>
          </div>

          <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {beginnerSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center gap-3 bg-spiritual-cream/10 backdrop-blur-sm rounded-lg border border-spiritual-gold/15 p-4 transition-all duration-300 hover:bg-spiritual-cream/15 hover:border-spiritual-gold/30"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-spiritual-gold/20 rounded-full flex items-center justify-center text-spiritual-gold font-bold text-sm">
                    {step.number}
                  </span>
                  <span className="text-sm sm:text-base text-spiritual-cream/90 font-medium leading-snug">
                    {step.question}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/mindfulness"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-spiritual-gold text-spiritual-brown rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:bg-spiritual-saffron lm-focus-ring"
            >
              Start the Beginner Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── Section 6: Continue Your Journey (conditional) ─────────── */}
      <ContinueJourney />

      {/* ─────────── Section 7: Trust / Authenticity ─────────── */}
      <section className="py-20 md:py-28 bg-spiritual-cream">
        <div
          ref={trustRef.ref}
          className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
            trustRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-spiritual-gold/20 rounded-full blur-xl" />
              <Compass className="w-12 h-12 text-spiritual-gold relative" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-12 bg-spiritual-gold/40" />
            <Sparkles className="w-4 h-4 text-spiritual-gold" />
            <span className="h-px w-12 bg-spiritual-gold/40" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-spiritual-brown mb-6 leading-tight">
            Wisdom rooted in scripture
          </h2>

          <p className="text-base sm:text-lg text-spiritual-brown/70 leading-relaxed max-w-2xl mx-auto">
            LifeManual aims to help seekers understand the teachings of the Bhagavad Gita
            in their original context and apply them thoughtfully to everyday life. We
            are not a religious organization, a guru lineage, or a substitute for
            professional guidance. We are a study companion for anyone who wants to
            explore this timeless text with sincerity and clarity.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-spiritual-brown/50">
            <BookOpen className="w-4 h-4" />
            <span>Bhagavad Gita As It Is &middot; A.C. Bhaktivedanta Swami Prabhupada</span>
          </div>
        </div>
      </section>
    </div>
  );
};
