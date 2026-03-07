import { IonIcon } from "@ionic/react";

import {
  bedOutline,
  walkOutline,
  waterOutline,
  leafOutline
} from "ionicons/icons";

const ActivitySelector: React.FC = () => {

  return (

    <div className="activity-selector">

      <button className="activity-item">

        <div className="activity-icon">
          <IonIcon icon={bedOutline}/>
        </div>

        <span>นอน</span>

      </button>

      <button className="activity-item">

        <div className="activity-icon">
          <IonIcon icon={walkOutline}/>
        </div>

        <span>ออกกำลังกาย</span>

      </button>

      <button className="activity-item">

        <div className="activity-icon">
          <IonIcon icon={waterOutline}/>
        </div>

        <span>ดื่มน้ำ</span>

      </button>

      <button className="activity-item">

        <div className="activity-icon">
          <IonIcon icon={leafOutline}/>
        </div>

        <span>นั่งสมาธิ</span>

      </button>

    </div>

  );

};

export default ActivitySelector;