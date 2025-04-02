import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight } from 'react-icons/fi';
import Fuse from 'fuse.js';

const searchablePages = [
  { title: 'Home', path: '/' },
  { title: 'Components', path: '/components' },
  { title: 'Templates', path: '/templates' },
  { title: 'Blog', path: '/blog' },
  { title: 'Documentation', path: '/docs' },
  { title: 'Getting Started', path: '/docs/getting-started' },
  { title: 'Installation', path: '/docs/installation' },
  { title: 'Components API', path: '/docs/components-api' },
  { title: 'Styling Guide', path: '/docs/styling' },
  { title: 'Best Practices', path: '/docs/best-practices' },
];

const fuse = new Fuse(searchablePages, {
  keys: ['title'],
  threshold: 0.3,
});

function CommandMenu({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const placeholders = [
    "Search for /docs",
    "Search for /components",
    "Search for /founder",
    "Search for /blogs"
  ];

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        onClose(true);
      } else if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setSearchTerm('');
    }
  }, [isOpen]);

  // Rotate placeholders
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % placeholders.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isOpen, placeholders.length]);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      setResults(searchResults.map(result => result.item));
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSelect = (path) => {
    navigate(path);
    onClose(false);
    setSearchTerm('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => onClose(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background border border-border rounded-lg shadow-2xl overflow-hidden">
                <div className="flex items-center p-4 border-b border-border relative">
                  <FiSearch className="w-5 h-5 text-muted-foreground mr-3" />
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      className="w-full bg-transparent border-0 outline-none text-lg placeholder-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={placeholders[placeholderIndex]}
                    />
                    
                    {/* Animated placeholder */}
                    <AnimatePresence mode="wait">
                      {!searchTerm && (
                        <motion.span
                          key={placeholders[placeholderIndex]}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 0.6, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-0 text-muted-foreground pointer-events-none text-lg"
                        >
                          {placeholders[placeholderIndex]}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={() => onClose(false)}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="max-h-[40vh] overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="p-2">
                      {results.map((result) => (
                        <button
                          key={result.path}
                          className="w-full text-left px-4 py-3 rounded-md hover:bg-muted flex items-center justify-between group transition-colors"
                          onClick={() => handleSelect(result.path)}
                        >
                          <span>{result.title}</span>
                          <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <div className="p-8 text-center text-muted-foreground">
                      No results found for "{searchTerm}"
                    </div>
                  ) : (
                    <div className="p-4 text-muted-foreground">
                      <div className="mb-4">
                        <h3 className="font-medium mb-2">Quick Navigation</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {searchablePages.slice(0, 6).map((page) => (
                            <button
                              key={page.path}
                              className="text-left px-3 py-2 rounded-md hover:bg-muted flex items-center justify-between group transition-colors"
                              onClick={() => handleSelect(page.path)}
                            >
                              <span>{page.title}</span>
                              <FiArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandMenu;