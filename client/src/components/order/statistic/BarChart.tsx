// BarChart.tsx

import React from 'react';
import { Chart as ChartJS, BarController, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarElement } from 'chart.js'

ChartJS.register(BarController, CategoryScale, LinearScale, Tooltip, Legend, BarElement);

interface BarChartProps {
  send: number;
  receive: number;
  width: string;
  height: string;
}

const BarChart: React.FC<BarChartProps> = ({ send, receive, width, height }) => {
  const data = {
    labels: ['Lượt hàng đang đi', 'Lượt hàng đang về'],
    datasets: [
      {
        data: [send, receive],
        backgroundColor: ['#3498db', '#e74c3c'], 
        hoverBackgroundColor: ['#2980b9', '#c0392b'],
        borderWidth: 2,
        borderColor: '#fff', 
        label: 'Số lượng', // Add label for the dataset
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const labelIndex = context.dataIndex;
            const count = labelIndex === 0 ? send : receive;
            return ` Số lượng: ${count}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        type: 'linear' as const,
        stepSize: 1,
      },
    },
  };
  

  return (
    <div style={{ width: width, height: height }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
