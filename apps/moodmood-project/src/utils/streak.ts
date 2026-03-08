import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const updateStreak = async () => {

  const user = auth.currentUser;
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  const today = new Date().toDateString();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  const last = data.lastCheckIn;

  if (last === today) return;

  let newStreak = 1;

  if (last === yesterdayStr) {
    newStreak = (data.streak || 0) + 1;
  }

  await updateDoc(ref, {
    streak: newStreak,
    lastCheckIn: today
  });

};