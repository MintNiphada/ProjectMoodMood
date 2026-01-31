import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Activity: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>กิจกรรม</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        Activity Page
      </IonContent>
    </IonPage>
  );
};

export default Activity;
