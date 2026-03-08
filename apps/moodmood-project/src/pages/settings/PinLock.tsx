// src/pages/settings/PinLock.tsx
// หน้านี้แสดงเมื่อ user มี PIN ตั้งไว้ — ให้กรอก PIN ก่อนเข้าแอป
import React, { useState } from 'react';
import { IonPage, IonContent, IonToast, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { lockClosedOutline } from 'ionicons/icons';
import './SettingPin.css';

const PIN_KEY = 'moodmood_pin';
const DIGITS = [['1','2','3'],['4','5','6'],['7','8','9'],['0','⌫']];

const PinLock: React.FC = () => {
  const history = useHistory();
  const [pin, setPin] = useState('');
  const [shake, setShake] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleDigit = (d: string) => {
    if (d === '⌫') { setPin(p => p.slice(0, -1)); return; }
    const next = pin + d;
    if (next.length > 4) return;
    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        const saved = localStorage.getItem(PIN_KEY);
        if (next === saved) {
          history.replace('/tabs/home');
        } else {
          setShake(true);
          setPin('');
          setToastMsg('PIN ไม่ถูกต้อง กรุณาลองใหม่');
          setShowToast(true);
          setTimeout(() => setShake(false), 500);
        }
      }, 150);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="pin-content">
        <div className="pin-container">
          <div className="pin-lock-wrap">
            <IonIcon icon={lockClosedOutline} className="pin-lock-icon" />
          </div>
          <h1 className="pin-title">กรอก PIN</h1>
          <p className="pin-subtitle">กรอกรหัส PIN 4 หลักเพื่อเข้าใช้งาน</p>

          <div className={`pin-dots ${shake ? 'pin-shake' : ''}`}>
            {[0,1,2,3].map(i => (
              <div key={i} className={`pin-dot ${pin.length > i ? 'filled' : ''}`} />
            ))}
          </div>

          <div className="pin-pad">
            {DIGITS.map((row, ri) => (
              <div key={ri} className="pin-row">
                {row.map(d => (
                  <button key={d} className={`pin-key ${d==='⌫'?'pin-key-del':''}`} onClick={() => handleDigit(d)}>
                    {d}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
        <IonToast isOpen={showToast} message={toastMsg} duration={2000}
          color="danger" onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default PinLock;