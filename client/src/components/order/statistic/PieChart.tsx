// PieChart.tsx

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  successes: number;
  failures: number;
  width: string;
  height: string;
}

const PieChart: React.FC<PieChartProps> = ({ successes, failures, width, height }) => {
  const total = successes + failures;
  const successPercentage = ((successes / total) * 100).toFixed(2);
  const failurePercentage = ((failures / total) * 100).toFixed(2);

  const data = {
    labels: ['Giao hàng thành công', 'Giao hàng thất bại'],
    datasets: [
      {
        data: [successPercentage, failurePercentage],
        backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'], // Blue for success, Red for failure
        hoverBackgroundColor: ['rgba(75, 192, 192, 1)', "rgba(255, 99, 132, 1)"], // Darker shades for hover effect
        borderWidth: 2, // Border width for slices
        borderColor: '#fff', // Border color for slices
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const, // Set the legend position to the bottom
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const labelIndex = context.dataIndex;
            const count = labelIndex === 0 ? successes : failures;
            return ` Số lượng: ${count} (${context.parsed}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: width, height: height }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
