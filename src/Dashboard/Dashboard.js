import React from "react";
import { Bar, Pie } from 'react-chartjs-2';
import Page from "./Page";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);



const Dashboard = () => {

    // Chart data
    const barChartData = {
      labels: ['Created', 'Pending', 'On Hold', 'Rejected', 'Cancelled', 'Completed'],
      datasets: [
        {
          label: 'Number of Tasks',
          data: [10, 20, 5, 3, 2, 15], // Example data
          backgroundColor: [
            '#1f77b4', // Created
            '#ff69b4', // Pending
            '#2ca02c', // On Hold
            '#d62728', // Rejected
            '#9467bd', // Cancelled
            '#8c564b', // Completed
          ],
        },
      ],
    };
    
    const pieChartData = {
      labels: ['Created', 'Pending', 'On Hold', 'Rejected', 'Cancelled', 'Completed'],
      datasets: [
        {
          data: [10, 20, 5, 3, 2, 15], // Example data
          backgroundColor: [
            '#1f77b4',
            '#ff69b4',
            '#2ca02c',
            '#d62728',
            '#9467bd',
            '#8c564b',
          ],
        },
      ],
    };
    
    
  return (
    <Page>
          <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
              <Bar data={barChartData} />
            </div>
            <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
              <Pie data={pieChartData} />
            </div>
          </div>
    </Page>
  );
};

export default Dashboard;
