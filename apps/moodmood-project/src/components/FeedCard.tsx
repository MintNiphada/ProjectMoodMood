import { IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import { FeedEntry, MoodType } from '../types/Mood';
import { MOOD_ICON, MOOD_LABEL, MOOD_COLOR } from '../constants/moods';

import './FeedCard.css';

interface Props {
    entry: FeedEntry;
}

const FeedCard: React.FC<Props> = ({ entry }) => {
    const hasImage = Boolean(entry.image);
    const mainMood: MoodType = entry.moods[0];

    return (
        <div className={`feed-card ${hasImage ? 'with-image' : 'no-image'}`}>
            {/* header */}
            <div className="feed-header">
                <div className="feed-date">
                    {entry.date} · {entry.time}
                    {entry.tags[0] && <span className="feed-tag">{entry.tags[0]}</span>}
                </div>

                <IonIcon icon={pencilOutline} className="edit-icon" />
            </div>

            {/* mood */}
            <div className="feed-mood">
                <img
                    src={MOOD_ICON[mainMood]}
                    className="feed-mood-icon"
                />

                <span
                    className="feed-mood-label"
                    style={{ backgroundColor: MOOD_COLOR[mainMood] }}
                >
                    {MOOD_LABEL[mainMood]}
                </span>

                {entry.moods.length > 1 && (
                    <div className="feed-mood-secondary">
                        {entry.moods.slice(1).map((m: MoodType) => (
                            <img
                                key={m}
                                src={MOOD_ICON[m]}
                                className="feed-mood-icon small"
                            />
                        ))}
                    </div>
                )}
            </div>



            {/* note */}
            {entry.note && <div className="feed-note">{entry.note}</div>}

            {/* image */}
            {hasImage && (
                <div className="feed-image-wrapper">
                    <img src={entry.image} className="feed-image" />
                </div>
            )}
        </div>
    );
};

export default FeedCard;
