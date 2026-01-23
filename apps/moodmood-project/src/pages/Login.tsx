import { useHistory } from "react-router-dom";
import "./login.css";

export default function Login() {
  const history = useHistory();

  return (
    <div className="auth-container">
      <button className="back-btn" onClick={() => history.goBack()}>
        &lt; กลับ
      </button>

      <h1 className="auth-title">MoodMood</h1>
      <h2 className="auth-subtitle">เข้าสู่ระบบ</h2>

      <input type="text" placeholder="ชื่อผู้ใช้หรืออีเมล" />
      <input type="password" placeholder="รหัสผ่าน" />

      <button className="btn primary">เข้าสู่ระบบ</button>

      <p className="auth-footer">
        ยังไม่มีบัญชีใช่ไหม?{" "}
        <span onClick={() => history.push("/register")}>สมัครสมาชิก</span>
      </p>
    </div>
  );
}
