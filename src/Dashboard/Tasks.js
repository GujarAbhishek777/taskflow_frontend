import React,{useState,useEffect} from "react";
import Page from "./Page";
import axios from 'axios';
import Swal from "sweetalert2";

const Tasks = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));


    const [tasks, setTasks] = useState([
        // { id: 1, title: 'Task 1', description: 'Complete UI design.', assignedUser: 'User A', dueDate: '2025-04-10', status: 'On Hold' },
        // { id: 2, title: 'Task 2', description: 'Fix authentication bug.', assignedUser: 'User B', dueDate: '2025-04-12', status: 'In Progress' },
        // { id: 3, title: 'Task 3', description: 'Deploy backend API.', assignedUser: 'User A', dueDate: '2025-04-15', status: 'Completed' },
        // Add more tasks as needed
      ]);
    
      const [filters, setFilters] = useState({
        user: '',
        dueDate: '',
        status: '',
      });
    
      const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignedUser: '',
        dueDate: '',
        status: '',
      });

      const [users, setUsers] = useState([]);
    
      const handleFilterChange = (event) => {
        const { name, value, type, checked } = event.target;
      
        setFilters((prevFilters) => ({
          ...prevFilters,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
      
    
      const filteredTasks = tasks?.filter((task) => {
        return (
          (filters.user ? task.assignedUser === filters.user : true) &&
          (filters.dueDate ? task.dueDate === filters.dueDate : true) &&
          (filters.status ? task.status === filters.status : true)
        );
      });

      useEffect(() => {
          const fetchTasks = async () => {
            try {
              const token = localStorage.getItem("jwt");
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/tasks`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setTasks(response.data.tasks);
              setUsers(response.data.users) // Assuming your API returns { users: [...] }
            } catch (error) {
              console.error("Error fetching tasks:", error);
              Swal.fire({
                title: "Error!",
                text: "Failed to load tasks.",
                icon: "error",
              });
            }
          };
        
          fetchTasks();
        }, []);
      



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewTask({
      title: '',
      description: '',
      assignedUser: '',
      dueDate: '',
      status: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("jwt");
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/add_task`,
        { task: newTask }, // Assuming your API accepts a `task` object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Append the new task to the list
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
  
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Task added successfully.",
      });
  
      closeModal();
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while adding the task.",
      });
    }
  };

  return (
    <Page>
  <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add Task Section */}
      <div className="flex justify-end mb-4">
        { user?.task_creator ?
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
        :
        ""
        }
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Add New Task</h3>
              <button onClick={closeModal} className="text-black close-modal">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-4">
                <label className="block text-gray-700">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Assigned User</label>
                <select
                  name="assignedUser"
                  value={newTask.assignedUser}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newTask.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Created">Created</option>
                  <option value="On Hold">On Hold</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
  <h2 className="text-lg font-bold mb-4">Filter Tasks</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* User Filter */}
    <select
      name="user"
      value={filters.user}
      onChange={handleFilterChange}
      className="border border-gray-300 rounded p-2"
    >
      <option value="">All Users</option>

      {users?.map((user) => (
        <option key={user.id} value={user.id}>
          {user.firstName}
        </option>
      ))}
    </select>

    {/* Due Date Filter */}
    <input
      type="date"
      name="dueDate"
      value={filters.dueDate}
      onChange={handleFilterChange}
      className="border border-gray-300 rounded p-2"
    />

    {/* Status Filter */}
    <select
      name="status"
      value={filters.status}
      onChange={handleFilterChange}
      className="border border-gray-300 rounded p-2"
    >
      <option value="">All Statuses</option>
      <option value="Created">Created</option>
      <option value="On Hold">On Hold</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
      {/* Add more status options as needed */}
    </select>
  </div>

  {/* Due Date Passed Filter */}
  <div className="mt-4">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="dueDatePassed"
        checked={filters.dueDatePassed}
        onChange={handleFilterChange}
        className="form-checkbox"
      />
      <span className="ml-2 text-gray-700">Due Date Passed</span>
    </label>
  </div>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredTasks?.map((task) => (
    <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Assigned to:</span> {task.assignedUser}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Due Date:</span> {task.dueDate}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`${
              task.status === "Completed"
                ? "text-green-500"
                : task.status === "In Progress"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {task.status}
          </span>
        </p>
      </div>
    </div>
  ))}
</div>

      </div>

    </Page>
  );
};

export default Tasks;