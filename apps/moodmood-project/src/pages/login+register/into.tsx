import React from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './into.css';

const Intro: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen className="intro-content">
        <div className="intro-container">
          <div className="intro-logo-section">
            {/* TODO: Replace with actual duck image */}
            <div className="intro-duck-placeholder">
              <span className="duck-emoji">🐥</span>
            </div>

            <h1 className="intro-title">MoodMood</h1>
            <p className="intro-subtitle">แอปสำหรับบันทึกอารมณ์ในแต่ละวัน</p>
          </div>

          <div className="intro-buttons">
            <IonButton
              expand="block"
              className="btn-register"
              onClick={() => history.push('/register')}
            >
              สมัครสมาชิก
            </IonButton>

            <IonButton
              expand="block"
              fill="outline"
              className="btn-login"
              onClick={() => history.push('/login')}
            >
              เข้าสู่ระบบ
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Intro;