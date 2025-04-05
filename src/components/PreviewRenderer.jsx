import React from "react";
import { motion } from "framer-motion";

function PreviewRenderer({ code }) {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Card container */}
      <div className="relative w-full max-w-2xl rounded-xl overflow-hidden bg-white shadow-xl border border-gray-200">
        {/* Header */}
        <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-medium text-gray-600">Preview</div>
        </div>

        {/* Content */}
        <div className="relative h-[500px] bg-white">
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
            <div className="relative w-full h-full">
              <iframe
                src={`https://snack.expo.dev/?platform=web&data-snack-preview=true&code=${encodeURIComponent(code)}`}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                 style={{
                    clipPath: 'inset(21% 0 6% 80.5%)', 
                    position: 'absolute',
                    top: -80,
                    left: '-220%', 
                    right:'100%',
                    width: '300%', 
                    height: '100%',
                    transformOrigin: 'center right'
                  }}
              />
            </div>
          )}
        </div>

        {/* Animated accent border */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

export default PreviewRenderer;
