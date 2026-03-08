// src/pages/Insight.tsx
import { IonPage, IonContent } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { calendarOutline, flameOutline, chevronBackOutline, chevronForwardOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import "dayjs/locale/th";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { MoodType } from "../types/Mood";
import { MOOD_ICON, MOOD_LABEL, MOOD_COLOR } from "../constants/moods";
import MoodDonutChart from "../components/charts/MoodDonutChart";
import "./Insight.css";

dayjs.locale("th");

// ---- types ----
interface MoodDoc {
  date: string;
  moods: MoodType[];
  tags: string[];
}

type RangeType = "week" | "month" | "year";

// ---- helpers ----
const getDateRange = (range: RangeType, cursor: dayjs.Dayjs) => {
  if (range === "week") {
    const start = cursor.startOf("week");
    const end   = cursor.endOf("week");
    return { start, end };
  }
  if (range === "month") {
    return { start: cursor.startOf("month"), end: cursor.endOf("month") };
  }
  // year
  return { start: cursor.startOf("year"), end: cursor.endOf("year") };
};

const calcMaxStreak = (dates: string[]): number => {
  if (!dates.length) return 0;
  const sorted = [...new Set(dates)].sort();
  let max = 1, cur = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = dayjs(sorted[i]).diff(dayjs(sorted[i - 1]), "day");
    if (diff === 1) { cur++; max = Math.max(max, cur); }
    else cur = 1;
  }
  return max;
};

