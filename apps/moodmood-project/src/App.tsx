// src/App.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { AuthProvider, useAuth } from './context/AuthContext';

import Tabs from './pages/Tabs';
import AddMood from './pages/AddMood';
import AddActivity from './pages/AddActivity';
import Reflection from './pages/Reflection';
import ReflectionHistory from './pages/ReflectionHistory';
import ReflectionQuestions from './pages/ReflectionQuestions';
import ReflectionAnswer from './pages/ReflectionAnswer';

import Intro    from './pages/login+register/into';
import Login    from './pages/login+register/Login';
import Register from './pages/login+register/register';

import Settings        from './pages/settings/settings';
import SettingsAccount from './pages/settings/SettingAccount';
import SettingsPin     from './pages/settings/SettingPin';
import SettingsAbout   from './pages/settings/SettingAbout';
import PinLock         from './pages/settings/PinLock';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

const PIN_KEY = 'moodmood_pin';

const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();
  const hasPin = !!localStorage.getItem(PIN_KEY);

  // ถ้า login แล้วและมี PIN → ไปหน้า PinLock ก่อน
  const defaultRoute = currentUser
    ? (hasPin ? '/pin-lock' : '/tabs/home')
    : '/into';

  return (
    <IonReactRouter>
      {/* Auth */}
      <Route path="/into"     component={Intro}    exact />
      <Route path="/login"    component={Login}    exact />
      <Route path="/register" component={Register} exact />

      {/* Pin Lock */}
      <Route path="/pin-lock" component={PinLock} exact />

      {/* Settings */}
      <Route path="/settings"          component={Settings}        exact />
      <Route path="/settings/account"  component={SettingsAccount} exact />
      <Route path="/settings/pin"      component={SettingsPin}     exact />
      <Route path="/settings/about"    component={SettingsAbout}   exact />

      {/* App pages */}
      <Route path="/add-mood"      component={AddMood}     exact />
      <Route path="/add-activity"  component={AddActivity} exact />
      <Route path="/tabs"          component={Tabs} />
      <Route exact path="/tabs/reflection"              component={Reflection} />
      <Route exact path="/tabs/reflection/history"      component={ReflectionHistory} />
      <Route exact path="/tabs/reflection/:category"    component={ReflectionQuestions} />
      <Route exact path="/tabs/reflection/:category/:index" component={ReflectionAnswer} />

      <Redirect exact from="/" to={defaultRoute} />
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </IonApp>
);

export default App;