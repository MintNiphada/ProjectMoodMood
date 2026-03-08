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

  const toggleMood = (mood: MoodType) => {

    let newSelected: MoodType[];

    if (selected.includes(mood)) {

      newSelected =
        selected.filter(m => m !== mood);

    } else {

      if (selected.length >= 2) return;

      newSelected =
        [...selected, mood];

    }

    onSelect(newSelected);

  };

  return (

    <div className="mood-selector">

      {MOODS.map(mood => {

        const active = selected.includes(mood);

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