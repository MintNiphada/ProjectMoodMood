import { IonIcon } from '@ionic/react';
import {
  flameOutline,
  swapHorizontalOutline,
  chevronBackOutline,
  chevronForwardOutline
} from 'ionicons/icons';

import "./CalendarHeader.css"

interface Props {
  monthLabel: string;
  streak: number;
  view: 'calendar' | 'timeline';
  onToggleView: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onOpenMonthPicker: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  monthLabel,
  streak,
  view,
  onToggleView,
  onPrevMonth,
  onNextMonth,
  onOpenMonthPicker,
}) => {

  return (

    <div className="calendar-header-bar">

      {/* left side */}

      <div className="month-controls">

        <button
          className="month-nav"
          onClick={onPrevMonth}
        >
          <IonIcon icon={chevronBackOutline} />
        </button>

        <button
          className="month-picker"
          onClick={onOpenMonthPicker}
        >
          {monthLabel}
          <span className="chevron">▾</span>
        </button>

        <button
          className="month-nav"
          onClick={onNextMonth}
        >
          <IonIcon icon={chevronForwardOutline} />
        </button>

      </div>

      {/* right actions */}

      <div className="header-actions">

        <div className="streak">
          <IonIcon icon={flameOutline} />
          <span>{streak}</span>
        </div>

        <button
          className="view-toggle"
          onClick={onToggleView}
        >
          <IonIcon icon={swapHorizontalOutline} />
        </button>

      </div>

    </div>

  );

};

export default CalendarHeader;