import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton
} from "@ionic/react";
import {
  personOutline,
  chatbubblesOutline,
  musicalNotesOutline,
  briefcaseOutline,
  globeOutline,
  heartOutline,
  trashOutline
} from "ionicons/icons";
import "./ReflectionHistory.css";

const iconMap: any = {
  self: personOutline,
  daily: musicalNotesOutline,
  work: briefcaseOutline,
  relation: chatbubblesOutline,
  life: globeOutline,
  gratitude: heartOutline
};

const titleMap: any = {
  self: "ตัวเอง",
  daily: "ชีวิตประจำวัน",
  work: "งาน/การเรียน",
  relation: "ความสัมพันธ์",
  life: "มุมมองชีวิต",
  gratitude: "ขอบคุณ/สิ่งดี ๆ"
};

const ReflectionHistory: React.FC = () => {
  const data = JSON.parse(localStorage.getItem("reflectionHistory") || "[]");

  const removeItem = (id: number) => {
    const newData = data.filter((d: any) => d.id !== id);
    localStorage.setItem("reflectionHistory", JSON.stringify(newData));
    window.location.reload();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/reflection" text="กลับ" />
          </IonButtons>
          <IonTitle>ประวัติ</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="history-page">
        {data.map((item: any) => (
          <div key={item.id} className="history-card">
            <div className="history-left">
              <div className="history-icon">
                <IonIcon icon={iconMap[item.category]} />
              </div>
              <div>
                <div className="history-title">{titleMap[item.category]}</div>
                <div className="history-date">
                  {new Date(item.date).toLocaleString("th-TH", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </div>
                <div className="history-question">{item.question}</div>
                <div className="history-answer">{item.answer}</div>
              </div>
            </div>

            <IonButton
              fill="clear"
              size="small"
              color="medium"
              onClick={() => removeItem(item.id)}
            >
              <IonIcon icon={trashOutline} />
            </IonButton>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ReflectionHistory;
