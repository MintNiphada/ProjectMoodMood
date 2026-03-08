import { MoodType } from '../types/Mood';

// ✅ import รูปทั้งหมด
import okayIcon from '../assets/okay.svg';
import happyIcon from '../assets/veryhappy.svg';
import sadIcon from '../assets/sad.svg';
import angryIcon from '../assets/angy.svg';
import boredIcon from '../assets/bored.svg';
import tiredIcon from '../assets/tired.svg';

export const MOOD_ICON: Record<MoodType, string> = {
  okay: okayIcon,
  happy: happyIcon,
  sad: sadIcon,
  angry: angryIcon,
  bored: boredIcon,
  tired: tiredIcon,
};

export const MOOD_LABEL: Record<MoodType, string> = {
  okay: 'โอเค',
  happy: 'มีความสุข',
  sad: 'เศร้า',
  angry: 'หงุดหงิด',
  bored: 'เบื่อ',
  tired: 'เหนื่อย',
};

export const MOOD_COLOR: Record<MoodType, string> = {
  okay: '#CFEFE3',
  happy: '#FFF1B8',
  sad: '#D9DEF0',
  angry: '#FADADA',
  bored: '#F2F2F2',
  tired: '#E5DDF6',
};