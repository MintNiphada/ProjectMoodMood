import { Redirect, Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Tabs from "./pages/Tabs";
import AddMood from "./pages/AddMood";
import Reflection from "./pages/Reflection";
import ReflectionHistory from "./pages/ReflectionHistory";
import ReflectionQuestions from "./pages/ReflectionQuestions";
import ReflectionAnswer from './pages/ReflectionAnswer'

import into from "./pages/login+register/into";
import Login from "./pages/login+register/Login";
import Register from "./pages/login+register/register";


/* Ionic CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      {/* หน้าไม่มี Tabs */}
      <Route path="/add-mood" component={AddMood} exact />

      <Route path="/into" component={into} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />


      {/* หน้าที่มี Tabs */}
      <Route path="/tabs" component={Tabs} />
      
      {/* Reflection pages */}
      <Route exact path="/tabs/reflection" component={Reflection} />
      <Route exact path="/tabs/reflection/history" component={ReflectionHistory} />
      <Route exact path="/tabs/reflection/:category" component={ReflectionQuestions} />

      {/* การตอบกับประวัติการตอบ */}
      <Route exact path="/tabs/reflection" component={Reflection} />
      <Route exact path="/tabs/reflection/history" component={ReflectionHistory} />
      <Route exact path="/tabs/reflection/:category" component={ReflectionQuestions} />
      <Route exact path="/tabs/reflection/:category/:index" component={ReflectionAnswer} />


      {/* default */}
      <Redirect exact from="/" to="/into" />
    </IonReactRouter>
  </IonApp>
);

export default App;
