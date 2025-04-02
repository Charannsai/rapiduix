import React from 'react';
import { motion } from 'framer-motion';

function PreviewRenderer({ component }) {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  if (!component?.preview_link) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-background/50 rounded-lg">
        <p className="text-red-400">Preview not available</p>
      </div>
    );
  }
  
  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative w-[275px] h-[612px]">
        {/* Phone frame */}
        <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-3xl" />
        
        {/* Phone screen */}
        <div className="absolute inset-[10px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <motion.div 
                className="relative w-12 h-12"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
                <div className="absolute inset-2 rounded-full border-2 border-cyan-500/40 border-t-cyan-500" />
              </motion.div>
            </div>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <div className="w-full h-full relative">
                <iframe
                  src={component.preview_link}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    clipPath: 'inset(0 0 0 60%)', /* Hide the left half (code editor) */
                    position: 'absolute',
                    top: -40,
                    left: '-195%', /* Position iframe to show only the right half */
                    width: '300%', /* Double the width to maintain proper scaling */
                    height: '100%',
                    transformOrigin: 'center right'
                  }}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Phone reflections */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        
        {/* Animated glow */}
        <motion.div 
          className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-[4rem] blur-xl -z-10"
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}

export default PreviewRenderer;