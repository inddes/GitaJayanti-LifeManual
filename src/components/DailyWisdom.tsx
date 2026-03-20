import React, { useEffect, useState } from 'react';

interface VerseData {
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
  purport: string;
  url: string;
}

const VERSE_SCHEDULE = [
  { ch: 1, v: 1, theme: "temple" },
  { ch: 1, v: 21, theme: "mountain" },
  { ch: 2, v: 3, theme: "sunrise" },
  { ch: 2, v: 14, theme: "river" },
  { ch: 2, v: 17, theme: "cosmic" },
  { ch: 2, v: 20, theme: "cosmic" },
  { ch: 2, v: 22, theme: "sunrise" },
  { ch: 2, v: 47, theme: "diya" },
  { ch: 2, v: 48, theme: "river" },
  { ch: 2, v: 50, theme: "lotus" },
  { ch: 3, v: 8, theme: "forest" },
  { ch: 3, v: 16, theme: "river" },
  { ch: 3, v: 21, theme: "temple" },
  { ch: 3, v: 27, theme: "cosmic" },
  { ch: 4, v: 7, theme: "sunrise" },
  { ch: 4, v: 11, theme: "mandala" },
  { ch: 4, v: 18, theme: "meditation" },
  { ch: 4, v: 34, theme: "forest" },
  { ch: 5, v: 10, theme: "lotus" },
  { ch: 5, v: 18, theme: "peacock" },
  { ch: 6, v: 5, theme: "mountain" },
  { ch: 6, v: 17, theme: "meditation" },
  { ch: 6, v: 19, theme: "diya" },
  { ch: 6, v: 34, theme: "river" },
  { ch: 7, v: 8, theme: "sunrise" },
  { ch: 7, v: 19, theme: "forest" },
  { ch: 8, v: 5, theme: "cosmic" },
  { ch: 9, v: 22, theme: "diya" },
  { ch: 9, v: 26, theme: "lotus" },
  { ch: 10, v: 8, theme: "mandala" },
  { ch: 10, v: 20, theme: "meditation" },
  { ch: 12, v: 13, theme: "peacock" },
  { ch: 12, v: 15, theme: "forest" },
  { ch: 13, v: 8, theme: "temple" },
  { ch: 13, v: 28, theme: "mandala" },
  { ch: 14, v: 5, theme: "cosmic" },
  { ch: 15, v: 1, theme: "forest" },
  { ch: 15, v: 15, theme: "meditation" },
  { ch: 16, v: 1, theme: "sunrise" },
  { ch: 16, v: 21, theme: "diya" },
  { ch: 17, v: 15, theme: "peacock" },
  { ch: 17, v: 16, theme: "mountain" },
  { ch: 18, v: 5, theme: "temple" },
  { ch: 18, v: 20, theme: "cosmic" },
  { ch: 18, v: 37, theme: "sunrise" },
  { ch: 18, v: 41, theme: "mandala" },
  { ch: 18, v: 61, theme: "meditation" },
  { ch: 18, v: 63, theme: "forest" },
  { ch: 18, v: 65, theme: "lotus" },
  { ch: 18, v: 66, theme: "diya" }
];

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  return Math.ceil((date.getTime() - start.getTime()) / 86400000);
}

function buildYearMap() {
  const total = VERSE_SCHEDULE.length;
  const map: number[] = [];
  for (let day = 1; day <= 365; day++) {
    const idx = Math.round(((day - 1) * total) / 365) % total;
    map.push(idx);
  }
  return map;
}

const YEAR_MAP = buildYearMap();

