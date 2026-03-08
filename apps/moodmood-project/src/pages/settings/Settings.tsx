// src/pages/settings/Settings.tsx
import React from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  personOutline, keypadOutline,
  informationCircleOutline, chevronForwardOutline
} from 'ionicons/icons';
import './Settings.css';

const Settings: React.FC = () => {
  const history = useHistory();

  const items = [
    { icon: personOutline,            label: 'บัญชี',      path: '/settings/account' },
    { icon: keypadOutline,            label: 'ตั้งค่า PIN', path: '/settings/pin' },
    { icon: informationCircleOutline, label: 'เกี่ยวกับ',  path: '/settings/about' },
  ];

  return (
    <IonPage>
      <IonContent fullscreen className="s-content">
        <div className="s-container">
          <button className="s-back" onClick={() => history.goBack()}>{'< กลับ'}</button>
          <h1 className="s-title">ตั้งค่า</h1>
          <div className="s-menu">
            {items.map(item => (
              <button key={item.path} className="s-row" onClick={() => history.push(item.path)}>
                <span className="s-row-left">
                  <IonIcon icon={item.icon} className="s-icon" />
                  <span className="s-label">{item.label}</span>
                </span>
                <IonIcon icon={chevronForwardOutline} className="s-arrow" />
              </button>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;