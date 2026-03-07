import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './register.css';

const Register: React.FC = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // TODO: implement register logic
    console.log({ username, email, password, confirmPassword });
  };

  return (
    <IonPage>
      <IonContent fullscreen className="register-content">
        <div className="register-container">

          {/* Back Button */}
          <button className="back-button" onClick={() => history.goBack()}>
            &lt; กลับ
          </button>

          {/* Header */}
          <div className="register-header">
            <h1 className="register-app-title">MoodMood</h1>
            <h2 className="register-page-title">สมัครสมาชิก</h2>
            <p className="register-subtitle">สร้างบัญชีเพื่อเริ่มบันทึกอารมณ์</p>
          </div>

          {/* Form */}
          <div className="register-form">
            <div className="form-group">
              <label className="form-label">ชื่อผู้ใช้</label>
              <IonItem className="form-item" lines="none">
                <IonInput
                  placeholder="ชื่อผู้ใช้"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                  className="form-input"
                />
              </IonItem>
            </div>

            <div className="form-group">
              <label className="form-label">อีเมล</label>
              <IonItem className="form-item" lines="none">
                <IonInput
                  type="email"
                  placeholder="อีเมล"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
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
            </div>

            <div className="form-group">
              <label className="form-label">ยืนยันรหัสผ่าน</label>
              <IonItem className="form-item" lines="none">
                <IonInput
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                  className="form-input"
                />
              </IonItem>
            </div>

            <IonButton
              expand="block"
              className="btn-submit"
              onClick={handleRegister}
            >
              สมัครสมาชิก
            </IonButton>

            <p className="login-redirect">
              มีบัญชีอยู่แล้ว?{' '}
              <span
                className="link-text"
                onClick={() => history.push('/login')}
              >
                เข้าสู่ระบบ
              </span>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;