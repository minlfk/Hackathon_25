import { useState } from 'react';

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
      const response = await fetch("/chat", {
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

  return (
    <>
      <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl z-50">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Chat Support</h3>
          <button

            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="h-96 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                    } rounded-lg px-4 py-2 max-w-[80%]`}
                >
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;