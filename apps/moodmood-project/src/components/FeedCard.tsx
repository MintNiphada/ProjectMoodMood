import { IonIcon } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import { Timestamp } from "firebase/firestore";

import { FeedEntry, MoodType } from '../types/Mood';
import { MOOD_ICON, MOOD_LABEL, MOOD_COLOR } from '../constants/moods';

import './FeedCard.css';

interface Props {
  entry: FeedEntry;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const formatThaiDateTime = (timestamp?: Timestamp) => {
  if (!timestamp) return "";

  const d = timestamp.toDate();

  const date = d.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const time = d.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return `${date} ${time} น.`;
};

const FeedCard: React.FC<Props> = ({ entry, onEdit, onDelete }) => {

  const hasImage = Boolean(entry.image);

  return (

    <div className={`feed-card ${hasImage ? 'with-image' : 'no-image'}`}>

      {/* header */}
      <div className="feed-header">

        <div className="feed-date">
          {formatThaiDateTime(entry.createdAt)}

          {entry.tags?.[0] && (
            <span className="feed-tag">
              {entry.tags[0]}
            </span>
          )}

        </div>

        <div className="feed-actions">

          <IonIcon
            icon={pencilOutline}
            className="edit-icon"
            onClick={() => onEdit?.(entry.id)}
          />

          <IonIcon
            icon={trashOutline}
            className="delete-icon"
            onClick={() => onDelete?.(entry.id)}
          />

        </div>

      </div>

      {/* mood */}
      <div className="feed-mood">

        {/* icon row */}
        <div className="feed-mood-icons">

          {entry.moods.map((mood: MoodType) => (

            <img
              key={mood}
              src={MOOD_ICON[mood]}
              className="feed-mood-icon"
              alt={mood}
            />

          ))}

        </div>

        {/* label row */}
        <div className="feed-mood-labels">

          {entry.moods.map((mood: MoodType) => (

            <span
              key={mood}
              className="feed-mood-label"
              style={{ backgroundColor: MOOD_COLOR[mood] }}
            >
              {MOOD_LABEL[mood]}
            </span>

          ))}

        </div>

      </div>

      {/* note */}
      {entry.note && (

        <div className="feed-note">
          {entry.note}
        </div>

      )}

      {/* image */}
      {hasImage && (

        <div className="feed-image-wrapper">

          <img
            src={entry.image}
            className="feed-image"
            alt="mood"
          />

        </div>

      )}

    </div>

  );

};

export default FeedCard;