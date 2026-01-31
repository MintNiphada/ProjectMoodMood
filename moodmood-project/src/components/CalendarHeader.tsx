import { IonIcon } from '@ionic/react';
import { flameOutline, swapHorizontalOutline } from 'ionicons/icons';
import "./CalendarHeader.css"

interface Props {
  monthLabel: string;
  streak: number;
  view: 'calendar' | 'timeline';
  onToggleView: () => void;
  onOpenMonthPicker: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  monthLabel,
  streak,
  view,
  onToggleView,
  onOpenMonthPicker,
}) => {
  return (
    <div className="calendar-header-bar">
      {/* Month Picker */}
      <button className="month-picker" onClick={onOpenMonthPicker}>
        {monthLabel} <span className="chevron">▾</span>
      </button>

      {/* Right actions */}
      <div className="header-actions">
        <div className="streak">
          <IonIcon icon={flameOutline} />
          <span>{streak}</span>
        </div>

        <button className="view-toggle" onClick={onToggleView}>
          <IonIcon icon={swapHorizontalOutline} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
