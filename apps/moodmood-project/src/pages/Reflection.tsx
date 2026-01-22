import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Reflection: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>คำถามสะท้อนใจ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Reflection Page
      </IonContent>
    </IonPage>
  );
};

export default Reflection;
