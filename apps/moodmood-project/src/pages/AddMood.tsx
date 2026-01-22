import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const AddMood: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>บันทึกอารมณ์</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Add Mood Page
      </IonContent>
    </IonPage>
  );
};

export default AddMood;
