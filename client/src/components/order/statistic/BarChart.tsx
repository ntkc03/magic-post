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
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'], 
        hoverBackgroundColor: ['rgba(54, 162, 235, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderWidth: 2,
        borderColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'], 
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
        ticks: {
          precision: 0, // Set precision to 0 to display integer values without decimals
        },
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
