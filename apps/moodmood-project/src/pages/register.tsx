import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./register.css";

export default function Register() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (password !== confirmPassword) {
      alert("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!res.ok) {
        throw new Error("สมัครสมาชิกล้มเหลว");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      alert("สมัครสมาชิกสำเร็จ");
      history.push("/tabs/home");
    } catch (error) {
      alert("เกิดข้อผิดพลาด: " + (error as Error).message);
    }
  };

  return (
    <div className="auth-container">
      <button className="back-btn" onClick={() => history.goBack()}>
        &lt; กลับ
      </button>

      <h1 className="auth-title">MoodMood</h1>
      <h2 className="auth-subtitle">สมัครสมาชิก</h2>

      <input type="text" placeholder="ชื่อผู้ใช้" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} />
      <input type="password" placeholder="ยืนยันรหัสผ่าน" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

      <button className="btn primary" onClick={handleRegister}>สมัครสมาชิก</button>

      <p className="auth-footer">
        มีบัญชีอยู่แล้ว?{" "}
        <span onClick={() => history.push("/login")}>เข้าสู่ระบบ</span>
      </p>
    </div>
  );
}
