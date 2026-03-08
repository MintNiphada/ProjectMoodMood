import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  useIonAlert
} from "@ionic/react";

import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import dayjs from "dayjs";

import CalendarHeader from "../components/CalendarHeader";
import MoodCalendar from "../components/MoodCalendar";
import FeedCard from "../components/FeedCard";

import { MoodType, FeedEntry } from "../types/Mood";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

import { db, auth } from "../firebase";

const Calendar: React.FC = () => {

  const history = useHistory();

  const [presentAlert] = useIonAlert();

  const [view, setView] =
    useState<'calendar' | 'timeline'>('calendar');

  const [currentDate, setCurrentDate] =
    useState(dayjs());

  const [moodData,
    setMoodData] =
    useState<Record<string, MoodType[]>>({});

  const [feedData,
    setFeedData] =
    useState<FeedEntry[]>([]);

  const monthLabel =
    currentDate.format("MMMM YYYY");

  const prevMonth = () =>
    setCurrentDate(d => d.subtract(1, "month"));

  const nextMonth = () =>
    setCurrentDate(d => d.add(1, "month"));

  const handleSelectDate = (date: string) => {

    history.push(`/add-mood?date=${date}`);

  };

  const fetchMoods = async () => {

    const user = auth.currentUser;

    if (!user) return;

    const snapshot = await getDocs(
      collection(db, "users", user.uid, "moods")
    );

    const calendarData: Record<string, MoodType[]> = {};
    const feed: FeedEntry[] = [];

    const selectedMonth =
      currentDate.format("YYYY-MM");

    snapshot.forEach((docSnap) => {

      const data = docSnap.data();

      const date = data.date;
      const moods: MoodType[] =
        data.moods || [];

      if (!calendarData[date]) {
        calendarData[date] = [];
      }

      calendarData[date].push(...moods);

      if (date.startsWith(selectedMonth)) {

        feed.push({
          id: docSnap.id,
          date: data.date,
          time: data.time || "",
          moods: moods,
          tags: data.tags || [],
          note: data.note || "",
          image: data.image || undefined,
          createdAt: data.createdAt
        });

      }

    });

    feed.sort((a, b) =>
      `${b.date}${b.time}`
        .localeCompare(`${a.date}${a.time}`)
    );

    setMoodData(calendarData);
    setFeedData(feed);

  };

  useEffect(() => {
    fetchMoods();
  }, [currentDate]);

  const handleEdit = (id: string) => {

    history.push(`/edit-mood/${id}`);

  };

  const handleDelete = async (id: string) => {

    const user = auth.currentUser;

    if (!user) return;

    presentAlert({
      header: "ยืนยันการลบ",
      message: "ต้องการลบรายการนี้หรือไม่?",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel"
        },
        {
          text: "ลบ",
          role: "destructive",
          handler: async () => {

            await deleteDoc(
              doc(db, "users", user.uid, "moods", id)
            );

            setFeedData(prev =>
              prev.filter(entry => entry.id !== id)
            );

          }
        }
      ]
    });

  };

  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>MoodMood</IonTitle>

        </IonToolbar>

      </IonHeader>

      <IonContent fullscreen>

        <CalendarHeader
          monthLabel={monthLabel}
          streak={10}
          view={view}
          onToggleView={() =>
            setView(v =>
              v === "calendar"
                ? "timeline"
                : "calendar"
            )
          }
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onOpenMonthPicker={() => {}}
        />

        {view === "calendar" && (

          <MoodCalendar
            year={currentDate.year()}
            month={currentDate.month()}
            data={moodData}
            onSelectDate={handleSelectDate}
          />

        )}

        <div className="calendar-feed">

          {feedData.map(entry => (

            <FeedCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

          ))}

        </div>

        <div className="floating-add-button">

          <button
            className="fab"
            onClick={() =>
              history.push("/add-mood")
            }
          >
            +
          </button>

        </div>

      </IonContent>

    </IonPage>

  );

};

export default Calendar;