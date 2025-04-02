import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGithub, FiDownload } from 'react-icons/fi';

const templates = [
  {
    id: 1,
    title: "E-Commerce App",
    description: "Complete e-commerce application template with product listings, cart, and checkout functionality.",
    image: "https://placehold.co/600x400",
    tags: ["React Native", "Firebase"],
    features: [
      "Product catalog with categories",
      "Shopping cart management",
      "User authentication",
      "Order processing",
      "Payment integration"
    ]
  },
  {
    id: 2,
    title: "Social Media App",
    description: "Feature-rich social media application template with real-time updates and media sharing.",
    image: "https://placehold.co/600x400",
    tags: ["Flutter", "Firebase"],
    features: [
      "User profiles",
      "News feed",
      "Real-time chat",
      "Media sharing",
      "Push notifications"
    ]
  }
];

function Templates() {
  const [searchTerm, setSearchTerm] = useState('');

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
     <h1 class="text-2xl font-bold mt-64 text-center text-blue-500 bg-gray-900 p-4 rounded-lg shadow-lg">
  🚀 Currently Working on this Feature!
</h1>

      {/* <motion.div 
        className="mb-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Application Templates
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <FiFilter />
            <span>Filter</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {template.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-semibold text-primary-600 bg-primary-100 dark:text-primary-400 dark:bg-primary-900 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Key Features:
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                  {template.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <FiDownload className="w-4 h-4" />
                  Download
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <FiGithub className="w-4 h-4" />
                  GitHub
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
    </div>
  );
}

export default Templates;