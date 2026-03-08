import { IonText, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import dayjs from 'dayjs';

import './MoodCalendar.css';
import { MoodType } from '../types/Mood';
import { MOOD_ICON } from '../constants/moods';

interface MoodCalendarProps {
  year: number;
  month: number;
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

  const today = dayjs().format('YYYY-MM-DD');

  const cells: (number | null)[] = [];

  // เติมช่องว่างก่อนวันแรก
  for (let i = 0; i < startDay; i++) {
    cells.push(null);
  }

  // ใส่วัน
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (

    <div className="mood-calendar">

      {/* header */}
      <div className="calendar-header-row">

        {WEEK_DAYS.map(day => (
          <div key={day} className="calendar-header">
            <IonText>{day}</IonText>
          </div>
        ))}

      </div>

      {/* body */}

      <div className="calendar-grid">

        {cells.map((day, index) => {

          if (!day) {
            return (
              <div key={index} className="calendar-cell empty" />
            );
          }

          const date = dayjs()
            .year(year)
            .month(month)
            .date(day)
            .format('YYYY-MM-DD');

          const moods = data[date];

          const isToday = date === today;

          return (

            <div
              key={index}
              className={`calendar-cell ${isToday ? 'today' : ''}`}
              onClick={() => onSelectDate(date)}
            >

              <div className="day-number">

                {day}

              </div>

              {moods && moods.length > 0 ? (

                <div className="mood-icons">

                  {moods.slice(0,2).map(mood => (

                    <img
                      key={mood}
                      src={MOOD_ICON[mood]}
                      className="mood-icon"
                    />

                  ))}

                </div>

              ) : (

                <IonIcon icon={addOutline} className="add-icon" />

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default MoodCalendar;