import { useState } from 'react';
import BottomToolbar from './BottomToolbar';
import BackButton from './BackButton';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      const response = await fetch("https://tmp-gresfbded4dyfvg6.canadacentral-01.azurewebsites.net/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona: { usecase: "exam" },
          chat_history: updatedMessages,
        }),
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col">
      <BackButton />
      {/* Chat Window */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-2 md:px-4 pb-20">
        <div className="bg-white rounded-lg shadow-xl h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Chat Support</h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`${
                      msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                    } rounded-lg px-4 py-2 max-w-[80%]`}
                  >
                    <p className="text-gray-800">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2 md:p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomToolbar />
    </div>
  );
};

export default ChatPage; 