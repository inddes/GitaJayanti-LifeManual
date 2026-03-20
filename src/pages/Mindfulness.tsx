import React, { useState } from 'react';
import { BookOpen, Heart, Search } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import bgImage from '../assets/Screenshot 2025-12-01 at 17.35.33.png';

interface GitaVerse {
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  commentary: string;
}

const sampleVerses: GitaVerse[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana, mā karma-phala-hetur bhūr mā te saṅgo stvakarmaṇi',
    translation: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.',
    commentary: 'This verse emphasizes the importance of performing one\'s duty without attachment to results. It teaches us to focus on the process rather than outcomes, leading to peace and fulfillment.'
  },
  {
    chapter: 6,
    verse: 35,
    sanskrit: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्। अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥',
    transliteration: 'asaṁśhayaṁ mahā-bāho mano durnigrahaṁ chalam, abhyāsena tu kaunteya vairāgyeṇa cha gṛihyate',
    translation: 'Undoubtedly, O mighty-armed one, the mind is restless and difficult to restrain, but it is subdued by practice and by detachment.',
    commentary: 'Krishna acknowledges the challenge of controlling the mind but offers hope through consistent practice (abhyasa) and detachment (vairagya). This verse is fundamental to meditation practice.'
  },
  {
    chapter: 2,
    verse: 14,
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः। आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    transliteration: 'mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ, āgamāpāyino nityās tāṁs titikṣhasva bhārata',
    translation: 'O son of Kunti, the contact between the senses and the sense objects gives rise to fleeting perceptions of happiness and distress. These are non-permanent, and come and go like the winter and summer seasons. O descendent of Bharat, one must learn to tolerate them without being disturbed.',
    commentary: 'This verse teaches equanimity in the face of life\'s dualities. Just as seasons change, so do our experiences of pleasure and pain. True wisdom lies in remaining balanced through all circumstances.'
  },
  {
    chapter: 9,
    verse: 22,
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते। तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate, teṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham',
    translation: 'To those who worship Me alone, thinking of no other, to those ever steadfast, I provide what they lack and preserve what they have.',
    commentary: 'This verse reveals the divine promise of complete care for devotees who worship with single-minded devotion. Krishna assures that He personally takes care of all their needs, both material and spiritual.'
  },
  {
    chapter: 9,
    verse: 27,
    sanskrit: 'यत्करोषि यदश्नासि यज्जुहोषि ददासि यत्। यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम्॥',
    transliteration: 'yat karoṣhi yad aśhnāsi yaj juhoṣhi dadāsi yat, yat tapasyasi kaunteya tat kuruṣhva mad-arpaṇam',
    translation: 'Whatever you do, whatever you eat, whatever you offer in sacrifice, whatever you give, whatever austerity you perform, O son of Kunti, do that as an offering to Me.',
    commentary: 'This verse teaches the path of offering all actions to the Divine. By dedicating every activity to God, even mundane tasks become spiritual practices, transforming life into continuous worship.'
  },
  {
    chapter: 9,
    verse: 34,
    sanskrit: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु। मामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः॥',
    transliteration: 'man-manā bhava mad-bhakto mad-yājī māṁ namaskuru, mām evaiṣhyasi yuktvaivam ātmānaṁ mat-parāyaṇaḥ',
    translation: 'Always think of Me, become My devotee, worship Me, and offer your homage to Me. Thus you will certainly come to Me. I promise you this because you are My very dear friend.',
    commentary: 'Krishna concludes this chapter with a direct promise of union to those who constantly remember Him with devotion. This verse emphasizes the power of constant remembrance and loving devotion.'
  },
  {
    chapter: 10,
    verse: 10,
    sanskrit: 'तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम्। ददामि बुद्धियोगं तं येन मामुपयान्ति ते॥',
    transliteration: 'teṣhāṁ satata-yuktānāṁ bhajatāṁ prīti-pūrvakam, dadāmi buddhi-yogaṁ taṁ yena mām upayānti te',
    translation: 'To those who are constantly devoted and who worship Me with love, I give the understanding by which they can come to Me.',
    commentary: 'This verse reveals that divine grace comes to sincere devotees in the form of spiritual intelligence. Through loving devotion, Krishna bestows the wisdom needed to attain union with Him.'
  },
  {
    chapter: 10,
    verse: 20,
    sanskrit: 'अहमात्मा गुडाकेश सर्वभूताशयस्थितः। अहमादिश्च मध्यं च भूतानामन्त एव च॥',
    transliteration: 'aham ātmā guḍākeśha sarva-bhūtāśhaya-sthitaḥ, aham ādiśh cha madhyaṁ cha bhūtānām anta eva cha',
    translation: 'I am the Self, O Gudakesha, seated in the hearts of all beings. I am the beginning, the middle, and also the end of all beings.',
    commentary: 'Krishna reveals His all-pervading nature as the inner Self of all beings. He is the source, sustainer, and ultimate destination of all creation, present in every heart as the eternal witness.'
  },
  {
    chapter: 10,
    verse: 41,
    sanskrit: 'यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा। तत्तदेवावगच्छ त्वं मम तेजोंऽशसंभवम्॥',
    transliteration: 'yad yad vibhūtimat sattvaṁ śhrīmad ūrjitam eva vā, tat tad evāvagacha tvaṁ mama tejo-aṁśha-sambhavam',
    translation: 'Know that all beautiful, glorious, and mighty creations spring from but a spark of My splendor.',
    commentary: 'This verse concludes the enumeration of divine manifestations by stating that any exceptional manifestation of power, beauty, or glory is merely a tiny fraction of the Divine\'s infinite splendor.'
  },
  {
    chapter: 18,
    verse: 78,
    sanskrit: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥',
    transliteration: 'yatra yogeśhvaraḥ kṛiṣhṇo yatra pārtho dhanur-dharaḥ, tatra śhrīr vijayo bhūtir dhruvā nītir matir mama',
    translation: 'Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the wielder of the bow, there will also certainly be opulence, victory, prosperity, and righteousness. Of this I am certain.',
    commentary: 'The final verse of the Gita assures us that when divine wisdom (Krishna) and dedicated action (Arjuna) come together, success is inevitable. It represents the union of knowledge and action.'
  }
];

