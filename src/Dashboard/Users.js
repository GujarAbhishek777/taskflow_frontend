import React,{useState} from "react";
import Page from "./Page";

const UserCard = ({ user }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-bold">{`${user.firstName} ${user.lastName}`}</h3>
    <p className="text-gray-600">{user.email}</p>
    <p className="text-gray-600">{user.designation}</p>
  </div>
);


const Users = () => {

  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    // Validate required fields
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.designation) {
      alert('All fields are required.');
      return;
    }

    setUsers([...users, newUser]);
    setNewUser({ firstName: '', lastName: '', email: '', designation: '' });
    setIsModalOpen(false);
  };
    
  return (
    <Page>
      <div className="p-6">
      {/* Add User Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Add New User</h3>
              <div className="mt-2 px-7 py-3">
                <form>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={newUser.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={newUser.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      value={newUser.designation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded"
                      required
                    />
                  </div>
                  <div className="items-center px-4 py-3">
                    <button
                      type="button"
                      onClick={handleAddUser}
                      className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700"
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    </Page>
  );
};

export default Users;