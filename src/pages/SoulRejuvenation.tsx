import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, Music, Plus, Trash2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: string;
  created_at: string;
}

interface Festival {
  id: string;
  name: string;
  description: string;
  date: string;
  significance: string;
}

interface Mantra {
  id: string;
  title: string;
  sanskrit_text: string;
  transliteration: string;
  translation: string;
  meaning: string;
  category: string;
}

const mockFestivals: Festival[] = [
  { id: '1', name: 'Diwali', description: 'Festival of Lights', date: '2025-10-20', significance: 'Celebrates the victory of light over darkness and good over evil' },
  { id: '2', name: 'Holi', description: 'Festival of Colors', date: '2025-03-14', significance: 'Celebrates the arrival of spring, love, and the victory of good over evil' },
  { id: '3', name: 'Navaratri', description: 'Nine Nights Festival', date: '2025-09-22', significance: 'Celebrates the divine feminine and the triumph of good over evil' },
  { id: '4', name: 'Maha Shivaratri', description: 'Great Night of Shiva', date: '2025-02-26', significance: 'Honors Lord Shiva and celebrates overcoming darkness and ignorance' },
];

const mockMantras: Mantra[] = [
  {
    id: '1',
    title: 'Gayatri Mantra',
    sanskrit_text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    transliteration: 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat',
    translation: 'We meditate on the glory of the Creator who has created the Universe',
    meaning: 'One of the most powerful and ancient mantras, invoking divine light and wisdom',
    category: 'wisdom'
  },
  {
    id: '2',
    title: 'Om Shanti Mantra',
    sanskrit_text: 'ॐ शान्तिः शान्तिः शान्तिः',
    transliteration: 'Om Shanti Shanti Shanti',
    translation: 'Om Peace Peace Peace',
    meaning: 'A mantra for inner peace and universal harmony',
    category: 'peace'
  },
];

export const SoulRejuvenation: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [festivals] = useState<Festival[]>(mockFestivals);
  const [mantras] = useState<Mantra[]>(mockMantras);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: 'peaceful' });
  const [selectedMantra, setSelectedMantra] = useState<Mantra | null>(null);
  const heroRef = useScrollAnimation();
  const journalRef = useScrollAnimation();
  const festivalRef = useScrollAnimation();
  const mantraRef = useScrollAnimation();

  const createJournalEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      created_at: new Date().toISOString(),
    };

    setJournalEntries(prev => [entry, ...prev]);
    setNewEntry({ title: '', content: '', mood: 'peaceful' });
    setIsJournalModalOpen(false);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream">
        <div ref={heroRef.ref} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <PenTool className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            Soul Rejuvenation
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto mb-8">
            Nurture your spiritual growth through journaling, sacred mantras, and festival celebrations.
          </p>
          <a
            href="https://www.youtube.com/watch?v=Bh9On4knV2Y&list=PLu2_BuyMbqr0-Ltt4Fg4xHpGOPOBVXShA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-lg px-8 py-4 bg-spiritual-gold text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-spiritual-gold/90"
            style={{ pointerEvents: 'auto' }}
          >
            Watch Guided Videos
          </a>
        </div>
      </section>

      <section ref={journalRef.ref} className="py-16 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${journalRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-spiritual-brown">Spiritual Journal</h2>
            <Button variant="primary" onClick={() => setIsJournalModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Entry
            </Button>
          </div>

          {journalEntries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journalEntries.map((entry) => (
                <Card key={entry.id}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs text-spiritual-brown/60">
                      {formatDate(entry.created_at)}
                    </span>
                    <button
                      onClick={() => deleteJournalEntry(entry.id)}
                      className="text-spiritual-brown/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-spiritual-brown mb-2">{entry.title}</h3>
                  <p className="text-spiritual-brown/70 text-sm line-clamp-3 mb-3">
                    {entry.content}
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-spiritual-gold/20 text-spiritual-gold rounded-full">
                    {entry.mood}
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <Card hover={false}>
              <div className="text-center py-12">
                <PenTool className="w-16 h-16 text-spiritual-gold/50 mx-auto mb-4" />
                <p className="text-lg text-spiritual-brown/60">
                  Start your spiritual journaling journey
                </p>
              </div>
            </Card>
          )}
        </div>
      </section>

      <section ref={festivalRef.ref} className="py-16 bg-spiritual-cream">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${festivalRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center mb-8">
            <Calendar className="w-8 h-8 text-spiritual-gold mr-3" />
            <h2 className="text-3xl font-bold text-spiritual-brown">Upcoming Festivals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {festivals.map((festival) => (
              <Card key={festival.id}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-semibold text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full">
                    {formatDate(festival.date)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-spiritual-brown mb-2">{festival.name}</h3>
                <p className="text-spiritual-brown/70 mb-3">{festival.description}</p>
                <p className="text-sm text-spiritual-brown/60 italic">{festival.significance}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section ref={mantraRef.ref} className="py-16 bg-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${mantraRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center mb-8">
            <Music className="w-8 h-8 text-spiritual-gold mr-3" />
            <h2 className="text-3xl font-bold text-spiritual-brown">Sacred Mantras</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mantras.map((mantra) => (
              <Card key={mantra.id} className="cursor-pointer" hover={true}>
                <div onClick={() => setSelectedMantra(mantra)}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-spiritual-brown">{mantra.title}</h3>
                    <span className="text-xs font-semibold text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full">
                      {mantra.category}
                    </span>
                  </div>
                  <p className="text-spiritual-brown/70 text-sm line-clamp-2 mb-2">
                    {mantra.translation}
                  </p>
                  <p className="text-xs text-spiritual-brown/50 italic line-clamp-1">
                    {mantra.transliteration}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        title="New Journal Entry"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-spiritual-brown mb-2">
              Title
            </label>
            <input
              type="text"
              value={newEntry.title}
              onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30"
              placeholder="Give your entry a title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-spiritual-brown mb-2">
              How are you feeling?
            </label>
            <select
              value={newEntry.mood}
              onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30"
            >
              <option value="peaceful">Peaceful</option>
              <option value="grateful">Grateful</option>
              <option value="reflective">Reflective</option>
              <option value="joyful">Joyful</option>
              <option value="contemplative">Contemplative</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-spiritual-brown mb-2">
              Your Thoughts
            </label>
            <textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30 resize-none"
              placeholder="Write your thoughts, reflections, or spiritual insights..."
            />
          </div>

          <Button
            variant="primary"
            onClick={createJournalEntry}
            className="w-full"
            disabled={!newEntry.title || !newEntry.content}
          >
            Save Entry
          </Button>
        </div>
      </Modal>

      {selectedMantra && (
        <Modal
          isOpen={!!selectedMantra}
          onClose={() => setSelectedMantra(null)}
          title={selectedMantra.title}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">Sanskrit</h3>
              <p className="text-2xl text-spiritual-brown leading-relaxed">
                {selectedMantra.sanskrit_text}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">
                Transliteration
              </h3>
              <p className="text-lg text-spiritual-brown/80 italic">
                {selectedMantra.transliteration}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">Translation</h3>
              <p className="text-lg text-spiritual-brown font-medium">
                {selectedMantra.translation}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">Meaning</h3>
              <p className="text-spiritual-brown/80">{selectedMantra.meaning}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
