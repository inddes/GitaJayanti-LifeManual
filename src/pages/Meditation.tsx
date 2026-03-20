import React, { useState, useEffect } from 'react';
import { Brain, Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import YouTubePlayerCard from '../components/YouTubePlayerCard';

const presetDurations = [5, 10, 15, 20, 30];

export const Meditation: React.FC = () => {
  const { t } = useLanguage();
  const [duration, setDuration] = useState(10);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const heroRef = useScrollAnimation();
  const timerRef = useScrollAnimation();
  const videoRef = useScrollAnimation();

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            handleSessionComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    setCompletedSessions(prev => prev + 1);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;


  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <Brain className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            {t.meditation.title}
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            {t.meditation.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-8">
            <Button
              variant="primary"
              onClick={() => window.open('https://www.youtube.com/watch?v=sfSDQRdIvTc&list=PLe1px9-uNQTqk7Ks-dMlHpd0HuRjUs52n', '_blank')}
              className="text-lg px-8 py-4"
            >
              {t.meditation.watchButton}
            </Button>
          </div>
          <div ref={videoRef.ref} className={`transition-all duration-700 ${videoRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <YouTubePlayerCard
              videoId="sfSDQRdIvTc"
              title="Guided Meditation"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-spiritual-cream/30">
        <div ref={timerRef.ref} className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${timerRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="text-center" hover={false}>
                <div className="py-12">
                  <div className="relative inline-block mb-8">
                    <svg className="w-64 h-64 transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-spiritual-cream"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 120}`}
                        strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                        className="text-spiritual-gold transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold text-spiritual-brown">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="primary"
                      onClick={toggleTimer}
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                    >
                      {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={resetTimer}
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </Button>
                  </div>

                  <div className="mt-12">
                    <h3 className="text-lg font-semibold text-spiritual-brown mb-4">
                      {t.meditation.timer.selectDuration}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      {presetDurations.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => {
                            if (!isActive) {
                              setDuration(preset);
                            }
                          }}
                          disabled={isActive}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            duration === preset
                              ? 'bg-spiritual-gold text-spiritual-brown shadow-lg'
                              : 'bg-spiritual-cream text-spiritual-brown hover:bg-spiritual-lightGold'
                          } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card hover={false}>
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-spiritual-gold" />
                  <h3 className="text-xl font-bold text-spiritual-brown">{t.meditation.progress.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-spiritual-brown/60 mb-1">{t.meditation.progress.completedSessions}</p>
                    <p className="text-3xl font-bold text-spiritual-gold">{completedSessions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-spiritual-brown/60 mb-1">{t.meditation.progress.totalMinutes}</p>
                    <p className="text-3xl font-bold text-spiritual-gold">
                      {completedSessions * 10}
                    </p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <h3 className="text-lg font-bold text-spiritual-brown mb-4">{t.meditation.tips.title}</h3>
                <ul className="space-y-3 text-sm text-spiritual-brown/80">
                  {t.meditation.tips.items.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-spiritual-gold mr-2">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-spiritual-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-spiritual-brown text-center mb-12">
            {t.meditation.practices.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">{t.meditation.practices.breathAwareness.title}</h3>
              <p className="text-spiritual-brown/70 mb-4">
                {t.meditation.practices.breathAwareness.description}
              </p>
              <Button variant="ghost" className="w-full">{t.meditation.comingSoon}</Button>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">{t.meditation.practices.bodyScan.title}</h3>
              <p className="text-spiritual-brown/70 mb-4">
                {t.meditation.practices.bodyScan.description}
              </p>
              <Button variant="ghost" className="w-full">{t.meditation.comingSoon}</Button>
            </Card>
            <Card>
              <h3 className="text-xl font-bold text-spiritual-brown mb-3">{t.meditation.practices.lovingKindness.title}</h3>
              <p className="text-spiritual-brown/70 mb-4">
                {t.meditation.practices.lovingKindness.description}
              </p>
              <Button variant="ghost" className="w-full">{t.meditation.comingSoon}</Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
