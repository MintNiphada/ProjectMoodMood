export type MoodType =
    | 'okay'
    | 'happy'
    | 'sad'
    | 'angry'
    | 'bored'
    | 'tired';

export interface MoodEntry {
    date: string;          // YYYY-MM-DD
    moods: MoodType[];     // เลือกได้หลายอารมณ์
    tags: string[];
    note?: string;
    images?: string[];
}

export interface FeedEntry {
  id: string;
  date: string;
  time: string;
  moods: MoodType[];
  tags: string[];
  note?: string;
  image?: string;
}