// src/pages/AddMood.tsx
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";

import MoodSelector from '../components/MoodSelector';
import TagSelector from '../components/TagSelector';
import { MoodType } from '../types/Mood';
import { updateStreak } from '../utils/streak';

import './AddMood.css';

dayjs.locale('th');

const AddMood: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // ✅ ใช้วันปัจจุบันเสมอ ไม่รับ date จาก query param อีกต่อไป
  const today = dayjs();
  const selectedDate = today.format("YYYY-MM-DD");
  const displayDate  = today.format('dddd, D MMMM YYYY');

  const [moods, setMoods] = useState<MoodType[]>([]);
  const [tags, setTags]   = useState<string[]>([]);
  const [note, setNote]   = useState("");

  // ✅ รูปภาพ: ใช้ Base64 แทน Firebase Storage
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [preview, setPreview]         = useState<string | null>(null);
  const [loading, setLoading]         = useState(false);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // บีบอัดและแปลงเป็น base64
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;

      // resize ด้วย canvas เพื่อลดขนาด
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 800;
        let w = img.width;
        let h = img.height;
        if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
        canvas.width  = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.75);
        setImageBase64(compressed);
        setPreview(compressed);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const saveMood = async () => {
    if (loading) return;
    if (moods.length === 0) { alert("กรุณาเลือกอารมณ์"); return; }

    const user = auth.currentUser;
    if (!user) { alert("กรุณา login"); return; }

    setLoading(true);
    try {
      await addDoc(collection(db, "users", user.uid, "moods"), {
        moods,
        tags,
        note,
        image: imageBase64,        // ✅ เก็บ base64 ตรงๆ ใน Firestore
        date: selectedDate,
        time: today.format("HH:mm"),
        createdAt: serverTimestamp(),
      });

      await updateStreak(user.uid);
      history.goBack();
    } catch (error) {
      console.error("Error saving mood:", error);
      alert("เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent className="add-mood-page">
        <div className="add-mood-header">
          <button onClick={() => history.goBack()} className="back-btn">
            <IonIcon icon={arrowBackOutline} /> กลับ
          </button>
          <h1>บันทึกอารมณ์วันนี้</h1>
          {/* ✅ แสดงวันที่ปัจจุบันเสมอ */}
          <div className="date">{displayDate}</div>
        </div>

        <section>
          <label>วันนี้เป็นยังไงบ้าง?</label>
          <MoodSelector selected={moods} onSelect={setMoods} />
        </section>

        <section>
          <label>Tags</label>
          <TagSelector selected={tags} onChange={setTags} />
        </section>

        <section>
          <label>คำอธิบาย</label>
          <textarea
            placeholder="คำอธิบาย..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </section>

        <section>
          <label>แนบรูปภาพ</label>
          <div className="polaroid-picker">
            <label className="polaroid-frame">
              {preview ? (
                <img src={preview} className="polaroid-preview" />
              ) : (
                <div className="polaroid-placeholder">+</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                hidden
              />
            </label>
          </div>
        </section>

        <button className="submit-btn" onClick={saveMood} disabled={loading}>
          {loading ? "กำลังบันทึก..." : "+ บันทึกอารมณ์"}
        </button>
      </IonContent>
    </IonPage>
  );
};

export default AddMood;