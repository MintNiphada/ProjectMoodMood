import {
  IonPage,
  IonContent,
  IonIcon,
  useIonAlert,
  useIonToast,
  useIonLoading
} from '@ionic/react';

import { arrowBackOutline } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import 'dayjs/locale/th';

import { useState, useEffect } from 'react';

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage, auth } from "../firebase";

import MoodSelector from '../components/MoodSelector';
import TagSelector from '../components/TagSelector';
import { MoodType } from '../types/Mood';

import './AddMood.css';

dayjs.locale('th');

interface Params {
  id: string;
}

const EditMood: React.FC = () => {

  const { id } = useParams<Params>();
  const history = useHistory();

  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  const [moods, setMoods] = useState<MoodType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // โหลดข้อมูล mood เดิม
  useEffect(() => {

    const loadMood = async () => {

      const user = auth.currentUser;
      if (!user) return;

      const refDoc = doc(db, "users", user.uid, "moods", id);

      const snap = await getDoc(refDoc);

      if (!snap.exists()) return;

      const data = snap.data();

      setMoods(data.moods || []);
      setTags(data.tags || []);
      setNote(data.note || "");
      setDate(data.date || "");

      if (data.image) {
        setPreview(data.image);
      }

    };

    loadMood();

  }, [id]);

  // เลือกรูป
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files?.[0]) {

      const file = e.target.files[0];

      setImage(file);

      const previewUrl = URL.createObjectURL(file);

      setPreview(previewUrl);

    }

  };

  // บันทึกการแก้ไข
  const saveEdit = async () => {

    const user = auth.currentUser;

    if (!user) {

      presentAlert({
        header: "แจ้งเตือน",
        message: "กรุณาเข้าสู่ระบบ",
        buttons: ["ตกลง"]
      });

      return;

    }

    try {

      await presentLoading({
        message: "กำลังบันทึก..."
      });

      let imageUrl = preview || null;

      if (image) {

        const imageRef = ref(
          storage,
          `moods/${user.uid}/${Date.now()}_${image.name}`
        );

        const snapshot = await uploadBytes(imageRef, image);

        imageUrl = await getDownloadURL(snapshot.ref);

      }

      const refDoc = doc(db, "users", user.uid, "moods", id);

      await updateDoc(refDoc, {

        moods,
        tags,
        note,
        image: imageUrl,
        updatedAt: new Date()

      });

      await dismissLoading();

      presentToast({
        message: "บันทึกการแก้ไขเรียบร้อย",
        duration: 2000,
        position: "bottom",
        color: "success",
          cssClass: "app-toast"

      });

      history.goBack();

    } catch (error) {

      console.error(error);

      await dismissLoading();

      presentAlert({
        header: "เกิดข้อผิดพลาด",
        message: "ไม่สามารถบันทึกข้อมูลได้",
        buttons: ["ปิด"]
      });

    }

  };

  return (

    <IonPage>

      <IonContent className="add-mood-page">

        <div className="add-mood-header">

          <button
            onClick={() => history.goBack()}
            className="back-btn"
          >
            <IonIcon icon={arrowBackOutline} />
            กลับ
          </button>

          <h1>แก้ไขอารมณ์</h1>

          <div className="date">
            {date && dayjs(date).format('dddd, D MMMM YYYY')}
          </div>

        </div>

        <section>
          <label>วันนี้เป็นยังไงบ้าง?</label>
          <MoodSelector
            selected={moods}
            onSelect={setMoods}
          />
        </section>

        <section>
          <label>Tags</label>
          <TagSelector
            selected={tags}
            onChange={setTags}
          />
        </section>

        <section>

          <label>คำอธิบาย</label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

        </section>

        <section>

          <label>แนบรูปภาพ</label>

          <div className="polaroid-picker">

            <label className="polaroid-frame">

              {preview ? (

                <img
                  src={preview}
                  className="polaroid-preview"
                  alt="preview"
                />

              ) : (

                <div className="polaroid-placeholder">
                  +
                </div>

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

        <button
          className="submit-btn"
          onClick={saveEdit}
        >
          บันทึกการแก้ไข
        </button>

      </IonContent>

    </IonPage>

  );

};

export default EditMood;