// ---- main ----
const Insight: React.FC = () => {
  const [range, setRange]     = useState<RangeType>("month");
  const [cursor, setCursor]   = useState(dayjs()); // เดือน/สัปดาห์/ปีที่เลือก
  const [docs, setDocs]       = useState<MoodDoc[]>([]);
  const [registerDate, setRegisterDate] = useState<dayjs.Dayjs | null>(null);
  const [loading, setLoading] = useState(true);

  // โหลด moods ทั้งหมดครั้งเดียว
  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setLoading(true);

      // ดึง register date จาก users doc
      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (userSnap.exists()) {
        const d = userSnap.data().createdAt;
        if (d) setRegisterDate(dayjs(d.toDate ? d.toDate() : d));
      }

      const snap = await getDocs(collection(db, "users", user.uid, "moods"));
      const result: MoodDoc[] = snap.docs.map(d => ({
        date:  d.data().date,
        moods: d.data().moods || [],
        tags:  d.data().tags  || [],
      }));
      setDocs(result);
      setLoading(false);
    };
    fetch();
  }, []);

  // filter ตาม range+cursor
  const { start, end } = getDateRange(range, cursor);
  const filtered = docs.filter(d =>
    dayjs(d.date).isSameOrAfter(start, "day") &&
    dayjs(d.date).isSameOrBefore(end, "day")
  );

  // stats
  const totalDays   = new Set(filtered.map(d => d.date)).size;
  const allMoods    = filtered.flatMap(d => d.moods);
  const moodCount   = allMoods.reduce<Record<string, number>>((acc, m) => {
    acc[m] = (acc[m] || 0) + 1; return acc;
  }, {});
  const moodSorted  = Object.entries(moodCount).sort((a, b) => b[1] - a[1]);
  const topMood     = moodSorted[0]?.[0] as MoodType | undefined;
  const maxStreak   = calcMaxStreak(docs.map(d => d.date)); // ใช้ทุก doc ไม่ใช่แค่ filtered

  // tags
  const allTags     = filtered.flatMap(d => d.tags);
  const tagCount    = allTags.reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] || 0) + 1; return acc;
  }, {});
  const tagSorted   = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

  // chart data
  const chartData = moodSorted.map(([mood, count]) => ({
    mood: mood as MoodType,
    count,
    color: MOOD_COLOR[mood as MoodType],
  }));

  // label สำหรับ cursor
  const cursorLabel = () => {
    if (range === "week") {
      return `${start.format("D MMM")} - ${end.format("D MMM YYYY")}`;
    }
    if (range === "month") return cursor.format("MMMM YYYY");
    return cursor.format("YYYY");
  };

  // เลื่อน prev/next พร้อม limit ที่ register date
  const canGoPrev = () => {
    if (!registerDate) return false;
    return start.isAfter(registerDate, range === "week" ? "week" : range === "month" ? "month" : "year");
  };
  const canGoNext = () => cursor.isBefore(dayjs(), range === "week" ? "week" : range === "month" ? "month" : "year");

  const goPrev = () => { if (canGoPrev()) setCursor(c => c.subtract(1, range === "week" ? "week" : range === "month" ? "month" : "year")); };
  const goNext = () => { if (canGoNext()) setCursor(c => c.add(1, range === "week" ? "week" : range === "month" ? "month" : "year")); };

  // reset cursor เมื่อเปลี่ยน range
  const handleRange = (r: RangeType) => { setRange(r); setCursor(dayjs()); };

  const rangeTitle = range === "week" ? "สัปดาห์" : range === "month" ? "เดือน" : "ปี";

  return (
    <IonPage>
      <IonContent fullscreen className="insight-page">
        <h1 className="page-title">ข้อมูลเชิงลึก</h1>

        {/* Range selector */}
        <div className="insight-range">
          {(["week","month","year"] as RangeType[]).map(r => (
            <button key={r} className={range === r ? "active" : ""} onClick={() => handleRange(r)}>
              {r === "week" ? "สัปดาห์นี้" : r === "month" ? "เดือนนี้" : "ปีนี้"}
            </button>
          ))}
        </div>

        {/* Cursor nav */}
        <div className="insight-nav">
          <button className="nav-btn" onClick={goPrev} disabled={!canGoPrev()}>
            <IonIcon icon={chevronBackOutline} />
          </button>
          <span className="insight-month">{cursorLabel()}</span>
          <button className="nav-btn" onClick={goNext} disabled={!canGoNext()}>
            <IonIcon icon={chevronForwardOutline} />
          </button>
        </div>

        {loading ? (
          <div className="insight-loading">กำลังโหลด...</div>
        ) : (
          <>
            {/* Streak cards */}
            <div className="streak-cards">
              <div className="streak-card">
                <IonIcon icon={calendarOutline} />
                <div>
                  <div>บันทึกไปทั้งหมด</div>
                  <span className="highlight">{totalDays} วัน</span>
                </div>
              </div>
              <div className="streak-card">
                <IonIcon icon={flameOutline} />
                <div>
                  <div>บันทึกต่อเนื่องสูงสุด</div>
                  <span className="highlight">{maxStreak} วัน</span>
                </div>
              </div>
            </div>

            {/* Mood Summary */}
            <div className="insight-card">
              {topMood ? (
                <>
                  <div className="mood-highlight">
                    <img src={MOOD_ICON[topMood]} className="highlight-duck" />
                    <div>
                      <div className="mood-title">อารมณ์เด่นของ{rangeTitle}นี้</div>
                      <div className="mood-main">{MOOD_LABEL[topMood]}</div>
                      <p className="mood-desc">
                        {rangeTitle}นี้{MOOD_LABEL[topMood]}ไปแล้วทั้งหมด {moodCount[topMood]} ครั้ง
                      </p>
                    </div>
                  </div>

                  {/* Donut chart */}
                  <div className="mood-chart">
                    <MoodDonutChart data={chartData} />
                  </div>

                  {/* Mood list */}
                  <div className="mood-list">
                    {moodSorted.map(([mood, count]) => (
                      <div key={mood} className="mood-row">
                        <span className="tag" style={{ background: MOOD_COLOR[mood as MoodType] }}>
                          {MOOD_LABEL[mood as MoodType]}
                        </span>
                        <span>{count} ครั้ง</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-data">ยังไม่มีข้อมูลในช่วงนี้ 🐥</div>
              )}
            </div>

            {/* Tag Summary */}
            <div className="insight-card">
              <h3>Tags ที่ถูกใช้ใน{rangeTitle}นี้</h3>
              {tagSorted.length > 0 ? (
                <div className="tag-list">
                  {tagSorted.map(([tag, count]) => (
                    <span key={tag} className="tag-pill">{tag} {count}</span>
                  ))}
                </div>
              ) : (
                <div className="no-data">ยังไม่มี tag ในช่วงนี้</div>
              )}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Insight;