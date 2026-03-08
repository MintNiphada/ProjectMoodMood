import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateStreak = async (uid: string) => {

  const ref = doc(db, "users", uid);
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
    newStreak = data.streak || 1;
  }

  await updateDoc(ref, {
    streak: newStreak,
    lastMoodDate: today
  });

};