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
          <IonTitle>อารมณ์ของฉัน</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Reflection Page
      </IonContent>
    </IonPage>
  );
};

export default Reflection;
