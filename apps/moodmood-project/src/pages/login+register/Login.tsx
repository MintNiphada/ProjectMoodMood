import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: implement login logic
    console.log({ usernameOrEmail, password });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-content">
        <div className="login-container">

          {/* Back Button */}
          <button className="back-button" onClick={() => history.goBack()}>
            &lt; กลับ
          </button>

          {/* Header */}
          <div className="login-header">
            <h1 className="login-app-title">MoodMood</h1>
            <h2 className="login-page-title">เข้าสู่ระบบ</h2>
            <p className="login-subtitle">เข้าสู่ระบบเพื่อเริ่มบันทึกอารมณ์</p>
          </div>

          {/* Form */}
          <div className="login-form">
            <div className="form-group">
              <label className="form-label">ชื่อผู้ใช้หรืออีเมล</label>
              <IonItem className="form-item" lines="none">
                <IonInput
                  placeholder="ชื่อผู้ใช้หรืออีเมล"
                  value={usernameOrEmail}
                  onIonChange={(e) => setUsernameOrEmail(e.detail.value!)}
                  className="form-input"
                />
              </IonItem>
            </div>

            <div className="form-group">
              <label className="form-label">รหัสผ่าน</label>
              <IonItem className="form-item" lines="none">
                <IonInput
                  type="password"
                  placeholder="รหัสผ่าน"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  className="form-input"
                />
              </IonItem>
              <span
                className="forgot-password"
                onClick={() => {
                  // TODO: handle forgot password
                }}
              >
                ลืมรหัสผ่าน
              </span>
            </div>

            <IonButton
              expand="block"
              className="btn-submit"
              onClick={handleLogin}
            >
              เข้าสู่ระบบ
            </IonButton>

            <p className="register-redirect">
              ยังไม่มีบัญชีใช่ไหม?{' '}
              <span
                className="link-text"
                onClick={() => history.push('/register')}
              >
                สมัครสมาชิก
              </span>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;