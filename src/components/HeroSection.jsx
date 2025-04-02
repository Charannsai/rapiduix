import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title span',
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2
        }
      );
      
      gsap.fromTo(
        '.hero-subtitle',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: 'power3.out',
          delay: 1
        }
      );
      
      gsap.fromTo(
        '.hero-cta',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: 'power3.out',
          delay: 1.2
        }
      );
      
      gsap.fromTo(
        '.hero-visual',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

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
      <h1 className="hero-title text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
  <span className="inline-block bg-clip-text text-transparent bg-white">
    BUILD
  </span>{' '}
  <span className="inline-block bg-clip-text text-transparent bg-white">
    WITHOUT LIMITS,
  </span><br />
  <span className="inline-block bg-clip-text text-transparent bg-white">
    DESIGN
  </span>{' '}
  <span className="inline-block bg-clip-text text-transparent bg-white">
    WITH PRECISION
  </span>
</h1>

          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground text-emerald-500 max-w-xl mx-auto lg:mx-0 mb-8">
            Premium React Native & Flutter UI Templates for building beautiful cross-platform apps
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link
              to="/components"
              className="group relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium inline-flex items-center gap-2 overflow-hidden"
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
  className="group relative px-8 py-3 bg-transparent border border-cyan-500/30 text-cyan-400 rounded-lg font-medium inline-flex items-center gap-2 overflow-hidden hover:text-white transition-colors duration-300"
>
  <span className="relative z-10">View Templates</span>
  <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"
  />
</Link>

          </div>
        </motion.div>
        
        <motion.div 
          className="hero-visual lg:w-1/2 hidden relative md:inline z-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        >
          <div className="relative">
            {/* 3D UI Components Display */}
            <div className="hidden relative md:inline w-full max-w-lg mx-auto">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl blur-xl" />
              
              <motion.div
                className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-xl"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
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
                  <div className="h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg animate-pulse" />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg" />
                    <div className="h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg" />
                    <div className="h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg" />
                  </div>
                  
                  <div className="h-10 w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mx-auto" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-10 -right-10 w-48 h-48 bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-xl"
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="h-6 w-2/3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-md mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md" />
                  <div className="h-4 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-md" />
                  <div className="h-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-md" />
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -top-5 -left-5 w-36 h-36 bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-3 shadow-xl"
                initial={{ rotate: 5 }}
                animate={{ rotate: -5 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                <div className="h-5 w-2/3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-md mb-2" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-md" />
                  <div className="h-10 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 rounded-md" />
                  <div className="h-10 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-md" />
                  <div className="h-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-md" />
                </div>
              </motion.div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-cyan-500/30"
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
              className="absolute top-1/2 right-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-sm"
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
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default HeroSection;