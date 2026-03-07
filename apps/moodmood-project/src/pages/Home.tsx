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
import { useState, useEffect } from "react";
import "./Home.css";
import { IonIcon } from "@ionic/react";
import {
  flameOutline,
  cloudyOutline,
  sunnyOutline,
  settingsOutline,
  rainyOutline,
  moonOutline,
  cloudDone,
} from "ionicons/icons";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type Weather = {
  temp: number;
  description: string;
  city: string;
  icon: string;
};

const Home: React.FC = () => {
  const [weather, setWeather] = useState<Weather>({
    temp: 0,
    description: "",
    city: "",
    icon: "",
  });

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const apiKey = import.meta.env.VITE_WEATHER_KEY;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      const data = await res.json();

      setWeather({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        city: data.name,
        icon: data.weather[0].icon,
      });
    });
  }, []);

  const getWeatherIcon = () => {
    if (weather.icon === "01d") return sunnyOutline;
    if (weather.icon === "01n") return moonOutline;

    if (weather.icon === "02") return cloudyOutline;

    if (weather.icon.includes("03") || weather.icon.includes("04"))
      return cloudyOutline;

    if (weather.icon.includes("09") || weather.icon.includes("10"))
      return rainyOutline;

    return cloudyOutline;
  };

  const translateWeather = (desc: string) => {
    if (desc.includes("few clouds")) return "มีเมฆเล็กน้อย";
    if (desc.includes("cloud")) return "มีเมฆ";
    if (desc.includes("rain")) return "ฝนตก";
    if (desc.includes("clear")) return "ท้องฟ้าโปร่ง";
    return desc;
  };

  const translateCity = (city: string) => {
    if (city === "Khon Kaen") return "ขอนแก่น";
    if (city === "Bangkok") return "กรุงเทพ";
    if (city === "Chiang Mai") return "เชียงใหม่";
    return city;
  };

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
            <img
              src="/assets/veryhappy.svg"
              alt="very happy"
              className="mood-img"
            />
            <IonLabel>วันนี้เป็นยังไงบ้าง?</IonLabel>
          </IonCardHeader>

          <IonCardContent className="mood-content">
            <IonButton expand="block" routerLink="/add-mood" className="mood-button">
              + บันทึกอารมณ์
            </IonButton>
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
                <IonIcon icon={getWeatherIcon()} className="weather-icon" />
                <div className="weather-text-group">
                  <div className="weather-temp">{weather.temp}°C</div>
                  <div className="weather-location">
                    {translateCity(weather.city)}
                  </div>
                  <div className="weather-desc">
                    {translateWeather(weather.description)}
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

        </div>

        <IonCard className="todo-card">
          <IonCardHeader>
            <IonItem lines="none">
              <IonLabel className="todo-title">To-do list</IonLabel>
              <IonButton
                slot="end"
                fill="clear"
                onClick={() => setShowAlert(true)}
              >
                + เพิ่มรายการ
              </IonButton>
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

                  <IonButton
                    slot="end"
                    fill="clear"
                    onClick={() =>
                      setTodos(todos.filter((t) => t.id !== todo.id))
                    }
                  >
                    x
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