import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
dayjs.locale('th');


import MoodSelector from '../components/MoodSelector';
import TagSelector from '../components/TagSelector';

import './AddMood.css';

const AddMood: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent  className="add-mood-page">

        {/* Header */}
        <div className="add-mood-header">
          <button onClick={() => history.goBack()} className="back-btn">
            <IonIcon icon={arrowBackOutline} />
            กลับ
          </button>

          <h1>บันทึกอารมณ์วันนี้</h1>
          <div className="date">
            {dayjs().format('dddd, D MMMM YYYY')}
          </div>
        </div>

        {/* Mood */}
        <section>
          <label>วันนี้เป็นยังไงบ้าง?</label>
          <MoodSelector />
        </section>

        {/* Tags */}
        <section>
          <label>Tags</label>
          <TagSelector />
        </section>

        {/* Note */}
        <section>
          <label>คำอธิบาย</label>
          <textarea placeholder="คำอธิบาย..." />
        </section>

        {/* Image */}
        <section>
          <label>แนบรูปภาพ</label>
          <div className="image-picker">
            <span>+</span>
          </div>
        </section>

        {/* Submit */}
        <button className="submit-btn">
          + บันทึกอารมณ์
        </button>

      </IonContent>
    </IonPage>
  );
};

export default AddMood;
