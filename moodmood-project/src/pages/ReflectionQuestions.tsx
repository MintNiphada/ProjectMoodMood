import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from "@ionic/react";
import {
  chevronForwardOutline,
  personOutline,
  musicalNotesOutline,
  briefcaseOutline,
  chatbubblesOutline,
  globeOutline,
  heartOutline
} from "ionicons/icons";
import { useParams, useHistory } from "react-router-dom";
import "./ReflectionQuestions.css";

const categoryMap: any = {
  self: {
    title: "ตัวเอง",
    subtitle: "ทบทวนความคิด ความรู้สึกภายใน",
    icon: personOutline,
    questions: [
      "วันนี้คุณคิดกับตัวเองยังไง?",
      "ตอนนี้คุณกังวลเรื่องอะไรมากที่สุด?",
      "มีอะไรที่คุณกดดันตัวเองไหม?",
      "ช่วงนี้คุณพอใจกับตัวเองแค่ไหน?",
      "ถ้าย้อนกลับไปได้ คุณอยากบอกอะไรกับตัวเองในตอนนี้?"
    ]
  },
  daily: {
    title: "ชีวิตประจำวัน",
    subtitle: "ทบทวนเรื่องราวในแต่ละวัน",
    icon: musicalNotesOutline,
    questions: ["วันนี้เกิดอะไรขึ้นบ้าง?", "ช่วงไหนของวันคุณรู้สึกดีที่สุด?"]
  },
  work: {
    title: "งาน/การเรียน",
    subtitle: "ทบทวนเรื่องงานและการเรียน",
    icon: briefcaseOutline,
    questions: ["วันนี้งาน/เรียนเป็นยังไงบ้าง?"]
  },
  relation: {
    title: "ความสัมพันธ์",
    subtitle: "ทบทวนความสัมพันธ์รอบตัว",
    icon: chatbubblesOutline,
    questions: ["ช่วงนี้ความสัมพันธ์กับคนรอบตัวเป็นยังไง?"]
  },
  life: {
    title: "มุมมองชีวิต",
    subtitle: "ทบทวนทัศนคติและเป้าหมาย",
    icon: globeOutline,
    questions: ["ตอนนี้ชีวิตคุณกำลังไปทางไหน?"]
  },
  gratitude: {
    title: "ขอบคุณ/สิ่งดี ๆ",
    subtitle: "ทบทวนสิ่งดี ๆ ในชีวิต",
    icon: heartOutline,
    questions: ["วันนี้คุณรู้สึกขอบคุณอะไร?"]
  }
};

const ReflectionQuestions: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const history = useHistory();
  const data = categoryMap[category];

  if (!data) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="กลับ" defaultHref="/tabs/reflection" />
          </IonButtons>
          <IonTitle />
          <IonButtons slot="end">
            <IonButton size="small" fill="clear" className="history-btn"
              onClick={() => history.push("/tabs/reflection/history")}
            >
              ประวัติ
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="rq-page">
        <div className="rq-header">
          <div className="rq-icon">
            <IonIcon icon={data.icon} />
          </div>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
        </div>

        <div className="rq-list">
          {data.questions.map((q: string, i: number) => (
            <IonItem
              key={i}
              button
              className="rq-item"
              onClick={() => history.push(`/tabs/reflection/${category}/${i}`)}
            >
              <IonLabel>{q}</IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonItem>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ReflectionQuestions;
