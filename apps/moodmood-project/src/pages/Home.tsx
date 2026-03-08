import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardContent, IonButton,
  IonItem, IonLabel, IonList, IonCheckbox, IonAlert, IonIcon,
  IonRefresher, IonRefresherContent,
  useIonViewWillEnter
} from "@ionic/react";

import { useEffect, useState } from "react";
import "./Home.css";

import {
  flameOutline, cloudyOutline, sunnyOutline,
  settingsOutline, moonOutline, rainyOutline
} from "ionicons/icons";

import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import {
  doc, updateDoc, getDoc, collection, addDoc,
  getDocs, deleteDoc, serverTimestamp, query, orderBy
} from "firebase/firestore";

import { Geolocation } from "@capacitor/geolocation";

// ✅ เพิ่ม import รูป
import veryHappy from "../assets/veryhappy.svg";

import { Capacitor } from "@capacitor/core";

type Todo = { id: number; text: string; done: boolean; date?: any; };
type Weather = { temp: number; description: string; city: string; icon: string; };

const Home: React.FC = () => {
  const history = useHistory();
  const [weather, setWeather] = useState<Weather>({ temp: 0, description: "", city: "", icon: "" });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [streak, setStreak] = useState(0);

  const fetchUser = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const docSnap = await getDoc(doc(db, "users", user.uid));

    const q = query(
      collection(db, "users", user.uid, "todos"),
      orderBy("date", "desc")
    );

    const snapshot = await getDocs(q);

    const list: Todo[] = [];

    snapshot.forEach((d) => {
      const data = d.data();
      list.push({
        id: data.id,
        text: data.text,
        done: data.done,
        date: data.date
      });
    });

    setTodos(list);

    if (docSnap.exists()) {
      const data = docSnap.data();
      setUsername(data.username);
      setStreak(data.streak || 0);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useIonViewWillEnter(() => {
    fetchUser();
  });

useEffect(() => {
  const fetchWeather = async () => {
    try {

      let lat = 0;
      let lon = 0;

      if (Capacitor.getPlatform() === "web") {

        navigator.geolocation.getCurrentPosition(async (pos) => {

          lat = pos.coords.latitude;
          lon = pos.coords.longitude;

          const apiKey = "387e5e7079ea8747e015e50f35b986e0";

          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );

          const data = await res.json();

          setWeather({
            temp: Math.round(data.main.temp),
            description: data.weather[0].description,
            city: data.name,
            icon: data.weather[0].icon
          });

        });

      } else {

        const pos = await Geolocation.getCurrentPosition();

        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        const apiKey = "387e5e7079ea8747e015e50f35b986e0";

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await res.json();

        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].description,
          city: data.name,
          icon: data.weather[0].icon
        });

      }

    } catch (e) {
      console.warn("Weather fetch failed:", e);
    }
  };

  fetchWeather();
}, []);
  const today = new Date();

  const thaiDate = today.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const addTodo = async (text: string) => {
    if (!text.trim()) return;

    const user = auth.currentUser;
    if (!user) return;

    const id = Date.now();

    const newTodo = {
      id,
      text,
      done: false,
      date: serverTimestamp()
    };

    setTodos((prev) => [newTodo, ...prev]);

    await addDoc(
      collection(db, "users", user.uid, "todos"),
      newTodo
    );

    setShowAlert(false);
  };

  const handleRefresh = async (event: CustomEvent) => {
    await fetchUser();
    (event.target as HTMLIonRefresherElement).complete();
  };

  const getWeatherIcon = () => {
    if (weather.icon === "01d") return sunnyOutline;
    if (weather.icon === "01n") return moonOutline;
    if (weather.icon.includes("02")) return cloudyOutline;
    if (weather.icon.includes("03") || weather.icon.includes("04")) return cloudyOutline;
    if (weather.icon.includes("09") || weather.icon.includes("10")) return rainyOutline;

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

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="ดึงเพื่อรีเฟรช"
            refreshingText="กำลังโหลด..."
          />
        </IonRefresher>

        <div className="home-top">

          <div className="home-left">
            <div className="home-greeting">
              สวัสดี {username}
            </div>

            <div className="home-date">
              {thaiDate}
            </div>
          </div>

          <div className="home-right">

            <div className="home-icon">
              <IonIcon icon={flameOutline} />
              <span>{streak}</span>
            </div>

            <IonIcon
              icon={settingsOutline}
              className="home-gear"
              onClick={() => history.push("/settings")}
            />

          </div>

        </div>

        <IonCard className="mood-card">

          <IonCardHeader className="mood-header">

            {/* ✅ ใช้ import รูป */}
            <img
              src={veryHappy}
              alt="very happy"
              className="mood-img"
            />

            <IonLabel>
              วันนี้เป็นยังไงบ้าง?
            </IonLabel>

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

              <div className="info-title">
                บันทึกต่อเนื่อง
              </div>

              <div className="streak-row">
                <IonIcon icon={flameOutline} className="streak-icon" />
                <span className="streak-count">{streak}</span>
              </div>

            </IonCardContent>

          </IonCard>

          <IonCard className="weather-card">

            <IonCardContent className="info-card-content">

              <div className="info-title">
                อากาศวันนี้
              </div>

              <div className="weather-row">

                <IonIcon icon={getWeatherIcon()} className="weather-icon" />

                <div className="weather-text-group">

                  <div className="weather-temp">
                    {weather.description
                      ? translateWeather(weather.description)
                      : "กำลังโหลด..."}

                    {weather.temp > 0 ? ` ${weather.temp}°C` : ""}
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

              <IonLabel className="todo-title">
                To-do list
              </IonLabel>

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

                      const snap = await getDocs(
                        collection(db, "users", user.uid, "todos")
                      );

                      snap.forEach(async (d) => {
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

                      setTodos(
                        todos.filter((t) => t.id !== todo.id)
                      );

                      const snap = await getDocs(
                        collection(db, "users", user.uid, "todos")
                      );

                      snap.forEach(async (d) => {
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
          key={showAlert ? "open" : "close"}
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