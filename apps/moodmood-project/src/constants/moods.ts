import { MoodType } from '../types/Mood';

export const MOOD_ICON: Record<MoodType, string> = {
  okay: '/assets/okay.svg',
  happy: '/assets/veryhappy.svg',
  sad: '/assets/sad.svg',
  angry: '/assets/angy.svg',
  bored: '/assets/bored.svg',
  tired: '/assets/tired.svg',
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



