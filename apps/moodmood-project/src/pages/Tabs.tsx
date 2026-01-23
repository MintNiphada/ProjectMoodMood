import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonImg
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import "./Tabs.css";
import {
  chatbubbleOutline,
  calendarOutline,
  barChartOutline,
  walkOutline
} from "ionicons/icons";

import duckOkay from "../assets/Okay.svg";
import Reflection from "./Reflection";
import Calendar from "./Calendar";
import Home from "./Home";
import Insight from "./Insight";
import Activity from "./Activity";
import Login from "./Login";
import Register from "./register";
import Intro from "./into";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/mood" component={Reflection} />
        <Route exact path="/tabs/calendar" component={Calendar} />
        <Route exact path="/tabs/home" component={Home} />
        <Route exact path="/tabs/insight" component={Insight} />
        <Route exact path="/tabs/activity" component={Activity} />
        <Route exact path="/tabs/login" component={Login} />
        <Route exact path="/tabs/register" component={Register} />
        <Route exact path="/tabs/intro" component={Intro} />

        <Redirect exact from="/tabs" to="/tabs/into" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" mode = "ios">
        <IonTabButton tab="mood" href="/tabs/mood">
          <IonIcon icon={chatbubbleOutline} />
          <IonLabel>คำถามสะท้อนใจ</IonLabel>
        </IonTabButton>

        <IonTabButton tab="calendar" href="/tabs/calendar">
          <IonIcon icon={calendarOutline} />
          <IonLabel>ปฏิทิน</IonLabel>
        </IonTabButton>

        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon src={duckOkay} className="duck-tab-icon" />
          <IonLabel>หน้าแรก</IonLabel>
        </IonTabButton>
        

        <IonTabButton tab="insight" href="/tabs/insight">
          <IonIcon icon={barChartOutline} />
          <IonLabel>ข้อมูลเชิงลึก</IonLabel>
        </IonTabButton>

        <IonTabButton tab="activity" href="/tabs/activity">
          <IonIcon icon={walkOutline} />
          <IonLabel>กิจกรรม</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
