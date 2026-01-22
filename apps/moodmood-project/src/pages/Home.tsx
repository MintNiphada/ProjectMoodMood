import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>หน้าแรก</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        Duck Home Page 🦆
      </IonContent>
    </IonPage>
  );
};

export default Home;
