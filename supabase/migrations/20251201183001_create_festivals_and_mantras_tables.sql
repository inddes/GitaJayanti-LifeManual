/*
  # Create Festivals and Mantras Tables

  1. New Tables
    - `festivals`
      - `id` (uuid, primary key)
      - `name` (text) - Festival name
      - `description` (text)
      - `date` (date) - Festival date
      - `significance` (text)
      - `created_at` (timestamp)

    - `mantras`
      - `id` (uuid, primary key)
      - `title` (text) - Mantra title
      - `sanskrit_text` (text) - Original Sanskrit text
      - `transliteration` (text) - Roman script version
      - `translation` (text) - English translation
      - `meaning` (text) - Detailed meaning
      - `category` (text) - Category (peace, wisdom, prosperity, etc.)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Allow public read access for festivals and mantras
    - Only admins can insert/update/delete (handled through service role)
*/

CREATE TABLE IF NOT EXISTS festivals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  significance text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS festivals_date_idx ON festivals(date);

ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view festivals"
  ON festivals FOR SELECT
  TO public
  USING (true);

CREATE TABLE IF NOT EXISTS mantras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sanskrit_text text NOT NULL,
  transliteration text NOT NULL,
  translation text NOT NULL,
  meaning text NOT NULL,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mantras_category_idx ON mantras(category);

ALTER TABLE mantras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view mantras"
  ON mantras FOR SELECT
  TO public
  USING (true);

INSERT INTO mantras (title, sanskrit_text, transliteration, translation, meaning, category) VALUES
  ('Gayatri Mantra', 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्', 'Om Bhur Bhuvah Svah Tat Savitur Varenyam Bhargo Devasya Dhimahi Dhiyo Yo Nah Prachodayat', 'We meditate on the glory of the Creator who has created the Universe, who is worthy of worship, who is the embodiment of knowledge and light', 'One of the most powerful and ancient mantras, invoking divine light and wisdom', 'wisdom'),
  ('Om Shanti Mantra', 'ॐ शान्तिः शान्तिः शान्तिः', 'Om Shanti Shanti Shanti', 'Om Peace Peace Peace', 'A mantra for inner peace and universal harmony, chanted three times to bring peace to body, mind, and spirit', 'peace'),
  ('Maha Mrityunjaya Mantra', 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात्', 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat', 'We worship the three-eyed One who is fragrant and nourishes all. Like a ripe fruit from the vine, may we be liberated from death and not from immortality', 'A powerful healing mantra for protection and liberation', 'protection'),
  ('Ganesh Mantra', 'ॐ गं गणपतये नमः', 'Om Gam Ganapataye Namaha', 'I bow to Lord Ganesha', 'Invokes Ganesha to remove obstacles and bring success to new beginnings', 'prosperity');

INSERT INTO festivals (name, description, date, significance) VALUES
  ('Diwali', 'Festival of Lights', '2025-10-20', 'Celebrates the victory of light over darkness and good over evil'),
  ('Holi', 'Festival of Colors', '2025-03-14', 'Celebrates the arrival of spring, love, and the victory of good over evil'),
  ('Navaratri', 'Nine Nights Festival', '2025-09-22', 'Celebrates the divine feminine and the triumph of good over evil'),
  ('Maha Shivaratri', 'Great Night of Shiva', '2025-02-26', 'Honors Lord Shiva and celebrates overcoming darkness and ignorance');
