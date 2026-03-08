// src/pages/Activity.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonIcon, IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { bedOutline, walkOutline, bookOutline, leafOutline } from 'ionicons/icons';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import './Activity.css';

// ---- types ----
interface ActivityDoc {
  id: string;
  type: string;
  duration: string;
  note: string;
  dateKey: string;
  dateLabel: string;
  createdAt: string;
}

interface GroupedEntry {
  id: string;       // doc id สำหรับลบ
  duration: string;
  note: string;
  createdAt: string;
}

interface ActivityGroup {
  type: string;
  totalMinutes: number;
  entries: GroupedEntry[];
}

interface DayGroup {
  dateKey: string;
  dateLabel: string;
  activities: ActivityGroup[];
}

// ---- helpers ----
const ICONS: Record<string, string> = {
  'นอน':          bedOutline,
  'ออกกำลังกาย': walkOutline,
  'อ่านหนังสือ': bookOutline,
  'นั่งสมาธิ':   leafOutline,
};

const toMinutes = (dur: string): number => {
  if (dur.includes('30 นาที')) return 30;
  const h = parseFloat(dur);
  return Math.round(h * 60);
};

const formatMinutes = (min: number): string => {
  if (min < 60) return `${min} นาที`;
  const h = min / 60;
  return Number.isInteger(h) ? `${h} ชั่วโมง` : `${h} ชั่วโมง`;
};

const groupActivities = (docs: ActivityDoc[]): DayGroup[] => {
  const dayMap: Record<string, { dateLabel: string; map: Record<string, GroupedEntry[]> }> = {};
  docs.forEach(doc => {
    if (!dayMap[doc.dateKey]) dayMap[doc.dateKey] = { dateLabel: doc.dateLabel, map: {} };
    if (!dayMap[doc.dateKey].map[doc.type]) dayMap[doc.dateKey].map[doc.type] = [];
    dayMap[doc.dateKey].map[doc.type].push({
      id:       doc.id,        // ✅ เพิ่ม id
      duration: doc.duration,
      note:     doc.note,
      createdAt: doc.createdAt,
    });
  });

  return Object.entries(dayMap)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([dateKey, val]) => ({
      dateKey,
      dateLabel: val.dateLabel,
      activities: Object.entries(val.map).map(([type, entries]) => ({
        type,
        totalMinutes: entries.reduce((sum, e) => sum + toMinutes(e.duration), 0),
        entries,
      })),
    }));
};

// ---- Detail Modal ----
interface DetailProps {
  group: ActivityGroup;
  onClose: () => void;
  onDeleted: () => void; // callback เพื่อ refresh หลังลบ
}

const DetailModal: React.FC<DetailProps> = ({ group, onClose, onDeleted }) => {
  const user = auth.currentUser;
  const [confirmEntry, setConfirmEntry] = useState<GroupedEntry | null>(null);

  const handleDelete = async () => {
    if (!confirmEntry || !user) return;
    await deleteDoc(doc(db, 'users', user.uid, 'activities', confirmEntry.id));
    setConfirmEntry(null);
    onDeleted(); // refresh รายการ
    // ถ้าลบหมดทุก entry ให้ปิด modal
    if (group.entries.length <= 1) onClose();
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="detail-header">
          <div className="detail-icon-wrap">
            <IonIcon icon={ICONS[group.type] || bookOutline} />
          </div>
          <div>
            <div className="detail-type">{group.type}</div>
            <div className="detail-total">รวม {formatMinutes(group.totalMinutes)}</div>
          </div>
          <button className="detail-close" onClick={onClose}>✕</button>
        </div>

        {/* Entries */}
        <div className="detail-entries">
          {group.entries.map((e) => (
            <div key={e.id} className="detail-entry">
              {/* badge เวลา มุมขวาบน */}
              <div className="entry-top-row">
                <div className="entry-time-badge">{e.duration}</div>
                {/* ปุ่มกากบาทลบ */}
                <button
                  className="entry-delete-btn"
                  onClick={(ev) => { ev.stopPropagation(); setConfirmEntry(e); }}
                >
                  ✕
                </button>
              </div>
              <p className="entry-note">{e.note || '(ไม่มีคำอธิบาย)'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm delete alert */}
      <IonAlert
        isOpen={!!confirmEntry}
        onDidDismiss={() => setConfirmEntry(null)}
        header="ลบกิจกรรม"
        message={`ต้องการลบกิจกรรม "${group.type}" (${confirmEntry?.duration}) ใช่ไหม?`}
        buttons={[
          { text: 'ยกเลิก', role: 'cancel' },
          { text: 'ลบ', cssClass: 'alert-danger', handler: handleDelete },
        ]}
      />
    </div>
  );
};

// ---- Main ----
const Activity: React.FC = () => {
  const history = useHistory();
  const [days, setDays]         = useState<DayGroup[]>([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<ActivityGroup | null>(null);

  const fetchActivities = async () => {
    const user = auth.currentUser;
    if (!user) return;
    setLoading(true);
    const q = query(
      collection(db, 'users', user.uid, 'activities'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ActivityDoc));
    setDays(groupActivities(docs));
    setLoading(false);
  };

  useEffect(() => { fetchActivities(); }, []);

  useEffect(() => {
    const unsub = history.listen((_, action) => {
      if (action === 'POP') fetchActivities();
    });
    return unsub;
  }, [history]);

  // หลังลบ ให้ fetch ใหม่และ update selected ด้วย
  const handleDeleted = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'activities'),
      orderBy('createdAt', 'desc')
    );
    const snap = await getDocs(q);
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ActivityDoc));
    const newDays = groupActivities(docs);
    setDays(newDays);

    // update selected ให้แสดงข้อมูลล่าสุด
    if (selected) {
      const updatedGroup = newDays
        .flatMap(d => d.activities)
        .find(a => a.type === selected.type);
      setSelected(updatedGroup ?? null);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="activity-page">
        <div className="activity-header">
          <h1>กิจกรรม</h1>
          <button className="add-activity-btn" onClick={() => history.push('/add-activity')}>
            + เพิ่มกิจกรรม
          </button>
        </div>

        {loading ? (
          <div className="act-loading">กำลังโหลด...</div>
        ) : days.length === 0 ? (
          <div className="act-empty">ยังไม่มีกิจกรรม กด + เพื่อเพิ่มเลย 🐥</div>
        ) : (
          days.map(day => (
            <div key={day.dateKey} className="activity-section">
              <div className="activity-date">{day.dateLabel}</div>
              {day.activities.map(act => (
                <div key={act.type} className="activity-card" onClick={() => setSelected(act)}>
                  <div className="activity-icon">
                    <IonIcon icon={ICONS[act.type] || bookOutline} />
                  </div>
                  <div className="activity-label">{act.type}</div>
                  <div className="activity-time">{formatMinutes(act.totalMinutes)}</div>
                </div>
              ))}
            </div>
          ))
        )}

        {selected && (
          <DetailModal
            group={selected}
            onClose={() => setSelected(null)}
            onDeleted={handleDeleted}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Activity;