import React, { useState } from 'react';
import BackButton from './BackButton';
import logo from '../assets/zukunft-fabrik-logo.png';

const Share = () => {
  const [formData, setFormData] = useState({
    email: '',
    title: '',
    businessField: '',
    problem: '',
    solution: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="fixed inset-0 bg-white overflow-y-auto">
      {/* Header */}
      <div className="w-full bg-white shadow-lg">
        <div className="w-full px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <img
            src={logo}
            alt="Zukunft-Fabrik"
            className="h-8 md:h-10 lg:h-12" // Responsive height
          />
        </div>
      </div>

      <div className="min-h-screen p-4 md:p-6 pt-20">
        <BackButton className="mb-6" />
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Share Your Story!</h2>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block font-semibold text-gray-700 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {/* Case Study Title Field */}
          <div className="space-y-2">
            <label htmlFor="title" className="block font-semibold text-gray-700 text-sm font-medium">
              Case Study Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Brief title for your case study"
            />
          </div>

          {/* Business Field */}
          <div className="space-y-2">
            <label htmlFor="businessField" className="block font-semibold text-gray-700 text-sm font-medium">
              Business Field
            </label>
            <input
              type="text"
              id="businessField"
              name="businessField"
              value={formData.businessField}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Healthcare, Technology, Retail"
            />
          </div>

          {/* Problem Field */}
          <div className="space-y-2">
            <label htmlFor="problem" className="block font-semibold text-gray-700 text-sm font-medium">
              Problem Description
            </label>
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the problem or challenge you faced..."
            />
          </div>

          {/* Solution/Failure Field */}
          <div className="space-y-2">
            <label htmlFor="solution" className="block font-semibold text-gray-700 text-sm font-medium">
              Solution/Failure
            </label>
            <textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-2 bg-white text-gray-900 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your solution or what you learned from the failure..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white transition-colors"
          >
            Share Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share; 