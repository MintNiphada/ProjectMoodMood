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
  IonIcon
} from "@ionic/react";

import { useEffect, useState } from "react";
import "./Home.css";

import {
  flameOutline,
  cloudyOutline,
  sunnyOutline,
  settingsOutline,
  moonOutline,
  rainyOutline
} from "ionicons/icons";

import { auth, db } from "../firebase";
import { doc, updateDoc, getDoc, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";

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
  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState(0);

useEffect(() => {

  const fetchUser = async () => {

    const user = auth.currentUser;
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const snapshot = await getDocs(collection(db, "users", user.uid, "todos"));
    const list: Todo[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      list.push({
        id: data.id,
        text: data.text,
        done: data.done
      });
    });

    setTodos(list);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username);
      setStreak(data.streak || 0);
    }

  };

  fetchUser();

}, []);

const addTodo = async (text: string) => {

  if (!text.trim()) return;

  const user = auth.currentUser;
  if (!user) return;

  const id = Date.now();

  const newTodo = {
    id,
    text,
    done: false
  };

  setTodos([...todos, newTodo]);

  await addDoc(collection(db, "users", user.uid, "todos"), newTodo);

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

    if (weather.icon.includes("02")) return cloudyOutline;

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

  const updateStreak = async () => {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  const today = new Date().toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak = 1;

  if (data.lastMoodDate === yesterdayStr) {
    newStreak = (data.streak || 0) + 1;
  }

  if (data.lastMoodDate === today) {
    newStreak = data.streak;
  }

  await updateDoc(ref, {
    streak: newStreak,
    lastMoodDate: today
  });

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
            <div className="home-greeting">สวัสดี {username}</div>
            <div className="home-date">{thaiDate}</div>
          </div>

          <div className="home-right">

            <div className="home-icon">
              <IonIcon icon={flameOutline} />
              <span>{streak}</span>
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

            <IonButton
              expand="block"
              routerLink="/add-mood"
              className="mood-button"
            >
              + บันทึกอารมณ์
            </IonButton>

          </IonCardContent>

        </IonCard>

        <div className="info-row">

          <IonCard className="weather-card">

            <IonCardContent className="info-card-content">

              <div className="info-title">บันทึกต่อเนื่อง</div>

              <div className="streak-row">
                <IonIcon icon={flameOutline} className="streak-icon" />
                <span className="streak-count">{streak}</span>
              </div>

            </IonCardContent>

          </IonCard>

          <IonCard className="weather-card">

            <IonCardContent className="info-card-content">

              <div className="info-title">อากาศวันนี้</div>

              <div className="weather-row">

                <IonIcon icon={getWeatherIcon()} className="weather-icon" />

                <div className="weather-text-group">

                  <div className="weather-temp">
                    {translateWeather(weather.description)} {weather.temp}°C
                  </div>

                  <div className="weather-location">
                    {translateCity(weather.city)}
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
  onIonChange={async (e) => {

    const user = auth.currentUser;
    if (!user) return;

    const updated = e.detail.checked;

    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id
          ? { ...t, done: updated }
          : t
      )
    );

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "todos")
    );

    snapshot.forEach(async (d) => {
      if (d.data().id === todo.id) {
        await updateDoc(d.ref, { done: updated });
      }
    });

  }}
/>

                  <IonLabel className={todo.done ? "todo-done" : ""}>
                    {todo.text}
                  </IonLabel>

                  <IonButton
                    slot="end"
                    fill="clear"
                    onClick={async () => {
                      const user = auth.currentUser;
                      if (!user) return;
                      setTodos(todos.filter((t) => t.id !== todo.id));
                      const snapshot = await getDocs(
                        collection(db, "users", user.uid, "todos")
                        );
                        snapshot.forEach(async (d) => {
                          if (d.data().id === todo.id) {
                            await deleteDoc(d.ref);
                            }
                      });
                  }}
                  >
                    x
                  </IonButton>

                </IonItem>

              ))}

            </IonList>

          </IonCardContent>

        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="เพิ่มรายการ"
          inputs={[
            {
              name: "todo",
              type: "text",
              placeholder: "เพิ่มรายการที่ต้องทำ..."
            }
          ]}
          buttons={[
            { text: "ยกเลิก", role: "cancel" },
            {
              text: "เพิ่ม",
              handler: (data) => {
                addTodo(data.todo);
              }
            }
          ]}
        />

      </IonContent>

    </IonPage>
  );

};

export default Home;