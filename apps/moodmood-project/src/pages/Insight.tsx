import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Insight: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ข้อมูลเชิงลึก</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Insight Page
      </IonContent>
    </IonPage>
  );
};

export default Insight;
