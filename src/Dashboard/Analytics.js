import React,{useState,useEffect}  from "react";
import Page from "./Page";
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Swal from "sweetalert2";

const Analytics = () => {

   const [piedata, setPieData] = useState([1, 1, 1, 1, 1])

    const barChartData = {
        labels: ['Created', 'In Progress', 'On Hold', 'Cancelled', 'Completed'],
        datasets: [
          {
            label: 'Number of Tasks',
            data: piedata, // Example data
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
  
      useEffect(() => {
        const fetchTasksData = async () => {
          try {
            const token = localStorage.getItem("jwt");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tasks_data`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params:{
                from_dash:false
              }
            });
            setPieData(response.data.piedata)
          } catch (error) {
            console.error("Error fetching tasks:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to load tasks.",
              icon: "error",
            });
          }
        };
      
        fetchTasksData();
      }, []);
      
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