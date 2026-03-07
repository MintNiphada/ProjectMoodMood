import { IonIcon } from "@ionic/react";
import { calendarOutline, flameOutline } from "ionicons/icons";

const StreakCards: React.FC = () => {
  return (
    <div className="streak-cards">

      <div className="streak-card">
        <IonIcon icon={calendarOutline} />
        <div>
          <div>บันทึกไปทั้งหมด</div>
          <span className="highlight">10 วัน</span>
        </div>
      </div>

      <div className="streak-card">
        <IonIcon icon={flameOutline} />
        <div>
          <div>บันทึกต่อเนื่องสูงสุด</div>
          <span className="highlight">10 วัน</span>
        </div>
      </div>

    </div>
  );
};

export default StreakCards;