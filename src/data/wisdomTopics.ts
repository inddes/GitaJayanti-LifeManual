import { gitaVerses, type GitaVerse } from './gitaVerses';

export interface ScriptureTeaching {
  verseRef: { chapter: number; verse: number };
  whyItMatters: string;
  applyItToday: string;
}

export interface ReflectionQuestion {
  id: string;
  question: string;
}

export interface PracticeStep {
  number: number;
  text: string;
}

export interface RelatedContentLink {
  label: string;
  description: string;
  link: string;
}

export interface WisdomTopic {
  slug: string;
  title: string;
  eyebrow: string;
  headline: string;
  introduction: string;
  durationLabel: string;
  understanding: {
    heading: string;
    paragraphs: string[];
    transition: string;
  };
  scriptureTeachings: ScriptureTeaching[];
  reflections: ReflectionQuestion[];
  practice: {
    heading: string;
    intro: string;
    steps: PracticeStep[];
    intention: string;
    durationSeconds: number;
  };
  relatedContent: RelatedContentLink[];
}

export const wisdomTopics: Record<string, WisdomTopic> = {
  anxiety: {
    slug: 'anxiety',
    title: 'Anxiety',
    eyebrow: 'Wisdom for Anxiety',
    headline: 'When the future feels heavier than the present',
    introduction:
      'This journey explores Bhagavad Gita teachings related to action and its results, the nature of the restless mind, finding steadiness amid life\u2019s changes, and trusting a perspective larger than our own worries. It is not a treatment for anxiety. It is an invitation to sit with timeless wisdom and let it speak to your experience.',
    durationLabel: 'About 10 minutes',
    understanding: {
      heading: 'Why does uncertainty disturb the mind?',
      paragraphs: [
        'Anxiety often begins with a question we cannot answer: what will happen? The mind races ahead, trying to predict, control, and prepare for outcomes that have not arrived. The more we try to grasp the future, the more it slips through our fingers, and the tighter we hold on.',
        'We confuse our responsibility \u2014 to act wisely, to prepare, to show up \u2014 with an impossible responsibility to guarantee results. When we carry the weight of outcomes we cannot control, the present moment becomes a place we cannot rest in.',
      ],
      transition:
        'The Gita begins by changing where we place our attention: from controlling every outcome to understanding how we act.',
    },
    scriptureTeachings: [
      {
        verseRef: { chapter: 2, verse: 47 },
        whyItMatters:
          'This is the heart of the Gita\u2019s guidance on anxiety. It draws a clear line between what is yours \u2014 the action \u2014 and what is not \u2014 the result. Anxiety thrives when we blur that line, trying to control what was never ours to hold.',
        applyItToday:
          'Pick one situation where you feel anxious about the outcome. Identify the action that is genuinely yours to take. Do it with care, and then consciously set down the weight of the result.',
      },
      {
        verseRef: { chapter: 2, verse: 14 },
        whyItMatters:
          'When anxiety tells you that this feeling will last forever, this verse reminds you that experiences come and go like seasons. Distress is not a permanent condition; it is a passing weather pattern in the mind.',
        applyItToday:
          'The next time anxious sensations arise, notice them as temporary. Say quietly: \u201CThis has come, and it will go.\u201D Let the season pass without fighting it.',
      },
      {
        verseRef: { chapter: 6, verse: 35 },
        whyItMatters:
          'The Gita does not pretend the mind is easy to steady. It calls the mind restless and difficult to restrain \u2014 and then offers a path: practice and detachment. You are not failing because your mind wanders; you are beginning the work every seeker must do.',
        applyItToday:
          'Set aside two minutes to sit quietly. When the mind pulls toward worry, gently bring it back. Do not judge the wandering \u2014 simply return. Each return is the practice.',
      },
      {
        verseRef: { chapter: 9, verse: 22 },
        whyItMatters:
          'Anxiety often comes from feeling that you alone must hold everything together. This verse offers a different ground: when the heart turns toward the Divine with sincerity, you are not carrying the weight alone. What you lack is provided; what you have is preserved.',
        applyItToday:
          'When the burden feels too heavy, try offering it upward. Silently say: \u201CI do what I can; I trust the rest to what is greater than me.\u201D Let that trust be a small experiment, not a demand.',
      },
    ],
    reflections: [
      {
        id: 'r1',
        question: 'What outcome are you trying hardest to control right now?',
      },
      {
        id: 'r2',
        question: 'What part of this situation is actually within your responsibility?',
      },
      {
        id: 'r3',
        question: 'What might acting sincerely without demanding a particular result look like?',
      },
    ],
    practice: {
      heading: 'A moment to return to the present',
      intro: 'A simple two-minute guided reflection. There is nothing to achieve here \u2014 only a gentle return.',
      steps: [
        { number: 1, text: 'Sit comfortably and become still.' },
        { number: 2, text: 'Notice what outcome your mind is trying to control.' },
        { number: 3, text: 'Bring attention back to the action that is yours to perform now.' },
        { number: 4, text: 'Release, for this moment, the demand to control the result.' },
        { number: 5, text: 'Finish with one quiet intention: \u201CLet me act with sincerity and steadiness.\u201D' },
      ],
      intention: 'Let me act with sincerity and steadiness.',
      durationSeconds: 120,
    },
    relatedContent: [
      {
        label: 'Read the related Bhagavad Gita verses',
        description: 'Browse all available verses with Sanskrit, translation, and commentary.',
        link: '/mindfulness',
      },
      {
        label: 'Explore the Meditation page',
        description: 'Guided meditation sessions to steady the mind through practice.',
        link: '/meditation',
      },
      {
        label: 'Visit Step In',
        description: 'Turn wisdom into daily spiritual practice and reflection.',
        link: '/stepin',
      },
      {
        label: 'Back to all LifeManual journeys',
        description: 'Return to the homepage and explore other life situations.',
        link: '/#what-are-you-facing',
      },
    ],
  },
};

export const getTopic = (slug: string): WisdomTopic | undefined => wisdomTopics[slug];

export const getTeachingVerse = (teaching: ScriptureTeaching): GitaVerse | undefined => {
  return gitaVerses.find(
    v => v.chapter === teaching.verseRef.chapter && v.verse === teaching.verseRef.verse
  );
};
