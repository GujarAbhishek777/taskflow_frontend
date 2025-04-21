import React,{useState,useEffect} from "react";
import Page from "./Page";
import ChatComponent from "./ChatComponent"
import axios from 'axios';
import Swal from "sweetalert2";

const Messages = () => {
    
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([
    // { id: 1, senderId: 1, receiverId: 2, content: 'Hello Bob!', timestamp: '2025-03-31T10:00:00Z' },
    // { id: 2, senderId: 2, receiverId: 1, content: 'Hi Alice! How are you?', timestamp: '2025-03-31T10:05:00Z' },
    // { id: 3, senderId: 1, receiverId: 3, content: 'Hey Charlie, are you coming to the meeting?', timestamp: '2025-03-31T11:00:00Z' },
    // { id: 4, senderId: 3, receiverId: 1, content: 'Yes, I will be there.', timestamp: '2025-03-31T11:15:00Z' },
    // { id: 5, senderId: 2, receiverId: 3, content: 'Charlie, can you send me the report?', timestamp: '2025-03-31T12:00:00Z' },
    // { id: 6, senderId: 3, receiverId: 2, content: 'Sure, sending it now.', timestamp: '2025-03-31T12:10:00Z' },
  ]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({id:1});
  const [isSendMessageModalOpen, setIsSendMessageModalOpen] = useState(false);
  const [isConversationModalOpen, setIsConversationModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  // Fetch users and messages from backend or state management store
  useEffect(() => {
  
    fetchMessages();
    // setCurrentUser({id:1})
    // setUsers([
    //   { id: 1, name: 'Alice Johnson' },
    //   { id: 2, name: 'Bob Smith' },
    //   { id: 3, name: 'Charlie Davis' },
    // ])
    // setMessages([
    //   { id: 1, senderId: 1, receiverId: 2, content: 'Hello Bob!', timestamp: '2025-03-31T10:00:00Z' },
    //   { id: 2, senderId: 2, receiverId: 1, content: 'Hi Alice! How are you?', timestamp: '2025-03-31T10:05:00Z' },
    //   { id: 3, senderId: 1, receiverId: 3, content: 'Hey Charlie, are you coming to the meeting?', timestamp: '2025-03-31T11:00:00Z' },
    //   { id: 4, senderId: 3, receiverId: 1, content: 'Yes, I will be there.', timestamp: '2025-03-31T11:15:00Z' },
    //   { id: 5, senderId: 2, receiverId: 3, content: 'Charlie, can you send me the report?', timestamp: '2025-03-31T12:00:00Z' },
    //   { id: 6, senderId: 3, receiverId: 2, content: 'Sure, sending it now.', timestamp: '2025-03-31T12:10:00Z' },
    // ])
    // Implement data fetching logic here
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages);
      setUsers(response.data.users) 
      setCurrentUser(response.data.current_user)// Assuming your API returns { users: [...] }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load tasks.",
        icon: "error",
      });
    }
  };

  const openSendMessageModal = () => {
    setIsSendMessageModalOpen(true);
  };

  const closeSendMessageModal = () => {
    setIsSendMessageModalOpen(false);
  };

  const openConversationModal = (user) => {
    setSelectedUser(user);
    setIsConversationModalOpen(true);
  };

  const closeConversationModal = () => {
    setIsConversationModalOpen(false);
    fetchMessages()
    setSelectedUser(null);
  };

  const handleSendMessage = async(from_chat = false,messge='') => {
    console.log("sfjksdkfdsfjsdfksdfndsjn")
    if (newMessage.trim() === '' && !from_chat) return;

    const token = localStorage.getItem("jwt");
  
    try {
       await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/add_message`,
        { messg: from_chat ? messge :{content:newMessage,senderId:currentUser.id,receiverId:selectedUserId,client_id:currentUser.client_id} }, // Assuming your API accepts a `task` object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Append the new task to the list
      if(!from_chat){

      fetchMessages()

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Task added successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
     }
  
      setNewMessage('');
      closeSendMessageModal();

    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while adding the task.",
      });
    }

    // Implement message sending logic here

  };

  // const handleSendMessageInConversation = () => {
  //   if (newMessage.trim() === '') return;
  //   // Implement message sending logic here
  //   setNewMessage('');
  // };

  const getRecentMessage = (userId) => {
    const userMessages = messages.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId
    );
    const recentMessage = userMessages.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    )[0];
    return recentMessage ? recentMessage.content : 'No messages yet';
  };

  const getConversationHistory = (userId) => {
    return messages
      .filter((msg) => msg.senderId === userId || msg.receiverId === userId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  return (
    <Page>

<div className="p-4">
      {/* Send Message Button */}
      <button
        onClick={openSendMessageModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send Message
      </button>

      {/* User Message Boxes */}
      <div className="space-y-4">
        {users.map((user) => (
          user?.id !== currentUser?.id ?
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md border cursor-pointer"
            onClick={() => openConversationModal(user)}
          >
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-gray-600">{getRecentMessage(user.id)}</p>
          </div>
          : ""
        ))}
      </div>
      {/* Send Message Modal */}
      {isSendMessageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            {/* User Selection Dropdown */}
            <select
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {/* Message Textarea */}
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              rows="4"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            {/* Modal Actions */}
            <div className="flex justify-end">
              <button
                onClick={closeSendMessageModal}
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && isConversationModalOpen && (
        <ChatComponent
          // isOpen={isChatModalOpen}
          currentUser={currentUser}
          onClose={closeConversationModal}
          selectedUser={selectedUser}
          messages={getConversationHistory(selectedUser.id)}
          onSendMessage={handleSendMessage}
        />
      )}
  </div>
    
    </Page>
  );
};

export default Messages;