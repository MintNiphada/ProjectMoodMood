import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import dayjs from 'dayjs';

import './MoodCalendar.css';
import { MoodType } from '../types/Mood';
import { MOOD_ICON } from '../constants/moods';

interface MoodCalendarProps {
  year: number;
  month: number; // 0-11
  data: Record<string, MoodType[]>;
  onSelectDate: (date: string) => void;
}

const WEEK_DAYS = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];

const MoodCalendar: React.FC<MoodCalendarProps> = ({
  year,
  month,
  data,
  onSelectDate,
}) => {
  const startOfMonth = dayjs().year(year).month(month).startOf('month');
  const daysInMonth = startOfMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const cells: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <IonGrid className="mood-calendar">
      {/* ===== Header  ===== */}
      <IonRow>
        {WEEK_DAYS.map(day => (
          <IonCol key={day} className="calendar-header">
            <IonText>{day}</IonText>
          </IonCol>
        ))}
      </IonRow>

      {/* ===== Calendar Body ===== */}
      <div className="calendar-body">
        {cells.map((day, index) => {
          if (!day) {
            return <div key={index} className="calendar-cell empty" />;
          }

          const date = dayjs()
            .year(year)
            .month(month)
            .date(day)
            .format('YYYY-MM-DD');

          const moods = data[date];

          return (
            <div
              key={index}
              className="calendar-cell"
              onClick={() => onSelectDate(date)}
            >
              <div className="calendar-cell-inner">
                <div className="day-number">{day}</div>

                {moods && moods.length > 0 ? (
                  <div className="mood-icons">
                    {moods.map(mood => (
                      <img
                        key={mood}
                        src={MOOD_ICON[mood]}
                        alt={mood}
                        className="mood-icon"
                      />
                    ))}
                  </div>
                ) : (
                  <IonIcon icon={addOutline} className="add-icon" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </IonGrid>
  );
};

export default MoodCalendar;
