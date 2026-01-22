import { Redirect, Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Tabs from "./pages/Tabs";
import AddMood from "./pages/AddMood";
import Login from "./pages/Login";

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
      <Route path="/login" component={Login} exact />
      <Route path="/add-mood" component={AddMood} exact />

      {/* หน้าที่มี Tabs */}
      <Route path="/tabs" component={Tabs} />

      {/* default */}
      <Redirect exact from="/" to="/tabs/duck" />
    </IonReactRouter>
  </IonApp>
);

export default App;
