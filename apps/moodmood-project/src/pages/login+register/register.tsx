
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonToast, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import './register.css';

const Register: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState<'danger' | 'success'>('danger');
  const [showToast, setShowToast] = useState(false);

  const showError = (msg: string) => { setToastMsg(msg); setToastColor('danger'); setShowToast(true); };

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) { showError('กรุณากรอกข้อมูลให้ครบ'); return; }
    if (password !== confirmPassword) { showError('รหัสผ่านไม่ตรงกัน'); return; }
    if (password.length < 6) { showError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); return; }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        email,
        createdAt: new Date().toISOString(),
      });
      setToastMsg('สมัครสมาชิกสำเร็จ!');
      setToastColor('success');
      setShowToast(true);
      setTimeout(() => history.replace('/tabs/home'), 1000);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use': showError('อีเมลนี้ถูกใช้งานแล้ว'); break;
        case 'auth/invalid-email': showError('รูปแบบอีเมลไม่ถูกต้อง'); break;
        case 'auth/weak-password': showError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'); break;
        default: showError('เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
    } finally { setLoading(false); }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="register-content">
        <div className="register-container">
          <button className="back-button" onClick={() => history.goBack()}>&lt; กลับ</button>
          <div className="register-header">
            <h1 className="register-app-title">MoodMood</h1>
            <h2 className="register-page-title">สมัครสมาชิก</h2>
            <p className="register-subtitle">สร้างบัญชีเพื่อเริ่มบันทึกอารมณ์</p>
          </div>
          <div className="register-form">
            <div className="form-group">
              <label className="form-label">ชื่อผู้ใช้</label>
              <IonItem className="form-item" lines="none">
                <IonInput placeholder="ชื่อผู้ใช้" value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)} className="form-input" />
              </IonItem>
            </div>
            <div className="form-group">
              <label className="form-label">อีเมล</label>
              <IonItem className="form-item" lines="none">
                <IonInput type="email" placeholder="อีเมล" value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)} className="form-input" />
              </IonItem>
            </div>
            <div className="form-group">
              <label className="form-label">รหัสผ่าน</label>
              <IonItem className="form-item" lines="none">
                <IonInput type="password" placeholder="รหัสผ่าน" value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)} className="form-input" />
              </IonItem>
            </div>
            <div className="form-group">
              <label className="form-label">ยืนยันรหัสผ่าน</label>
              <IonItem className="form-item" lines="none">
                <IonInput type="password" placeholder="ยืนยันรหัสผ่าน" value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)} className="form-input" />
              </IonItem>
            </div>
            <IonButton expand="block" className="btn-submit" onClick={handleRegister} disabled={loading}>
              {loading ? <IonSpinner name="crescent" /> : 'สมัครสมาชิก'}
            </IonButton>
            <p className="login-redirect">
              มีบัญชีอยู่แล้ว?{' '}
              <span className="link-text" onClick={() => history.push('/login')}>เข้าสู่ระบบ</span>
            </p>
          </div>
        </div>
        <IonToast isOpen={showToast} message={toastMsg} duration={3000} color={toastColor} onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Register;