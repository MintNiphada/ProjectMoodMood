// src/pages/settings/SettingsAccount.tsx
import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonInput, IonItem, IonButton,
  IonToast, IonSpinner, IonAlert, IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { pencilOutline, logOutOutline, chevronForwardOutline } from 'ionicons/icons';
import {
  updatePassword, reauthenticateWithCredential,
  EmailAuthProvider, signOut, updateEmail,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './SettingAccount.css';

const SettingsAccount: React.FC = () => {
  const history = useHistory();
  const user = auth.currentUser;

  const [username, setUsername]           = useState('');
  const [email, setEmail]                 = useState('');
  const [editUsername, setEditUsername]   = useState(false);
  const [editEmail, setEditEmail]         = useState(false);
  const [currentPw, setCurrentPw]         = useState('');
  const [newPw, setNewPw]                 = useState('');
  const [confirmPw, setConfirmPw]         = useState('');
  const [loading, setLoading]             = useState(false);
  const [toastMsg, setToastMsg]           = useState('');
  const [toastColor, setToastColor]       = useState<'success'|'danger'>('success');
  const [showToast, setShowToast]         = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        setUsername(snap.data().username ?? '');
        setEmail(snap.data().email ?? user.email ?? '');
      }
    });
  }, []);

  const toast = (msg: string, color: 'success'|'danger' = 'success') => {
    setToastMsg(msg); setToastColor(color); setShowToast(true);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), { username, email });
      if (email !== user.email) await updateEmail(user, email);
      setEditUsername(false); setEditEmail(false);
      toast('บันทึกข้อมูลสำเร็จ');
    } catch {
      toast('เกิดข้อผิดพลาด กรุณาล็อกอินใหม่แล้วลองอีกครั้ง', 'danger');
    } finally { setLoading(false); }
  };

  const handleChangePassword = async () => {
    if (!user || !user.email) return;
    if (!currentPw)        { toast('กรุณากรอกรหัสผ่านปัจจุบัน', 'danger'); return; }
    if (newPw.length < 6)  { toast('รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร', 'danger'); return; }
    if (newPw !== confirmPw) { toast('รหัสผ่านไม่ตรงกัน', 'danger'); return; }
    setLoading(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPw);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPw);
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      toast('เปลี่ยนรหัสผ่านสำเร็จ');
    } catch (e: any) {
      const bad = ['auth/wrong-password','auth/invalid-credential'];
      toast(bad.includes(e.code) ? 'รหัสผ่านปัจจุบันไม่ถูกต้อง' : 'เกิดข้อผิดพลาด', 'danger');
    } finally { setLoading(false); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    history.replace('/into');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ac-content">
        <div className="ac-container">
          <button className="ac-back" onClick={() => history.goBack()}>{'< กลับ'}</button>
          <h1 className="ac-title">ตั้งค่าบัญชี</h1>

          {/* Profile card */}
          <div className="ac-card">
            <img src="/assets/okay.svg" className="intro-duck-img" />
            <div className="ac-info">
              {editUsername ? (
                <IonItem className="ac-input-item" lines="none">
                  <IonInput value={username} onIonChange={e => setUsername(e.detail.value!)} />
                </IonItem>
              ) : (
                <div className="ac-name">
                  {username}
                  <IonIcon icon={pencilOutline} className="ac-edit" onClick={() => setEditUsername(true)} />
                </div>
              )}
              {editEmail ? (
                <IonItem className="ac-input-item" lines="none">
                  <IonInput type="email" value={email} onIonChange={e => setEmail(e.detail.value!)} />
                </IonItem>
              ) : (
                <div className="ac-email">
                  {email}
                  <IonIcon icon={pencilOutline} className="ac-edit" onClick={() => setEditEmail(true)} />
                </div>
              )}
              {(editUsername || editEmail) && (
                <IonButton size="small" className="ac-save-profile" onClick={handleSaveProfile} disabled={loading}>
                  {loading ? <IonSpinner name="crescent" /> : 'บันทึก'}
                </IonButton>
              )}
            </div>
          </div>

          {/* Change password */}
          <div className="ac-section">
            <p className="ac-section-title">เปลี่ยนรหัสผ่าน</p>

            <div className="ac-field">
              <label className="ac-label">รหัสผ่านปัจจุบัน</label>
              <IonItem className="ac-item" lines="none">
                <IonInput type="password" placeholder="รหัสผ่านปัจจุบัน"
                  value={currentPw} onIonChange={e => setCurrentPw(e.detail.value!)} />
              </IonItem>
            </div>
            <div className="ac-field">
              <label className="ac-label">รหัสผ่านใหม่</label>
              <IonItem className="ac-item" lines="none">
                <IonInput type="password" placeholder="รหัสผ่าน"
                  value={newPw} onIonChange={e => setNewPw(e.detail.value!)} />
              </IonItem>
            </div>
            <div className="ac-field">
              <label className="ac-label">ยืนยันรหัสผ่าน</label>
              <IonItem className="ac-item" lines="none">
                <IonInput type="password" placeholder="ยืนยันรหัสผ่าน"
                  value={confirmPw} onIonChange={e => setConfirmPw(e.detail.value!)} />
              </IonItem>
            </div>

            <IonButton expand="block" className="ac-btn" onClick={handleChangePassword} disabled={loading}>
              {loading ? <IonSpinner name="crescent" /> : 'เปลี่ยนรหัสผ่าน'}
            </IonButton>
          </div>

          {/* Logout */}
          <button className="ac-logout-row" onClick={() => setShowLogoutAlert(true)}>
            <span className="ac-logout-left">
              <IonIcon icon={logOutOutline} className="ac-logout-icon" />
              <span className="ac-logout-label">ออกจากระบบ</span>
            </span>
            <IonIcon icon={chevronForwardOutline} className="s-arrow" />
          </button>
        </div>

        <IonAlert isOpen={showLogoutAlert} onDidDismiss={() => setShowLogoutAlert(false)}
          header="ออกจากระบบ" message="คุณต้องการออกจากระบบใช่ไหม?"
          buttons={[{text:'ยกเลิก',role:'cancel'},{text:'ออกจากระบบ',handler:handleLogout}]} />

        <IonToast isOpen={showToast} message={toastMsg} duration={3000}
          color={toastColor} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default SettingsAccount;