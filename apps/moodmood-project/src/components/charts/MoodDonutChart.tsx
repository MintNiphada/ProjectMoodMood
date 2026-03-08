import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "happy", value: 6, color: "#F6D97A" },
  { name: "okay", value: 4, color: "#A8D5C2" },
  { name: "bored", value: 1, color: "#D9D9D9" },
  { name: "sad", value: 1, color: "#B8C2E0" },
  { name: "angry", value: 1, color: "#F4B4B4" },
  { name: "tired", value: 1, color: "#C9B8E8" }
];

const MoodDonutChart = () => {
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        innerRadius={60}
        outerRadius={80}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MoodDonutChart;