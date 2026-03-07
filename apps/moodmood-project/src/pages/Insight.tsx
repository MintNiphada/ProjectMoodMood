import { IonPage, IonContent } from "@ionic/react";

import InsightHeader from "../components/insight/InsightHeader";
import StreakCards from "../components/insight/StreakCards";
import MoodSummary from "../components/insight/MoodSummary";
import TagSummary from "../components/insight/TagSummary";

import "./Insight.css";

const Insight: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="insight-page">

        <h1 className="page-title">ข้อมูลเชิงลึก</h1>

        <InsightHeader />

        <StreakCards />

        <MoodSummary />

        <TagSummary />

      </IonContent>
    </IonPage>
  );
};

export default Insight;