export const Mindfulness: React.FC = () => {
  const { t } = useLanguage();
  const [selectedVerse, setSelectedVerse] = useState<GitaVerse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useScrollAnimation();
  const versesRef = useScrollAnimation();

  const filteredVerses = sampleVerses.filter(verse =>
    verse.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verse.transliteration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-spiritual-cream via-spiritual-lightGold to-spiritual-cream bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-spiritual-cream/60 backdrop-blur-sm"></div>
        <div ref={heroRef.ref} className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${heroRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-spiritual-gold/20 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-spiritual-gold" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-spiritual-brown mb-6">
            {t.mindfulness.title}
          </h1>
          <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
            {t.mindfulness.subtitle}
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-spiritual-brown/50" />
              <input
                type="text"
                placeholder={t.mindfulness.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-spiritual-gold/30 focus:outline-none focus:border-spiritual-gold bg-spiritual-cream/30 text-spiritual-brown"
              />
            </div>
          </div>

          <div ref={versesRef.ref} className={`transition-all duration-700 ${versesRef.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVerses.map((verse, index) => (
                <Card key={index} className="cursor-pointer" hover={true}>
                  <div onClick={() => setSelectedVerse(verse)}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full">
                        {t.mindfulness.chapterVerse.replace('{chapter}', String(verse.chapter)).replace('{verse}', String(verse.verse))}
                      </span>
                      <Heart className="w-5 h-5 text-spiritual-brown/30 hover:text-spiritual-gold transition-colors cursor-pointer" />
                    </div>
                    <p className="text-lg text-spiritual-brown font-medium mb-3 line-clamp-2">
                      {verse.translation}
                    </p>
                    <p className="text-sm text-spiritual-brown/60 italic line-clamp-1">
                      {verse.transliteration}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedVerse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedVerse(null)}>
          <div className="bg-spiritual-cream rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6">
              <span className="text-sm font-semibold text-spiritual-gold bg-spiritual-gold/10 px-3 py-1 rounded-full">
                {t.mindfulness.chapterVerse.replace('{chapter}', String(selectedVerse.chapter)).replace('{verse}', String(selectedVerse.verse))}
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">{t.mindfulness.labels.sanskrit}</h3>
                <p className="text-2xl text-spiritual-brown leading-relaxed">
                  {selectedVerse.sanskrit}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">{t.mindfulness.labels.transliteration}</h3>
                <p className="text-lg text-spiritual-brown/80 italic">
                  {selectedVerse.transliteration}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">{t.mindfulness.labels.translation}</h3>
                <p className="text-xl text-spiritual-brown font-medium leading-relaxed">
                  {selectedVerse.translation}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-spiritual-brown/60 mb-2">{t.mindfulness.labels.commentary}</h3>
                <p className="text-lg text-spiritual-brown/80 leading-relaxed">
                  {selectedVerse.commentary}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button variant="primary" onClick={() => setSelectedVerse(null)}>
                {t.mindfulness.close}
              </Button>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-spiritual-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-spiritual-brown mb-4">
            {t.mindfulness.dailyWisdom.title}
          </h2>
          <p className="text-lg text-spiritual-brown/80 mb-8">
            {t.mindfulness.dailyWisdom.description}
          </p>
          <a
            href="https://vedabase.io/en/library/bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-spiritual-gold text-white rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-spiritual-gold/90"
          >
            Get Your Own Copy
          </a>
        </div>
      </section>
    </div>
  );
};
