import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import BottomToolbar from './BottomToolbar';
import ReactMarkdown from 'react-markdown';
import { data } from '../data/cases';

const TopicDetail = () => {
  const { topic } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const formattedTopic = topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const topic_ = `/topic/${topic}`;
  const topicData_ = data[formattedTopic]; 

  // Example data - replace with actual data from your backend
  const topicData = {
    title: formattedTopic,
    summary: "Artificial Intelligence in Technology Resources",
    description: data[formattedTopic],
    caseStudies: [
      {
        title: "AI Implementation in Resource Management",
        content: "A detailed case study about how Company X implemented AI to optimize their technology resource allocation, resulting in 30% improved efficiency..."
      }
    ],
    contacts: [
      {
        name: "AI Resource Center",
        role: "Technical Support",
        email: "ai.support@example.com",
        phone: "+1 234 567 8900"
      },
      {
        name: "Innovation Lab",
        role: "Research & Development",
        email: "innovation@example.com",
        phone: "+1 234 567 8901"
      }
    ]
  };

  const sendMessage = async () => {
    console.log("We want to send a message", input)
    if (input.trim() === "") return;

    const newMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    try {
      console.log("Sending message:", input);
      const response = await fetch("https://tmp-gresfbded4dyfvg6.canadacentral-01.azurewebsites.net/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona: { usecase: "case-study" },
          chat_history: updatedMessages,
          case_study: JSON.stringify(topicData_).replace(/[^\w\s]/gi, ''),
        }),
      });
      console.log("Response:", response);
      const data = await response.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="prose max-w-none text-black">
            <ReactMarkdown>{topicData.description}</ReactMarkdown>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Chat Support</h2>
          </div>
          <div className="h-64 overflow-y-auto p-4">
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
                    <div className="text-gray-800 text-black">
                      <div>{msg.content}</div>
                    </div>
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
                className="flex-1 text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Case Studies Dropdown 
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <button
            onClick={() => setIsCaseStudiesOpen(!isCaseStudiesOpen)}
            className="w-full p-4 text-left font-semibold flex justify-between items-center"
          >
            <span>Case Studies</span>
            <span className={`transform transition-transform ${isCaseStudiesOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          {isCaseStudiesOpen && (
            <div className="p-4 border-t border-gray-200">
              {topicData.caseStudies.map((study, index) => (
                <div key={index} className="mb-4 text-black">
                  <h3 className="font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600">{study.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>*/}

        {/* Useful Contacts Dropdown */}
        {/*<div className="bg-white rounded-lg shadow-lg mb-6">
          <button
            onClick={() => setIsContactsOpen(!isContactsOpen)}
            className="w-full p-4 text-left font-semibold flex justify-between items-center"
          >
            <span>Useful Contacts</span>
            <span className={`transform transition-transform ${isContactsOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
          isContactsOpen && (
            <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicData.contacts.map((contact, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-gray-600">{contact.role}</p>
                  <p className="text-sm text-blue-600">{contact.email}</p>
                  <p className="text-sm text-gray-500">{contact.phone}</p>
                </div>
              ))}
            </div>
          )
        </div>*/}
      </div>
      <BottomToolbar />
    </div>
  );
};

export default TopicDetail;