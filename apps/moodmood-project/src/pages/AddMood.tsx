import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

import { useState } from 'react';

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage, auth } from "../firebase";

import MoodSelector from '../components/MoodSelector';
import TagSelector from '../components/TagSelector';
import { MoodType } from '../types/Mood';

import { updateStreak } from '../utils/streak';

import './AddMood.css';

dayjs.locale('th');

const AddMood: React.FC = () => {

    const history = useHistory();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const selectedDate =
        params.get("date") || dayjs().format("YYYY-MM-DD");

    const [moods, setMoods] = useState<MoodType[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [note, setNote] = useState("");

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.[0]) {

            const file = e.target.files[0];

            setImage(file);

            const previewUrl = URL.createObjectURL(file);

            setPreview(previewUrl);

        }

    };

    const saveMood = async () => {

        if (loading) return;

        if (moods.length === 0) {
            alert("กรุณาเลือกอารมณ์");
            return;
        }

        const user = auth.currentUser;

        if (!user) {
            alert("กรุณา login");
            return;
        }

        setLoading(true);

        try {

            let imageUrl: string | null = null;

            if (image) {

                const imageRef = ref(
                    storage,
                    `moods/${user.uid}/${Date.now()}_${image.name}`
                );

                const snapshot = await uploadBytes(imageRef, image);

                imageUrl = await getDownloadURL(snapshot.ref);

            }

            await addDoc(
                collection(db, "users", user.uid, "moods"),
                {
                    moods,
                    tags,
                    note,
                    image: imageUrl,
                    date: selectedDate,
                    createdAt: serverTimestamp()
                }
            );


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

                    <button
                        onClick={() => history.goBack()}
                        className="back-btn"
                    >

                        <IonIcon icon={arrowBackOutline} />

                        กลับ

                    </button>

                    <h1>บันทึกอารมณ์</h1>

                    <div className="date">

                        {dayjs(selectedDate).format('dddd, D MMMM YYYY')}

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

                                <img
                                    src={preview}
                                    className="polaroid-preview"
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
                    onClick={saveMood}
                    disabled={loading}
                >

                    {loading ? "กำลังบันทึก..." : "+ บันทึกอารมณ์"}

                </button>

            </IonContent>

        </IonPage>

    );

};

export default AddMood;