const SVG_ART: Record<string, string> = {
  sunrise: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><radialGradient id="s1sky" cx="50%" cy="100%" r="100%"><stop offset="0%" stop-color="#f5a623"/><stop offset="30%" stop-color="#c0392b"/><stop offset="70%" stop-color="#6b1f3e"/><stop offset="100%" stop-color="#0d0620"/></radialGradient><radialGradient id="s1sun" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff3b0"/><stop offset="40%" stop-color="#ffd54f"/><stop offset="100%" stop-color="#f5a623" stop-opacity="0"/></radialGradient><radialGradient id="s1glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ff8c00" stop-opacity="0.5"/><stop offset="100%" stop-color="#ff8c00" stop-opacity="0"/></radialGradient></defs><rect width="720" height="240" fill="url(#s1sky)"/><circle cx="80" cy="25" r="1.2" fill="#fff" opacity=".7"/><circle cx="150" cy="15" r=".8" fill="#fff" opacity=".5"/><circle cx="250" cy="30" r="1" fill="#fff" opacity=".6"/><circle cx="380" cy="10" r="1.3" fill="#fff" opacity=".4"/><circle cx="500" cy="22" r=".9" fill="#fff" opacity=".6"/><ellipse cx="360" cy="200" rx="260" ry="120" fill="url(#s1glow)"/><circle cx="360" cy="200" r="120" fill="url(#s1sun)"/><circle cx="360" cy="200" r="38" fill="#fff8dc" opacity=".95"/><circle cx="360" cy="200" r="28" fill="#ffe57f"/><rect x="0" y="198" width="720" height="2" fill="#f5a623" opacity=".4"/><rect x="0" y="200" width="720" height="40" fill="#0d0620" opacity=".7"/></svg>`,

  lotus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="ltbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1a0a2e"/><stop offset="50%" stop-color="#2d1b4e"/><stop offset="100%" stop-color="#0d1f3c"/></linearGradient></defs><rect width="720" height="240" fill="url(#ltbg)"/><circle cx="360" cy="60" r="30" fill="#fffde7" opacity=".95"/><rect x="0" y="170" width="720" height="70" fill="#1a237e" opacity=".4"/><circle cx="360" cy="165" r="15" fill="#ffcc02"/><circle cx="360" cy="165" r="9" fill="#ff8f00"/><ellipse cx="200" cy="185" rx="45" ry="15" fill="#1b5e20" opacity=".7"/></svg>`,

  forest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="frbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0d2818"/><stop offset="40%" stop-color="#1a3a20"/><stop offset="100%" stop-color="#0a1e10"/></linearGradient></defs><rect width="720" height="240" fill="url(#frbg)"/><rect x="60" y="60" width="8" height="180" fill="#0a1a0a" opacity=".9"/><ellipse cx="65" cy="60" rx="30" ry="25" fill="#1b4d2a" opacity=".8"/><ellipse cx="65" cy="55" rx="22" ry="20" fill="#2e7d32" opacity=".7"/><rect x="0" y="200" width="720" height="40" fill="#071209" opacity=".9"/><polygon points="340,0 380,0 460,240 300,240" fill="#ffd54f" opacity=".04"/></svg>`,

  mandala: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><radialGradient id="mgbg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#1a0800"/><stop offset="60%" stop-color="#0d0500"/><stop offset="100%" stop-color="#030200"/></radialGradient></defs><rect width="720" height="240" fill="url(#mgbg)"/><circle cx="360" cy="120" r="20" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity=".45"/><circle cx="360" cy="120" r="40" fill="none" stroke="#c9a84c" stroke-width=".6" opacity=".4"/><circle cx="360" cy="120" r="60" fill="none" stroke="#c9a84c" stroke-width=".6" opacity=".35"/><circle cx="360" cy="120" r="14" fill="#e8c97a" opacity=".8"/><circle cx="360" cy="120" r="8" fill="#fff3b0" opacity=".9"/><circle cx="360" cy="120" r="4" fill="#fff"/></svg>`,

  mountain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="mtbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0d1b3e"/><stop offset="40%" stop-color="#1a2f5c"/><stop offset="100%" stop-color="#2c1654"/></linearGradient></defs><rect width="720" height="240" fill="url(#mtbg)"/><polygon points="0,200 120,70 240,130 360,50 480,110 600,60 720,140 720,240 0,240" fill="#1a2460" opacity=".9"/><polygon points="0,240 80,130 160,180 280,90 400,150 500,80 620,160 720,110 720,240" fill="#0d1540" opacity=".95"/><polygon points="280,90 260,115 300,115" fill="#e8eaf6" opacity=".7"/><circle cx="220" cy="45" r="3" fill="#fff" opacity=".9"/></svg>`,

  river: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="rvbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e8f0fe"/><stop offset="40%" stop-color="#b3d4f5"/><stop offset="100%" stop-color="#7bafd4"/></linearGradient><linearGradient id="rvwater" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#90caf9"/><stop offset="100%" stop-color="#1565c0"/></linearGradient></defs><rect width="720" height="240" fill="url(#rvbg)"/><ellipse cx="150" cy="45" rx="80" ry="22" fill="#fff" opacity=".6"/><polygon points="0,160 100,110 200,130 350,90 500,120 650,100 720,130 720,180 0,180" fill="#a5c8a0" opacity=".6"/><rect x="0" y="160" width="720" height="80" fill="url(#rvwater)"/><path d="M310 175 Q360 168 410 175 L405 185 Q360 190 315 185 Z" fill="#3e2723" opacity=".8"/></svg>`,

  diya: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><radialGradient id="dyabg" cx="50%" cy="60%" r="80%"><stop offset="0%" stop-color="#2a0a00"/><stop offset="50%" stop-color="#1a0800"/><stop offset="100%" stop-color="#060200"/></radialGradient><radialGradient id="dyaflame" cx="50%" cy="80%" r="70%"><stop offset="0%" stop-color="#fff176"/><stop offset="30%" stop-color="#ffa000"/><stop offset="70%" stop-color="#e65100" stop-opacity=".5"/><stop offset="100%" stop-color="#e65100" stop-opacity="0"/></radialGradient></defs><rect width="720" height="240" fill="url(#dyabg)"/><ellipse cx="360" cy="205" rx="50" ry="16" fill="#8d4a00"/><ellipse cx="360" cy="202" rx="50" ry="16" fill="#bf6900"/><ellipse cx="360" cy="199" rx="48" ry="14" fill="#e67e00"/><path d="M360 193 C354 182 350 170 354 158 C356 152 360 148 360 148 C360 148 364 152 366 158 C370 170 366 182 360 193Z" fill="url(#dyaflame)"/><path d="M360 190 C357 183 356 175 358 168 C359 164 360 162 360 162 C360 162 361 164 362 168 C364 175 363 183 360 190Z" fill="#fff9c4" opacity=".9"/><ellipse cx="360" cy="150" rx="3" ry="5" fill="#fff" opacity=".8"/></svg>`,

  peacock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><radialGradient id="pcbg" cx="50%" cy="50%" r="80%"><stop offset="0%" stop-color="#0d2b1f"/><stop offset="100%" stop-color="#050f0a"/></radialGradient></defs><rect width="720" height="240" fill="url(#pcbg)"/><ellipse cx="360" cy="190" rx="35" ry="45" fill="#00695c" opacity=".9"/><ellipse cx="360" cy="185" rx="28" ry="35" fill="#00897b"/><ellipse cx="360" cy="145" rx="12" ry="30" fill="#1565c0"/><circle cx="360" cy="115" r="18" fill="#1565c0"/><circle cx="365" cy="112" r="5" fill="#fff"/><circle cx="366" cy="112" r="3" fill="#1a237e"/><polygon points="375,116 385,112 375,120" fill="#e6b800"/></svg>`,

  cosmic: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><radialGradient id="csbg" cx="50%" cy="50%" r="80%"><stop offset="0%" stop-color="#0a0020"/><stop offset="50%" stop-color="#050010"/><stop offset="100%" stop-color="#000005"/></radialGradient></defs><rect width="720" height="240" fill="url(#csbg)"/><circle cx="360" cy="120" r="55" fill="none" stroke="#c9a84c" stroke-width=".8" opacity=".2"/><circle cx="360" cy="120" r="40" fill="none" stroke="#9c4dcc" stroke-width=".6" opacity=".25"/><circle cx="360" cy="120" r="25" fill="none" stroke="#e07b39" stroke-width=".7" opacity=".3"/><circle cx="360" cy="120" r="14" fill="#7b1fa2" opacity=".4"/><circle cx="360" cy="120" r="8" fill="#c9a84c" opacity=".5"/><circle cx="360" cy="120" r="3" fill="#fff9e6"/></svg>`,

  temple: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="tpbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff6f00"/><stop offset="30%" stop-color="#e65100"/><stop offset="70%" stop-color="#bf360c"/><stop offset="100%" stop-color="#3e1f00"/></linearGradient></defs><rect width="720" height="240" fill="url(#tpbg)"/><circle cx="360" cy="60" r="35" fill="#ffcc02" opacity=".9"/><circle cx="360" cy="60" r="28" fill="#ffe57f"/><rect x="200" y="200" width="320" height="40" fill="#1a0800" opacity=".95"/><polygon points="360,60 310,200 410,200" fill="#1a0800" opacity=".95"/><rect x="340" y="165" width="40" height="35" fill="#0d0400" opacity=".95"/></svg>`,

  meditation: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240"><defs><linearGradient id="mdbg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e8f5e9"/><stop offset="40%" stop-color="#c8e6c9"/><stop offset="100%" stop-color="#a5d6a7"/></linearGradient></defs><rect width="720" height="240" fill="url(#mdbg)"/><ellipse cx="360" cy="210" rx="40" ry="10" fill="#e67e00" opacity=".7"/><ellipse cx="360" cy="185" rx="25" ry="30" fill="#e8c4a0"/><circle cx="360" cy="162" r="20" fill="#c49060"/><ellipse cx="360" cy="145" rx="10" ry="8" fill="#3e2010" opacity=".8"/><circle cx="360" cy="145" r="8" fill="#e040fb" opacity=".3"/></svg>`
};

