import MoodDonutChart from "../charts/MoodDonutChart";
import happyDuck from "../assets/veryhappy.svg";
import okayDuck from "../assets/Okay.svg";
import sadDuck from "../assets/sad.svg";
import angryDuck from "../assets/angy.svg";
import boredDuck from "../assets/bored.svg";
import tiredDuck from "../assets/Tired.svg";


const MoodSummary: React.FC = () => {
    return (
<div className="insight-card">

  <div className="mood-highlight">

    <img
      src={happyDuck}
      className="highlight-duck"
    />

    <div>
      <div className="mood-title">
        อารมณ์เด่นของเดือนนี้
      </div>

      <div className="mood-main">
        มีความสุข
      </div>

      <p className="mood-desc">
        เดือนนี้มีความสุขไปแล้วทั้งหมด 6 วัน
      </p>
    </div>

  </div>

  {/* chart */}
  <div className="mood-chart">
    <MoodDonutChart data={[]} />
  </div>

  {/* list */}
  <div className="mood-list">

    <div className="mood-row">
      <span className="tag happy">มีความสุข</span>
      <span>6 ครั้ง</span>
    </div>

    <div className="mood-row">
      <span className="tag okay">โอเค</span>
      <span>4 ครั้ง</span>
    </div>

    <div className="mood-row">
      <span className="tag bored">เบื่อ</span>
      <span>1 ครั้ง</span>
    </div>

    <div className="mood-row">
      <span className="tag sad">เศร้า</span>
      <span>1 ครั้ง</span>
    </div>

    <div className="mood-row">
      <span className="tag angry">โกรธ</span>
      <span>1 ครั้ง</span>
    </div>

    <div className="mood-row">
      <span className="tag tired">เหนื่อย</span>
      <span>1 ครั้ง</span>
    </div>

  </div>

</div>
    );
};

export default MoodSummary;