import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import "./Tabs.css";
import {
  chatbubbleOutline,
  calendarOutline,
  happyOutline,
  barChartOutline,
  walkOutline
} from "ionicons/icons";

import Reflection from "./Reflection";
import Calendar from "./Calendar";
import Home from "./Home";
import Insight from "./Insight";
import Activity from "./Activity";

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/mood" component={Reflection} />
        <Route exact path="/tabs/calendar" component={Calendar} />
        <Route exact path="/tabs/duck" component={Home} />
        <Route exact path="/tabs/insight" component={Insight} />
        <Route exact path="/tabs/activity" component={Activity} />

        <Redirect exact from="/tabs" to="/tabs/duck" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="mood" href="/tabs/mood">
          <IonIcon icon={chatbubbleOutline} />
          <IonLabel>คำถามสะท้อนใจ</IonLabel>
        </IonTabButton>

        <IonTabButton tab="calendar" href="/tabs/calendar">
          <IonIcon icon={calendarOutline} />
          <IonLabel>ปฏิทิน</IonLabel>
        </IonTabButton>

        <IonTabButton tab="duck" href="/tabs/duck">
          <IonIcon icon={happyOutline} />
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
