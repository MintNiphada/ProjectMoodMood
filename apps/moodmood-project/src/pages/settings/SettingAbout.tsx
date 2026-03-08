// src/pages/settings/SettingsAbout.tsx
import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './SettingAbout.css';

const SettingsAbout: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen className="about-content">
        <div className="about-container">
          <button className="about-back" onClick={() => history.goBack()}>{'< กลับ'}</button>
          <h1 className="about-title">เกี่ยวกับ</h1>

          {/* TODO: เพิ่มข้อมูลที่ต้องการแสดงด้านล่างนี้ */}
          <div className="about-card">
            <div className="about-app-name"> MoodMood</div>
            <div>จัดทำโดยทีมงาน MoodMood สุดน่ารัก</div>
                <div>นาย นิติธร คชรัตน์</div>
                <div>นาย พีรัชชัย สืบสิงห์</div>
                <div>นางสาว ศวรรยา ศิริมูล</div>
                <div>นางสาว นิภาดา ญายะนันท์</div>
            <div className="about-version">Version 1.0.0</div>
          </div>

          <div className="about-card">
            <p className="about-text">
              {/* TODO: ใส่คำอธิบายแอป */}
              แอปสำหรับบันทึกอารมณ์ในแต่ละวัน(นะจ๊ะ)
            </p>
          </div>

          {/* TODO: เพิ่ม section อื่นๆ ตามต้องการ เช่น ทีมงาน, ติดต่อ, นโยบายความเป็นส่วนตัว */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsAbout;