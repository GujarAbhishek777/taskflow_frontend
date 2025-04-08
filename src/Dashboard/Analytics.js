import React from "react";
import Page from "./Page";
import { Bar } from 'react-chartjs-2';

const Analytics = () => {

    const barChartData = {
        labels: ['Created', 'In Progress', 'On Hold', 'Cancelled', 'Completed'],
        datasets: [
          {
            label: 'Number of Tasks',
            data: [10, 20, 5, 3, 2, 15], // Example data
            backgroundColor: [
              '#1f77b4', // Created
              '#ff69b4', // In Progress
              '#2ca02c', // On Hold
              '#9467bd', // Cancelled
              '#8c564b', // Completed
            ],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3, // Adjust this value as needed
      };
  
      
  return (

    <Page>
        <div className="p-6 bg-gray-100 min-h-screen rounded-lg shadow">
        <div className="w-full bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
            <Bar data={barChartData}  options={options} />
        </div>
        </div>
    </Page>

  );
};

export default Analytics;