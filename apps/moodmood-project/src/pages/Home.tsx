import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonAlert,
} from "@ionic/react";
import {useState} from "react";
import "./Home.css";
import {IonIcon} from "@ionic/react";
import {flameOutline, cloudyOutline, sunnyOutline, settingsOutline} from "ionicons/icons";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  const today = new Date();
  const thaiDate = today.toLocaleDateString("th-TH", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MoodMood</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding home-content">

      <div className="home-top">
  <div className="home-left">
    <div className="home-greeting">สวัสดี User!</div>
    <div className="home-date">{thaiDate}</div>
  </div>

<div className="home-right">
  <div className="home-icon">
    <IonIcon icon={flameOutline} />
    <span>10</span>
  </div>
  <IonIcon icon={settingsOutline} className="home-gear" />
</div>
</div>

 
      <IonCard className="mood-card">
        <IonCardHeader className="mood-header">
          <img src="/assets/veryhappy.svg" alt="very happy" className="mood-img"/>
        <IonLabel>วันนี้เป็นยังไงบ้าง?</IonLabel>
        </IonCardHeader>

        <IonCardContent className="mood-content">
        <IonButton expand="block" routerLink="/add-mood" className="mood-button">+ บันทึกอารมณ์</IonButton>
        </IonCardContent>

      </IonCard>

<div className="info-row">
<IonCard className="streak-card">
  <IonCardContent className="info-card-content">
    <div className="info-title">บันทึกต่อเนื่อง</div>

    <div className="streak-row">
      <IonIcon icon={flameOutline} className="streak-icon" />
      <span className="streak-count">10</span>
    </div>
  </IonCardContent>
</IonCard>


<IonCard className="weather-card">
  <IonCardContent className="info-card-content">
    <div className="info-title">อากาศวันนี้</div>

    <div className="weather-row">
      <IonIcon icon={sunnyOutline} className="weather-icon" />
      <div className="weather-text-group">
        <div className="weather-temp">แดดออก</div>
        <div className="weather-location">ขอนแก่น</div>
      </div>
    </div>
  </IonCardContent>
</IonCard>
</div>

        <IonCard className="todo-card">
          <IonCardHeader>
            <IonItem lines="none">
              <IonLabel className="todo-title">To-do list</IonLabel>
              <IonButton slot="end" fill="clear" onClick={() => setShowAlert(true)}>+ เพิ่มรายการ</IonButton>
            </IonItem>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              {todos.map((todo) => (
                <IonItem key={todo.id} className="todo-item">
                 <IonCheckbox
                    className="circle-checkbox"
                    slot="start"
                    checked={todo.done}
                    onIonChange={() =>
                    setTodos(
                    todos.map((t) =>
                    t.id === todo.id ? { ...t, done: !t.done } : t
                  )
                )
              }
            />

                  <IonLabel className={todo.done ? "todo-done" : ""}>
                    {todo.text}
                  </IonLabel>
                        <IonButton slot="end" fill="clear" 
                          onClick={() =>
                          setTodos(todos.filter((t) => t.id !== todo.id))
                          }
                          >x
                        </IonButton>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

       <IonAlert
  key={showAlert ? "open" : "closed"}  
  isOpen={showAlert}
  onDidDismiss={() => setShowAlert(false)}
  header="เพิ่มรายการ"
  inputs={[
    {
      name: "todo",
      type: "text",
      placeholder: "เพิ่มรายการที่ต้องทำ...",
    },
  ]}
  buttons={[
    { text: "ยกเลิก", role: "cancel" },
    {
      text: "เพิ่ม",
      handler: (data) => {
        addTodo(data.todo);
        setShowAlert(false);
      },
    },
  ]}
/>

      </IonContent>
    </IonPage>
  );
};

export default Home;
