// src/pages/AddActivity.tsx
import React, { useState } from 'react';
import { IonPage, IonContent, IonToast, IonSpinner } from '@ionic/react';
import { IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  bedOutline, walkOutline, bookOutline, leafOutline
} from 'ionicons/icons';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './AddActivity.css';

const ACTIVITIES = [
  { key: 'นอน',          icon: bedOutline  },
  { key: 'ออกกำลังกาย', icon: walkOutline },
  { key: 'อ่านหนังสือ', icon: bookOutline },
  { key: 'นั่งสมาธิ',   icon: leafOutline },
];

const DURATIONS = [
  '30 นาที','1 ชั่วโมง','1.5 ชั่วโมง','2 ชั่วโมง','2.5 ชั่วโมง',
  '3 ชั่วโมง','4 ชั่วโมง','5 ชั่วโมง','6 ชั่วโมง',
  '7 ชั่วโมง','8 ชั่วโมง','9 ชั่วโมง','10 ชั่วโมง',
];

const AddActivity: React.FC = () => {
  const history = useHistory();
  const [selected, setSelected]   = useState('');
  const [duration, setDuration]   = useState('1 ชั่วโมง');
  const [note, setNote]           = useState('');
  const [loading, setLoading]     = useState(false);
  const [toast, setToast]         = useState('');
  const [toastColor, setToastColor] = useState<'success'|'danger'>('success');
  const [showToast, setShowToast] = useState(false);

  const today = new Date();
  const thaiDate = today.toLocaleDateString('th-TH', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  // dateKey ใช้จัดกลุ่ม เช่น "2025-12-30"
  const dateKey = today.toISOString().split('T')[0];

  const handleSave = async () => {
    if (!selected) { setToast('กรุณาเลือกกิจกรรม'); setToastColor('danger'); setShowToast(true); return; }
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'users', user.uid, 'activities'), {
        type:      selected,
        duration:  duration,
        note:      note,
        dateKey:   dateKey,
        dateLabel: thaiDate,
        createdAt: new Date().toISOString(),
      });
      setToast('บันทึกกิจกรรมสำเร็จ ✅');
      setToastColor('success');
      setShowToast(true);
      setTimeout(() => history.goBack(), 800);
    } catch {
      setToast('เกิดข้อผิดพลาด กรุณาลองใหม่');
      setToastColor('danger');
      setShowToast(true);
    } finally { setLoading(false); }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="add-activity-page">
        <button className="back-btn" onClick={() => history.goBack()}>{'< กลับ'}</button>

        <div className="add-card">
          <h2>เพิ่มกิจกรรม</h2>
          <div className="date">{thaiDate}</div>

          {/* เลือกกิจกรรม */}
          <p className="section-label">เลือกกิจกรรม</p>
          <div className="activity-selector">
            {ACTIVITIES.map(a => (
              <button
                key={a.key}
                className={`activity-item ${selected === a.key ? 'selected' : ''}`}
                onClick={() => setSelected(a.key)}
              >
                <div className="activity-icon">
                  <IonIcon icon={a.icon} />
                </div>
                <span>{a.key}</span>
              </button>
            ))}
          </div>

          {/* เลือกเวลา */}
          <select className="duration" value={duration} onChange={e => setDuration(e.target.value)}>
            {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          {/* คำอธิบาย */}
          <textarea
            placeholder="คำอธิบาย..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? <IonSpinner name="crescent" /> : 'บันทึกกิจกรรม'}
          </button>
        </div>

        <IonToast isOpen={showToast} message={toast} duration={2000}
          color={toastColor} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default AddActivity;