import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiEye, FiCopy, FiCheck } from 'react-icons/fi';

const ComponentShowcase = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const [copiedStates, setCopiedStates] = useState({});

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setCopiedStates(prev => ({ ...prev, [id]: false })), 2000);
  };

  // Component Examples
  const components = [
    {
      id: 'gradient-button',
      title: 'Gradient Button',
      category: 'UI',
      preview: () => (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium"
        >
          Click Me
        </motion.button>
      ),
      code: `<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium"
>
  Click Me
</motion.button>`
    },
    {
      id: 'profile-card',
      title: 'Profile Card',
      category: 'Card',
      preview: () => (
        <div className="w-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
            JD
          </div>
          <h3 className="font-semibold text-lg mb-1">John Doe</h3>
          <p className="text-sm text-gray-400 mb-3">Product Designer</p>
          <div className="w-full h-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mb-3">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <p className="text-xs text-gray-400">70% Profile Complete</p>
        </div>
      ),
      code: `<div className="w-64 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col items-center">
  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
    JD
  </div>
  <h3 className="font-semibold text-lg mb-1">John Doe</h3>
  <p className="text-sm text-gray-400 mb-3">Product Designer</p>
  <div className="w-full h-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mb-3">
    <motion.div 
      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" 
      initial={{ width: 0 }}
      animate={{ width: '70%' }}
      transition={{ duration: 1.5 }}
    />
  </div>
  <p className="text-xs text-gray-400">70% Profile Complete</p>
</div>`
    },
    {
      id: 'notification-badge',
      title: 'Notification Badge',
      category: 'UI',
      preview: () => (
        <div className="relative">
          <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            3
          </motion.div>
        </div>
      ),
      code: `<div className="relative">
  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
    <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
    </svg>
  </div>
  <motion.div 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
  >
    3
  </motion.div>
</div>`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Component</span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Showcase</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Explore and use these interactive components with their source code
        </motion.p>
      </div>

      {/* Component Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {components.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800/50 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden"
          >
            {/* Component Header */}
            <div className="px-6 py-4 border-b border-white/5">
              <h3 className="font-semibold text-lg">{component.title}</h3>
              <span className="text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 px-2 py-1 rounded mt-1 inline-block">
                {component.category}
              </span>
            </div>

            {/* Component Preview */}
            <div className="p-6">
              <div className="flex mb-4">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center px-3 py-1 rounded-l-md ${activeTab === 'preview' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <FiEye className="mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center px-3 py-1 rounded-r-md ${activeTab === 'code' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  <FiCode className="mr-2" />
                  Code
                </button>
              </div>

              {/* Content Area */}
              <div className="h-64 overflow-hidden">
                {activeTab === 'preview' ? (
                  <div className="flex items-center justify-center h-full">
                    {component.preview()}
                  </div>
                ) : (
                  <div className="relative h-full">
                    <pre className="overflow-auto h-full p-4 bg-gray-900 rounded-md text-gray-300 text-sm">
                      {component.code}
                    </pre>
                    <button
                      onClick={() => handleCopyCode(component.id, component.code)}
                      className="absolute top-2 right-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
                    >
                      {copiedStates[component.id] ? <FiCheck className="text-green-500" /> : <FiCopy />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default ComponentShowcase;