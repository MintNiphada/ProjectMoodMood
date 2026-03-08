import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonSelect,
  IonSelectOption
} from "@ionic/react";

import {
  personOutline,
  chatbubblesOutline,
  musicalNotesOutline,
  briefcaseOutline,
  globeOutline,
  heartOutline,
  trashOutline,
  arrowBackOutline
} from "ionicons/icons";

import "./ReflectionHistory.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore";
  
import { useHistory } from "react-router-dom";

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

  const history = useHistory();

  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");

  const { category } = useParams<{ category: string }>();

  useEffect(() => {

    const fetchData = async () => {

      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "reflections"),
        orderBy("date", "desc")
      );

      const snapshot = await getDocs(q);

      const list: any[] = [];

      snapshot.forEach((docItem) => {
        list.push({
          id: docItem.id,
          ...docItem.data()
        });
      });

      setData(list);
    };

    fetchData();

  }, []);

  const removeItem = async (id: string) => {

    const user = auth.currentUser;
    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "reflections", id)
    );

    setData(data.filter((d) => d.id !== id));

  };

  const filteredData = data.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (

    <IonPage>

      <IonHeader>
        <IonToolbar>

          <IonButtons slot="start">
            <IonButton onClick={() => history.go(-2)}>
              <IonIcon slot="start" icon={arrowBackOutline} />
              กลับ
            </IonButton>
          </IonButtons>

          <IonTitle className="history-title-center">ประวัติ</IonTitle>

        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="history-page">

        <div style={{ padding: "12px" }}>

          <IonSelect
            value={filter}
            placeholder="เลือกหมวดหมู่"
            onIonChange={(e) => setFilter(e.detail.value)}
          >

            <IonSelectOption value="all">
              ทั้งหมด
            </IonSelectOption>

            <IonSelectOption value="self">
              ตัวเอง
            </IonSelectOption>

            <IonSelectOption value="daily">
              ชีวิตประจำวัน
            </IonSelectOption>

            <IonSelectOption value="work">
              งาน / การเรียน
            </IonSelectOption>

            <IonSelectOption value="relation">
              ความสัมพันธ์
            </IonSelectOption>

            <IonSelectOption value="life">
              มุมมองชีวิต
            </IonSelectOption>

            <IonSelectOption value="gratitude">
              ขอบคุณ / สิ่งดี ๆ
            </IonSelectOption>

          </IonSelect>

        </div>

        {filteredData.length === 0 ? (

          <div className="empty-text">
            ความคิดในหมวดนี้ยังไม่ได้ถูกเขียนลงไป<br/>
            บางทีวันนี้อาจเป็นวันแรกของมัน<br/>
            <br/>  
            รอให้คุณไปตอบในหน้าคำถามสะท้อนใจ          
          </div>

        ) : (

          filteredData.map((item: any) => (

            <div key={item.id} className="history-card">

              <div className="history-left">

                <div className="history-icon">
                  <IonIcon icon={iconMap[item.category]} />
                </div>

                <div>

                  <div className="history-title">
                    {titleMap[item.category]}
                  </div>

                  <div className="history-date">
                    {item.date
                      ? item.date
                          .toDate()
                          .toLocaleString("th-TH", {
                            dateStyle: "medium",
                            timeStyle: "short"
                          })
                      : ""}
                  </div>

                  <div className="history-question">
                    {item.question}
                  </div>

                  <div className="history-answer">
                    {item.answer}
                  </div>

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

          ))

        )}

      </IonContent>

    </IonPage>

  );
};

export default ReflectionHistory;