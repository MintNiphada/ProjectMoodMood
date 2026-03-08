import {
  IonPage,
  IonContent
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import ActivitySection from "../components/Activity/ActivitySection";

import "./Activity.css";

const Activity: React.FC = () => {

  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="activity-page">

        <div className="activity-header">

          <h1>กิจกรรม</h1>

          <button
            className="add-activity-btn"
            onClick={() => history.push("/add-activity")}
          >
            + เพิ่มกิจกรรม
          </button>

        </div>

        <div className="activity-range">
          1 ตุลาคม 2568 - 31 ธันวาคม 2568 ▾
        </div>

        <ActivitySection date="30 ธันวาคม 2568" />
        <ActivitySection date="23 ธันวาคม 2568" />

      </IonContent>
    </IonPage>
  );
};

export default Activity;