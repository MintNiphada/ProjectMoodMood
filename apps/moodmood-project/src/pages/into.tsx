import { useHistory } from "react-router-dom";
import "./into.css";

export default function Intro() {
  const history = useHistory();

  return (
    <div className="intro-container">
      <img src="/duck.png" alt="MoodMood" className="intro-logo" />

      <h1 className="intro-title">MoodMood</h1>
      <p className="intro-subtitle">
        แอปสำหรับบันทึกอารมณ์ในแต่ละวัน
      </p>

      <button
        className="btn primary"
        onClick={() => history.push("/register")}
      >
        สมัครสมาชิก
      </button>

      <button
        className="btn secondary"
        onClick={() => history.push("/login")}
      >
        เข้าสู่ระบบ
      </button>
    </div>
  );
}