export const DailyWisdom: React.FC = () => {
  const [verse, setVerse] = useState<VerseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [theme, setTheme] = useState('sunrise');

  const loadVerse = async (day: number) => {
    setLoading(true);
    setError(null);

    const dayNum = ((day - 1) % 365 + 365) % 365;
    const verseIdx = YEAR_MAP[dayNum];
    const verseToLoad = VERSE_SCHEDULE[verseIdx];

    setTheme(verseToLoad.theme);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-bg-verse?chapter=${verseToLoad.ch}&verse=${verseToLoad.v}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verse');
      }

      const data = await response.json();
      setVerse(data);
    } catch (err) {
      console.error('Error loading verse:', err);
      setError('Unable to load verse. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const day = getDayOfYear(today);
    setCurrentDay(day);
    loadVerse(day);
  }, []);

  const handleNavigation = (direction: number) => {
    const newDay = currentDay + direction;
    setCurrentDay(newDay);
    loadVerse(newDay);
  };

  const formatDate = (day: number) => {
    const today = new Date();
    const d = new Date(today.getFullYear(), 0, day);
    return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="dw-card-wrapper">
        <div className="dw-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="dw-spinner" style={{ margin: '0 auto 1rem' }}></div>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontSize: '0.75rem', color: '#c9a84c' }}>
                Loading divine wisdom…
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !verse) {
    return (
      <div className="dw-card-wrapper">
        <div className="dw-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px', padding: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#d32f2f', marginBottom: '1rem' }}>{error || 'Failed to load verse'}</p>
              <button onClick={() => loadVerse(currentDay)} className="dw-btn">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const dayNum = ((currentDay - 1) % 365 + 365) % 365 + 1;
  const progress = (dayNum / 365) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=IM+Fell+English:ital@0;1&family=Raleway:wght@300;400;500&display=swap');

        .dw-card-wrapper {
          max-width: 720px;
          width: 100%;
        }

        .dw-card {
          background: #fffbf0;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 1px 0 0 rgba(201,168,76,0.22), 0 24px 80px rgba(42,22,8,0.22), 0 4px 16px rgba(42,22,8,0.12), inset 0 1px 0 rgba(255,255,255,0.9);
          border: 1px solid rgba(201,168,76,0.22);
        }

        .dw-hdr {
          background: linear-gradient(135deg, #100804 0%, #1e0f06 45%, #100804 100%);
          padding: 1.3rem 1.8rem 1.1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .dw-hdr::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a84c' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .dw-hdr-brand {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          position: relative;
        }

        .dw-hdr-flame {
          width: 32px;
          height: 32px;
          animation: dw-flicker 3s ease-in-out infinite;
        }

        @keyframes dw-flicker {
          0%, 100% { filter: drop-shadow(0 0 6px #e07b39) drop-shadow(0 0 12px #c9a84c); }
          50% { filter: drop-shadow(0 0 10px #e07b39) drop-shadow(0 0 20px #c9a84c); }
        }

        .dw-hdr-eyebrow {
          font-family: 'Raleway', sans-serif;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #c9a84c;
          opacity: 0.7;
        }

        .dw-hdr-name {
          font-family: 'Philosopher', serif;
          font-size: 1.05rem;
          color: #e8c97a;
          letter-spacing: 0.04em;
          margin-top: 0.1rem;
        }

        .dw-hdr-right {
          position: relative;
          text-align: right;
        }

        .dw-hdr-date {
          font-size: 0.62rem;
          color: #c9a84c;
          opacity: 0.55;
          letter-spacing: 0.06em;
          font-weight: 300;
        }

        .dw-hdr-day {
          font-family: 'Philosopher', serif;
          font-size: 0.78rem;
          color: #e8c97a;
          opacity: 0.8;
          margin-top: 0.15rem;
        }

        .dw-img-wrap {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #120904;
        }

        .dw-img-link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          text-decoration: none;
        }

        .dw-img-link::after {
          content: '📖 Read on Vedabase';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.85);
          background: rgba(16, 8, 4, 0.75);
          border: 1px solid #c9a84c;
          border-radius: 3px;
          font-family: 'Raleway', sans-serif;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #e8c97a;
          padding: 0.55rem 1.1rem;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.22s ease, transform 0.22s ease;
          pointer-events: none;
        }

        .dw-img-link:hover::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }

        .dw-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(16, 8, 4, 0.3) 50%, rgba(16, 8, 4, 0.88) 100%);
          transition: background 0.22s;
        }

        .dw-img-link:hover .dw-img-gradient {
          background: linear-gradient(to bottom, rgba(16, 8, 4, 0.2) 0%, rgba(16, 8, 4, 0.5) 50%, rgba(16, 8, 4, 0.92) 100%);
        }

        .dw-img-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.2rem 1.8rem 1.4rem;
        }

        .dw-img-ref {
          font-family: 'Raleway', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c9a84c;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.55rem;
        }

        .dw-img-ref::before {
          content: '';
          width: 2rem;
          height: 1px;
          background: #c9a84c;
          opacity: 0.6;
        }

        .dw-img-verse-text {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 1.22rem;
          color: #fff;
          line-height: 1.52;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.6), 0 1px 4px rgba(0, 0, 0, 0.4);
          max-width: 560px;
        }

        .dw-sanskrit-row {
          background: linear-gradient(90deg, #f5e6c0 0%, #fdf3dc 50%, #f5e6c0 100%);
          border-top: 1px solid rgba(201, 168, 76, 0.22);
          border-bottom: 1px solid rgba(201, 168, 76, 0.22);
          text-align: center;
          padding: 0.7rem 1.5rem;
        }

        .dw-sanskrit-text {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          color: #5c3317;
          font-size: 0.95rem;
          letter-spacing: 0.03em;
        }

        .dw-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .dw-cell {
          padding: 1.5rem 1.7rem;
          border-right: 1px solid rgba(201, 168, 76, 0.22);
          border-bottom: 1px solid rgba(201, 168, 76, 0.22);
          transition: background 0.2s;
        }

        .dw-cell:hover {
          background: rgba(201, 168, 76, 0.04);
        }

        .dw-cell:nth-child(even) {
          border-right: none;
        }

        .dw-cell.dw-span {
          grid-column: 1 / -1;
          border-right: none;
        }

        .dw-cell.dw-no-bottom {
          border-bottom: none;
        }

        .dw-cell.dw-tinted {
          background: linear-gradient(135deg, rgba(212, 98, 26, 0.06), rgba(201, 168, 76, 0.05));
        }

        .dw-cell.dw-tinted:hover {
          background: rgba(212, 98, 26, 0.09);
        }

        .dw-cell-label {
          font-family: 'Philosopher', serif;
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #d4621a;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid rgba(201, 168, 76, 0.22);
          padding-bottom: 0.55rem;
        }

        .dw-cell-icon {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dw-cell-body {
          font-family: 'Playfair Display', serif;
          font-size: 1.08rem;
          color: #1e1005;
          line-height: 1.7;
        }

        .dw-ftr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1.5rem;
          border-top: 1px solid rgba(201, 168, 76, 0.22);
          background: linear-gradient(90deg, #f5e6c0, #fffbf0, #f5e6c0);
        }

        .dw-ftr-progress {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .dw-progress-bar {
          width: 80px;
          height: 3px;
          background: rgba(201, 168, 76, 0.22);
          border-radius: 2px;
          overflow: hidden;
        }

        .dw-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4621a, #c9a84c);
          border-radius: 2px;
          transition: width 0.4s ease;
        }

        .dw-ftr-label {
          font-size: 0.62rem;
          color: #8a6a3a;
          letter-spacing: 0.06em;
        }

        .dw-nav {
          display: flex;
          gap: 0.4rem;
        }

        .dw-btn {
          background: none;
          border: 1px solid rgba(201, 168, 76, 0.22);
          border-radius: 3px;
          padding: 0.38rem 0.95rem;
          font-family: 'Raleway', sans-serif;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c9a84c;
          cursor: pointer;
          transition: all 0.18s;
        }

        .dw-btn:hover {
          background: #c9a84c;
          color: #120904;
          border-color: #c9a84c;
        }

        .dw-btn:active {
          transform: scale(0.97);
        }

        .dw-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(201, 168, 76, 0.22);
          border-top-color: #c9a84c;
          border-radius: 50%;
          animation: dw-spin 0.8s linear infinite;
        }

        @keyframes dw-spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 520px) {
          .dw-grid {
            grid-template-columns: 1fr;
          }
          .dw-cell {
            border-right: none !important;
            grid-column: auto !important;
          }
          .dw-img-wrap {
            height: 200px;
          }
          .dw-img-verse-text {
            font-size: 1.05rem;
          }
          .dw-hdr {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .dw-cell-body {
            font-size: 0.95rem;
          }
        }
      `}</style>

      <div className="dw-card-wrapper">
        <div className="dw-card">
          <div className="dw-hdr">
            <div className="dw-hdr-brand">
              <div className="dw-hdr-flame">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="fg" cx="50%" cy="80%" r="70%">
                      <stop offset="0%" stopColor="#ffe082"/>
                      <stop offset="50%" stopColor="#e07b39"/>
                      <stop offset="100%" stopColor="#8b1a00" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <ellipse cx="16" cy="26" rx="7" ry="4" fill="#c9a84c" opacity=".3"/>
                  <path d="M16 4 C14 9 10 11 11 17 C11 21 14 24 16 24 C18 24 21 21 21 17 C22 11 18 9 16 4Z" fill="url(#fg)"/>
                  <path d="M16 12 C15 15 13 16 13.5 19 C13.5 21 14.8 22.5 16 22.5 C17.2 22.5 18.5 21 18.5 19 C19 16 17 15 16 12Z" fill="#ffe082" opacity=".8"/>
                </svg>
              </div>
              <div>
                <div className="dw-hdr-eyebrow">Daily Wisdom</div>
                <div className="dw-hdr-name">Bhagavad Gita · {verse.chapter}.{verse.verse}</div>
              </div>
            </div>
            <div className="dw-hdr-right">
              <div className="dw-hdr-date">{formatDate(currentDay)}</div>
              <div className="dw-hdr-day">Day {dayNum} of 365</div>
            </div>
          </div>

          <div className="dw-img-wrap">
            <a
              className="dw-img-link"
              href={verse.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Read this verse on Vedabase"
            >
              <div dangerouslySetInnerHTML={{ __html: SVG_ART[theme] || SVG_ART.sunrise }} />
              <div className="dw-img-gradient"></div>
              <div className="dw-img-caption">
                <div className="dw-img-ref">BG {verse.chapter}.{verse.verse}</div>
                <div className="dw-img-verse-text">
                  {verse.translation.length > 100 ? verse.translation.substring(0, 97) + '…' : verse.translation}
                </div>
              </div>
            </a>
          </div>

          <div className="dw-sanskrit-row">
            <div className="dw-sanskrit-text">{verse.sanskrit}</div>
          </div>

          <div className="dw-grid">
            <div className="dw-cell">
              <div className="dw-cell-label">
                <span className="dw-cell-icon">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="#4527a0"/>
                    <path d="M9 11 C9 11 9 25 9 25 C9 25 13 24 18 25 L18 11 C13 10 9 11 9 11Z" fill="#fff" opacity=".95"/>
                    <path d="M27 11 C27 11 23 10 18 11 L18 25 C23 24 27 25 27 25Z" fill="#e8d5ff" opacity=".9"/>
                    <rect x="17.2" y="11" width="1.6" height="14" fill="#b39ddb"/>
                  </svg>
                </span>
                Meaning
              </div>
              <div className="dw-cell-body">{verse.translation}</div>
            </div>

            <div className="dw-cell dw-tinted">
              <div className="dw-cell-label">
                <span className="dw-cell-icon">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="sgr" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stopColor="#ffe57f"/>
                        <stop offset="100%" stopColor="#f57f17"/>
                      </radialGradient>
                    </defs>
                    <circle cx="18" cy="18" r="18" fill="#e65100"/>
                    <circle cx="18" cy="18" r="18" fill="url(#sgr)" opacity=".4"/>
                    <line x1="18" y1="5" x2="18" y2="8" stroke="#ffe57f" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="18" y1="28" x2="18" y2="31" stroke="#ffe57f" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="5" y1="18" x2="8" y2="18" stroke="#ffe57f" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="28" y1="18" x2="31" y2="18" stroke="#ffe57f" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="18" cy="18" r="7" fill="#ffe57f"/>
                    <circle cx="18" cy="18" r="5" fill="#fff8e1"/>
                  </svg>
                </span>
                Insight
              </div>
              <div className="dw-cell-body">{verse.purport}</div>
            </div>

            <div className="dw-cell">
              <div className="dw-cell-label">
                <span className="dw-cell-icon">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="lgr" cx="40%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#69f0ae"/>
                        <stop offset="100%" stopColor="#1b5e20"/>
                      </radialGradient>
                    </defs>
                    <circle cx="18" cy="18" r="18" fill="#2e7d32"/>
                    <circle cx="18" cy="18" r="18" fill="url(#lgr)" opacity=".45"/>
                    <ellipse cx="18" cy="12" rx="5" ry="8" fill="#a5d6a7" opacity=".9" transform="rotate(0,18,18)"/>
                    <ellipse cx="18" cy="12" rx="5" ry="8" fill="#81c784" opacity=".8" transform="rotate(60,18,18)"/>
                    <ellipse cx="18" cy="12" rx="5" ry="8" fill="#a5d6a7" opacity=".85" transform="rotate(120,18,18)"/>
                    <circle cx="18" cy="18" r="5" fill="#ffee58"/>
                    <circle cx="18" cy="18" r="3" fill="#fff9c4"/>
                  </svg>
                </span>
                Life Application
              </div>
              <div className="dw-cell-body">
                Reflect on how this wisdom applies to your current life situation. Consider one area where you can embody this teaching through conscious action today.
              </div>
            </div>

            <div className="dw-cell dw-tinted">
              <div className="dw-cell-label">
                <span className="dw-cell-icon">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="pgr" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#ffb74d"/>
                        <stop offset="100%" stopColor="#bf360c"/>
                      </radialGradient>
                    </defs>
                    <circle cx="18" cy="18" r="18" fill="#e64a19"/>
                    <circle cx="18" cy="18" r="18" fill="url(#pgr)" opacity=".5"/>
                    <circle cx="18" cy="18" r="13" fill="none" stroke="#ffe0b2" strokeWidth=".8" opacity=".5"/>
                    <ellipse cx="18" cy="22" rx="7" ry="5" fill="#fff3e0" opacity=".9"/>
                    <circle cx="18" cy="14" r="4.5" fill="#ffccbc"/>
                    <circle cx="18" cy="10" r="2" fill="#ea80fc" opacity=".9"/>
                  </svg>
                </span>
                Practice
              </div>
              <div className="dw-cell-body">
                Take 5 minutes to sit quietly with this verse. Read it three times slowly. Notice what feelings or insights arise. Journal one action you will take today inspired by this wisdom.
              </div>
            </div>

            <div className="dw-cell dw-span dw-no-bottom">
              <div className="dw-cell-label">
                <span className="dw-cell-icon">
                  <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient id="rgr" cx="40%" cy="35%" r="70%">
                        <stop offset="0%" stopColor="#80deea"/>
                        <stop offset="100%" stopColor="#00695c"/>
                      </radialGradient>
                    </defs>
                    <circle cx="18" cy="18" r="18" fill="#00796b"/>
                    <circle cx="18" cy="18" r="18" fill="url(#rgr)" opacity=".5"/>
                    <ellipse cx="18" cy="17" rx="9" ry="11" fill="none" stroke="#b2dfdb" strokeWidth="1.5" opacity=".9"/>
                    <ellipse cx="18" cy="17" rx="7" ry="9" fill="#e0f2f1" opacity=".25"/>
                    <ellipse cx="18" cy="22" rx="5" ry="1.5" fill="none" stroke="#80cbc4" strokeWidth="1" opacity=".7"/>
                    <circle cx="18" cy="14" r="1.5" fill="#fff" opacity=".9"/>
                  </svg>
                </span>
                Reflection Question
              </div>
              <div className="dw-cell-body">
                What is one belief or pattern you are holding onto that this verse invites you to examine or release? How would your life change if you fully internalized this teaching?
              </div>
            </div>
          </div>

          <div className="dw-ftr">
            <div className="dw-ftr-progress">
              <div className="dw-progress-bar">
                <div className="dw-progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="dw-ftr-label">Day {dayNum} of 365</div>
            </div>
            <div className="dw-nav">
              <button className="dw-btn" onClick={() => handleNavigation(-1)}>← Prev</button>
              <button className="dw-btn" onClick={() => handleNavigation(1)}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
