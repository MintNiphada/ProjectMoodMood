import { useState } from 'react';
import { MoodType } from '../types/Mood';
import { MOOD_ICON, MOOD_LABEL } from '../constants/moods';

const MOODS: MoodType[] = ['okay', 'happy', 'sad', 'angry', 'bored', 'tired'];

const MoodSelector: React.FC = () => {
  const [selected, setSelected] = useState<MoodType[]>([]);

  const toggleMood = (mood: MoodType) => {
    setSelected(prev =>
      prev.includes(mood)
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  return (
    <div className="mood-selector">
      {MOODS.map(mood => (
        <button
          key={mood}
          className={`mood-item ${selected.includes(mood) ? 'active' : ''}`}
          onClick={() => toggleMood(mood)}
        >
          <img src={MOOD_ICON[mood]} />
          <span>{MOOD_LABEL[mood]}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
