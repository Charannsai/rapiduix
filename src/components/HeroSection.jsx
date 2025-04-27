import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCopy, FiCheck } from 'react-icons/fi';
import Lenis from '@studio-freight/lenis';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install rapiduix');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
        <motion.div 
          style={{ y }}
          className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now in beta • v1.0.8
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600"
            >
              Build Native Apps
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block text-white"
            >
              Faster Than Ever
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8 max-w-xl"
          >
            Premium React Native & Flutter UI Components for building beautiful cross-platform apps in minutes, not hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-background/30 backdrop-blur-sm border border-white/10 rounded-lg p-2">
              <code className="text-sm font-mono bg-white/5 px-3 py-2 rounded">npm install rapiduix</code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/5 rounded-md transition-colors"
              >
                {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center lg:justify-start gap-4"
          >
            <Link
              to="/components"
              className="group relative px-8 py-3 bg-gradient-to-r from-primary to-blue-600 text-white rounded-lg font-medium inline-flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">Explore Components</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            
            <Link
              to="/templates"
              className="group relative px-8 py-3 bg-transparent border border-primary/30 text-primary rounded-lg font-medium inline-flex items-center gap-2 overflow-hidden hover:text-white transition-colors w-full sm:w-auto justify-center"
            >
              <span className="relative z-10">View Templates</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 relative"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* 3D UI Components Display */}
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl blur-xl" />
              
              <motion.div
                className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs text-muted-foreground">RapidUIX</div>
                </div>
                
                <div className="space-y-4">
                  <motion.div 
                    className="h-12 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-lg"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <motion.div 
                      className="h-24 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    />
                    <motion.div 
                      className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    />
                    <motion.div 
                      className="h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <motion.div 
                    className="h-10 w-1/2 bg-gradient-to-r from-primary to-blue-600 rounded-lg mx-auto"
                    whileHover={{ scale: 1.02 }}
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-primary/30"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              className="absolute bottom-0 left-0 w-16 h-16 rounded-full border border-purple-500/30"
              animate={{
                y: [0, 15, 0],
                rotate: [360, 180, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <motion.div
              className="absolute top-1/2 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-blue-500/30 blur-sm"
              animate={{
                y: [0, 20, 0],
                x: [0, 10, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;