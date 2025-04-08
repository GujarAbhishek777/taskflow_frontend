import React from "react";
import { Pie } from 'react-chartjs-2';
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

    const pieChartData = {
      labels: ['Created', 'In Progress', 'On Hold', 'Cancelled', 'Completed'],
      datasets: [
        {
          data: [10, 20, 5, 3, 2], // Example data
          backgroundColor: [
            '#ff69b4',
            '#2ca02c',
            '#d62728',
            '#9467bd',
            '#8c564b',
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1.25, // Adjust this value as needed
    };

    const recentTasks = [
      {
        id: 1,
        title: 'Design Homepage',
        description: 'Create initial designs for the homepage.',
        dueDate: '2025-04-05',
      },
      {
        id: 2,
        title: 'Fix Login Bug',
        description: 'Resolve the issue preventing users from logging in.',
        dueDate: '2025-04-06',
      },
      // Add more tasks as needed
    ];
    
    
  return (
    <Page>
          <div className="flex flex-col md:flex-row p-4 space-y-4 md:space-y-0 md:space-x-4">
            
          <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
              <Pie data={pieChartData}  options={options}/>
            </div>
                  {/* Recent Tasks Section */}
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
              {recentTasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="text-gray-500 text-sm">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
            
          </div>
    </Page>
  );
};

export default Dashboard;
