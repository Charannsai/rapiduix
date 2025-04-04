import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import ComponentView from '../components/ComponentView';
import { fetchComponentList } from '../utils/github';

function ComponentsList({ components, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {components.map((component, index) => (
        <motion.div
          key={component.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group relative overflow-hidden cursor-pointer"
          onClick={() => onSelect(component)}
        >
          <div className="glass-effect rounded-xl p-6 h-full transition-all duration-300 group-hover:translate-y-[-4px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <h3 className="text-xl font-semibold mb-2">
              {component.title || component.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {component.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                {component.framework || 'React Native'}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Components() {
  const [searchTerm, setSearchTerm] = useState('');
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadComponents = async () => {
      try {
        const componentsList = await fetchComponentList();
        setComponents(componentsList);
        setLoading(false);
      } catch (err) {
        setError('Failed to load components. Please try again later.');
        setLoading(false);
        console.error('Error fetching component list:', err);
      }
    };

    loadComponents();
  }, []);

  const handleComponentSelect = (component) => {
    const componentSlug = (component.title || component.name).toLowerCase().replace(/\s+/g, '-');
    navigate(`/components/${componentSlug}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  const filteredComponents = components.filter(component =>
    (component?.title || component?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (component?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isComponentView = location.pathname !== '/components';

  return (
    <div className="flex min-h-screen">
      <Sidebar components={components} />
      
      <div className="flex-1 ml-64">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {!isComponentView && (
            <>
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold mb-4 mt-16 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  UI Components
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover our collection of beautiful and reusable components built for React Native and Flutter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search components..."
                      className="w-full pl-10 pr-4 h-12 rounded-lg bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 h-12 glass-effect rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <FiFilter />
                    <span>Filter</span>
                  </button>
                </div>
              </motion.div>

              <ComponentsList 
                components={filteredComponents} 
                onSelect={handleComponentSelect}
              />
            </>
          )}

          <Routes>
            <Route 
              path=":component" 
              element={<ComponentView components={components} />} 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Components;