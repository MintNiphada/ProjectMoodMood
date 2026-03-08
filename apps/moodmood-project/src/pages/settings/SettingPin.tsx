// src/pages/settings/SettingsPin.tsx
// PIN เก็บใน localStorage key: "moodmood_pin"
// เมื่อตั้ง PIN แล้ว ทุกครั้งที่เปิดแอปจะเจอหน้า PinLock แทน login
import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonAlert, IonToast, IonButton, IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { lockClosedOutline, trashOutline } from 'ionicons/icons';
import './SettingPin.css';

const DIGITS = [['1','2','3'],['4','5','6'],['7','8','9'],['0','⌫']];
const PIN_KEY = 'moodmood_pin';

const SettingsPin: React.FC = () => {
  const history = useHistory();
  const [pin, setPin]                     = useState('');          // pin กำลังกรอก
  const [step, setStep]                   = useState<'set'|'confirm'>('set'); // set = กรอกครั้งแรก, confirm = ยืนยัน
  const [firstPin, setFirstPin]           = useState('');          // pin ครั้งแรก
  const [hasPin, setHasPin]               = useState(false);       // มี pin อยู่แล้วไหม
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [toastMsg, setToastMsg]           = useState('');
  const [toastColor, setToastColor]       = useState<'success'|'danger'>('success');
  const [showToast, setShowToast]         = useState(false);

  useEffect(() => {
    setHasPin(!!localStorage.getItem(PIN_KEY));
  }, []);

  const toast = (msg: string, color: 'success'|'danger' = 'success') => {
    setToastMsg(msg); setToastColor(color); setShowToast(true);
  };

  const handleDigit = (d: string) => {
    if (d === '⌫') { setPin(p => p.slice(0, -1)); return; }
    const next = pin + d;
    if (next.length > 4) return;
    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        if (step === 'set') {
          setFirstPin(next);
          setPin('');
          setStep('confirm');
        } else {
          // confirm step
          if (next === firstPin) {
            localStorage.setItem(PIN_KEY, next);
            setHasPin(true);
            setPin(''); setFirstPin(''); setStep('set');
            toast('ตั้งค่า PIN สำเร็จ ✅');
          } else {
            setPin(''); setFirstPin(''); setStep('set');
            toast('PIN ไม่ตรงกัน กรุณาลองใหม่', 'danger');
          }
        }
      }, 150);
    }
  };

  const handleDeletePin = () => {
    localStorage.removeItem(PIN_KEY);
    setHasPin(false);
    setPin(''); setFirstPin(''); setStep('set');
    toast('ลบ PIN สำเร็จแล้ว');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="pin-content">
        <div className="pin-container">
          <button className="pin-back" onClick={() => history.goBack()}>{'< กลับ'}</button>

          <h1 className="pin-title">ตั้งค่า PIN</h1>
          <p className="pin-subtitle">
            {step === 'set'
              ? hasPin ? 'กรอก PIN ใหม่ (4 หลัก)' : 'ตั้งรหัสผ่าน 4 หลัก'
              : 'ยืนยัน PIN อีกครั้ง'}
          </p>

          {/* Lock icon */}
          <div className="pin-lock-wrap">
            <IonIcon icon={lockClosedOutline} className="pin-lock-icon" />
          </div>

          {/* Dots */}
          <div className="pin-dots">
            {[0,1,2,3].map(i => (
              <div key={i} className={`pin-dot ${pin.length > i ? 'filled' : ''}`} />
            ))}
          </div>

          {/* Numpad */}
          <div className="pin-pad">
            {DIGITS.map((row, ri) => (
              <div key={ri} className="pin-row">
                {row.map(d => (
                  <button
                    key={d}
                    className={`pin-key ${d === '⌫' ? 'pin-key-del' : ''}`}
                    onClick={() => handleDigit(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Delete PIN button — แสดงเฉพาะเมื่อมี PIN อยู่แล้ว */}
          {hasPin && (
            <IonButton
              expand="block"
              fill="outline"
              className="pin-delete-btn"
              onClick={() => setShowDeleteAlert(true)}
            >
              <IonIcon icon={trashOutline} slot="start" />
              ลบ PIN
            </IonButton>
          )}
        </div>

        {/* Confirm delete alert */}
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="ลบ PIN"
          message="คุณต้องการลบ PIN ที่ตั้งค่าไว้ใช่ไหม? คุณจะต้องล็อกอินด้วยรหัสผ่านแทน"
          buttons={[
            { text: 'ยกเลิก', role: 'cancel' },
            { text: 'ลบ PIN', cssClass: 'alert-danger', handler: handleDeletePin },
          ]}
        />

        <IonToast isOpen={showToast} message={toastMsg} duration={3000}
          color={toastColor} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SettingsPin;