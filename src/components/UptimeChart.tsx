import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface UptimeChartProps {
  data: number[];
}

const UptimeChart: React.FC<UptimeChartProps> = ({ data }) => {
  // Transform data for recharts
  const chartData = data.map((value, index) => ({
    time: index,
    uptime: value,
  }));

  // Determine line color based on average uptime
  const averageUptime = data.reduce((sum, value) => sum + value, 0) / data.length;
  const getLineColor = () => {
    if (averageUptime >= 99.5) return 'hsl(var(--status-up))';
    if (averageUptime >= 98) return 'hsl(var(--status-partial))';
    return 'hsl(var(--status-down))';
  };

  return (
    <div className="h-16 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Line
            type="monotone"
            dataKey="uptime"
            stroke={getLineColor()}
            strokeWidth={2}
            dot={false}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UptimeChart;