import { useState, useEffect } from 'react';
import { MoodType } from '../types/Mood';
import { MOOD_ICON, MOOD_LABEL } from '../constants/moods';
import './moodselector.css';

const MOODS: MoodType[] = [
  'okay',
  'happy',
  'sad',
  'angry',
  'bored',
  'tired'
];

interface MoodSelectorProps {
  selected?: MoodType[];
  onSelect: (moods: MoodType[]) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  selected = [],
  onSelect
}) => {

  const [activeMoods, setActiveMoods] = useState<MoodType[]>(selected);

  // sync ค่าเวลามี selected จากภายนอก (เช่นหน้า Edit)
  useEffect(() => {
    setActiveMoods(selected);
  }, [selected]);

  const toggleMood = (mood: MoodType) => {

    let newSelected: MoodType[];

    if (activeMoods.includes(mood)) {

      newSelected = activeMoods.filter(m => m !== mood);

    } else {

      if (activeMoods.length >= 2) {
        return;
      }

      newSelected = [...activeMoods, mood];

    }

    setActiveMoods(newSelected);

    onSelect(newSelected);

  };

  return (

    <div className="mood-selector">

      {MOODS.map(mood => {

        const active = activeMoods.includes(mood);

        return (

          <button
            key={mood}
            className={`mood-item ${mood} ${active ? 'active' : ''}`}
            onClick={() => toggleMood(mood)}
          >

            <img src={MOOD_ICON[mood]} alt={mood} />

            <span>{MOOD_LABEL[mood]}</span>

          </button>

        );

      })}

    </div>

  );

};

export default MoodSelector;