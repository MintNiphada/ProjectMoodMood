const InsightHeader: React.FC = () => {
  return (
    <>
      <div className="insight-range">
        <button>สัปดาห์นี้</button>
        <button className="active">เดือนนี้</button>
        <button>ปีนี้</button>
      </div>

      <div className="insight-month">
        ธันวาคม 2568 ▾
      </div>
    </>
  );
};

export default InsightHeader;