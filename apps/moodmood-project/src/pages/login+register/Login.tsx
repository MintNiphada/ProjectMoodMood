
import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonToast, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setErrorMsg('กรุณากรอกอีเมลและรหัสผ่าน'); setShowToast(true); return; }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.replace('/tabs/home');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential': setErrorMsg('อีเมลหรือรหัสผ่านไม่ถูกต้อง'); break;
        case 'auth/invalid-email': setErrorMsg('รูปแบบอีเมลไม่ถูกต้อง'); break;
        case 'auth/too-many-requests': setErrorMsg('ลองใหม่อีกครั้งในภายหลัง'); break;
        default: setErrorMsg('เกิดข้อผิดพลาด กรุณาลองใหม่');
      }
      setShowToast(true);
    } finally { setLoading(false); }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="login-container">
          <button className="back-button" onClick={() => history.goBack()}>&lt; กลับ</button>
          <div className="login-header">
            <h1 className="login-app-title">MoodMood</h1>
            <h2 className="login-page-title">เข้าสู่ระบบ</h2>
            <p className="login-subtitle">เข้าสู่ระบบเพื่อเริ่มบันทึกอารมณ์</p>
          </div>
          <div className="login-form">
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
            <IonButton expand="block" className="btn-submit" onClick={handleLogin} disabled={loading}>
              {loading ? <IonSpinner name="crescent" /> : 'เข้าสู่ระบบ'}
            </IonButton>
            <p className="register-redirect">
              ยังไม่มีบัญชีใช่ไหม?{' '}
              <span className="link-text" onClick={() => history.push('/register')}>สมัครสมาชิก</span>
            </p>
          </div>
        </div>
        <IonToast isOpen={showToast} message={errorMsg} duration={3000} color="danger" onDidDismiss={() => setShowToast(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Login;