import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Calendar: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ปฏิทิน</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Calendar Page
      </IonContent>
    </IonPage>
  );
};

export default Calendar;
