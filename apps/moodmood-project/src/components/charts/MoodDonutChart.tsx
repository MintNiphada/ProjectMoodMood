// src/components/charts/MoodDonutChart.tsx
import { PieChart, Pie, Cell } from "recharts";
import { MoodType } from "../../types/Mood";

interface ChartItem {
  mood: MoodType;
  count: number;
  color: string;
}

interface Props {
  data: ChartItem[];
}

const MoodDonutChart: React.FC<Props> = ({ data }) => {
  if (!data.length) return null;

  const chartData = data.map(d => ({ name: d.mood, value: d.count, color: d.color }));

  return (
    <PieChart width={200} height={200}>
      <Pie data={chartData} innerRadius={60} outerRadius={80} dataKey="value">
        {chartData.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default MoodDonutChart;