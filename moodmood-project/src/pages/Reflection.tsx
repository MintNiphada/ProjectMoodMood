import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from "@ionic/react";
import {
  personOutline,
  musicalNotesOutline,
  briefcaseOutline,
  chatbubblesOutline,
  globeOutline,
  heartOutline,
  chevronForwardOutline
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Reflection.css";

const categories = [
  { key: "self", title: "ตัวเอง", icon: personOutline },
  { key: "daily", title: "ชีวิตประจำวัน", icon: musicalNotesOutline },
  { key: "work", title: "งาน/การเรียน", icon: briefcaseOutline },
  { key: "relation", title: "ความสัมพันธ์", icon: chatbubblesOutline },
  { key: "life", title: "มุมมองชีวิต", icon: globeOutline },
  { key: "gratitude", title: "ขอบคุณ/สิ่งดี ๆ", icon: heartOutline }
];

const Reflection: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>คำถามสะท้อนใจ</IonTitle>
        </IonToolbar>
      </IonHeader> */}

      <IonContent fullscreen className="reflection-page">
        <div className="reflection-header">
          <h2>คำถามสะท้อนใจ</h2>
          <p>เลือกหมวดหมู่คำถามเพื่อ<br />
          ทบทวนความคิดและมุมมองตัวเอง</p>
          <div className="reflection-top-row">
            <IonButton size="small" fill="outline" className="history-btn" onClick={() => history.push("/tabs/reflection/history")}>ประวัติ</IonButton>
          </div>
        </div>

        <div className="category-list">
          {categories.map((cat) => (
            <IonItem
              key={cat.key}
              button
              className="category-item"
              onClick={() => history.push(`/tabs/reflection/${cat.key}`)}
            >
              <div className="category-icon">
                <IonIcon icon={cat.icon} />
              </div>
              <IonLabel>{cat.title}</IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonItem>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Reflection;
