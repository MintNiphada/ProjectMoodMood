import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonTextarea,
  IonButton
} from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import "./ReflectionAnswer.css";
import { useState } from "react";

const questionsMap: any = {
  self: [
    "วันนี้คุณคิดกับตัวเองยังไง?",
    "ตอนนี้คุณกังวลเรื่องอะไรมากที่สุด?",
    "มีอะไรที่คุณกดดันตัวเองไหม?",
    "ช่วงนี้คุณพอใจกับตัวเองแค่ไหน?",
    "ถ้าย้อนกลับไปได้ คุณอยากบอกอะไรกับตัวเองในตอนนี้?"
  ]
};

const ReflectionAnswer: React.FC = () => {
  const { category, index } = useParams<{ category: string; index: string }>();
  const history = useHistory();
  const question = questionsMap[category]?.[Number(index)];
  const [answer, setAnswer] = useState("");

  const saveAnswer = () => {
    const old = JSON.parse(localStorage.getItem("reflectionHistory") || "[]");

    const newItem = {
      id: Date.now(),
      category,
      question,
      answer,
      date: new Date().toISOString()
    };

    localStorage.setItem(
      "reflectionHistory",
      JSON.stringify([newItem, ...old])
    );

    history.push("/tabs/reflection/history");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref={`/tabs/reflection/${category}`} text="กลับ" />
        </IonButtons>
        <IonTitle className="center-title">ตอบคำถาม</IonTitle>
        <br />
        </IonToolbar>
    </IonHeader>

    <IonContent fullscreen className="answer-page">
        <div className="answer-wrapper">
            <div className="answer-card">
            <p className="answer-question">{question}</p>

            <IonTextarea
                placeholder="คำตอบของคุณ..."
                value={answer}
                onIonChange={(e) => setAnswer(e.detail.value!)}
                autoGrow/>
            <div className="answer-footer">
                <IonButton size="small" onClick={saveAnswer}>บันทึกคำตอบ</IonButton>
            </div>
            </div>
        </div>
    </IonContent>

    </IonPage>
  );
};

export default ReflectionAnswer;
