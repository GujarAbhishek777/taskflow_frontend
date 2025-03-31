import React,{useState,useEffect, useRef} from "react";

const ChatComponent = ({ users,currentUser,selectedUser, messages,onClose}) => {
    // const [isChatOpen, setIsChatOpen] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);
    const [chatMessages, setChatMessages] = useState(messages);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef(null);
  
    // Function to open the chat popup for a specific user
    // const openChat = (userId) => {
    //   const user = users.find((u) => u.id === userId);
    //   setSelectedUser(user);
    //   const userMessages = messages.filter(
    //     (msg) =>
    //       (msg.senderId === userId && msg.receiverId === currentUser.id) ||
    //       (msg.senderId === currentUser.id && msg.receiverId === userId)
    //   );
    //   setChatMessages(userMessages);
    //   setIsChatOpen(true);
    // };
  
    // Function to close the chat popup
    // const closeChat = () => {
    //   setIsChatOpen(false);
    //   setSelectedUser(null);
    //   setChatMessages([]);
    // };
  
    // Function to handle sending a new message
    const handleSendMessage = () => {
      if (newMessage.trim() === '') return;
  
      const message = {
        id: messages.length + 1,
        senderId: currentUser.id,
        receiverId: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
  
      // Update the chat messages state
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
  
      // Scroll to the bottom after sending a message
      scrollToBottom();
    };
  
    // Function to scroll the chat to the bottom
    const scrollToBottom = () => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    // Scroll to bottom on new messages
    useEffect(() => {
      scrollToBottom();
    }, [chatMessages]);
  
    return (
      <div>
        {/* Button to open chat popup */}
        {/* <button onClick={() => openChat(userId)}>Open Chat</button> */}
  
        {/* Chat Popup */}
        {true && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Chat with {selectedUser.name}
                </h2>
                <button onClick={onClose} className="text-gray-500">
                  &times;
                </button>
              </div>
              <div className="h-64 overflow-y-auto mb-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded ${
                      msg.senderId === currentUser.id
                        ? 'bg-blue-100 text-right'
                        : 'bg-gray-100 text-left'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <div className="flex">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="2"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                  onClick={handleSendMessage}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ChatComponent;
  