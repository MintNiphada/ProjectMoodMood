import {
  IonPage,
  IonContent
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import ActivitySelector from "../components/Activity/ActivitySelector";

import "./AddActivity.css";

const AddActivity:React.FC = () => {
    const history = useHistory();
  return(

    <IonPage>
      <IonContent fullscreen className="add-activity-page">

        <button className="back-btn"
          onClick={() => history.goBack()} >
          ← กลับ
        </button>

        <div className="add-card">

          <h2>เพิ่มกิจกรรม</h2>

          <div className="date">
            30 ธันวาคม 2568
          </div>

          <ActivitySelector/>

          <select className="duration">
            <option>8 ชั่วโมง</option>
            <option>7 ชั่วโมง</option>
          </select>

          <textarea
            placeholder="คำอธิบาย..."
          />

          <button className="save-btn">
            บันทึกกิจกรรม
          </button>

        </div>

      </IonContent>
    </IonPage>

  )

}

export default AddActivity