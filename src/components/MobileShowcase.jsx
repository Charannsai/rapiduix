import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { FiCode, FiLayout, FiZap, FiSmartphone, FiMoon, FiSun } from 'react-icons/fi';

const MobileShowcase = () => {
  const sectionRef = useRef(null);
  const phoneRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const phoneY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -5]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  
  // Screen content animations
  useEffect(() => {
    if (isInView) {
      const ctx = gsap.context(() => {
        // Create a timeline for screen transitions
        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power2.inOut" }
        });

        // Login Screen Animation
        tl.to('.screen-1', { opacity: 1, duration: 0.5 })
          .from('.screen-1 .logo', { y: -20, opacity: 0, duration: 0.5 })
          .from('.screen-1 .input-field', { 
            y: 20, 
            opacity: 0, 
            stagger: 0.2,
            duration: 0.4 
          })
          .from('.screen-1 .login-button', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.4 
          })
          .to('.screen-1', { opacity: 0, duration: 0.5, delay: 2 });

        // Dashboard Screen Animation
        tl.to('.screen-2', { opacity: 1, duration: 0.5 })
          .from('.screen-2 .header', { y: -20, opacity: 0, duration: 0.4 })
          .from('.screen-2 .stats-card', { 
            x: -20, 
            opacity: 0, 
            stagger: 0.2,
            duration: 0.4 
          })
          .from('.screen-2 .chart', { 
            scaleY: 0, 
            opacity: 0, 
            duration: 0.6,
            transformOrigin: 'bottom' 
          })
          .to('.screen-2', { opacity: 0, duration: 0.5, delay: 2 });

        // E-commerce Screen Animation
        tl.to('.screen-3', { opacity: 1, duration: 0.5 })
          .from('.screen-3 .product-card', { 
            y: 20, 
            opacity: 0, 
            stagger: 0.2,
            duration: 0.4 
          })
          .from('.screen-3 .cart-button', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.4 
          })
          .to('.screen-3', { opacity: 0, duration: 0.5, delay: 2 });

        // Theme Toggle Animation
        tl.to('.screen-4', { opacity: 1, duration: 0.5 })
          .from('.screen-4 .theme-switch', { 
            scale: 0.8, 
            opacity: 0, 
            duration: 0.4 
          })
          .to('.screen-4', { 
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            duration: 1 
          })
          .to('.screen-4', { opacity: 0, duration: 0.5, delay: 2 });

        // Navigation Animation
        tl.to('.screen-5', { opacity: 1, duration: 0.5 })
          .from('.screen-5 .nav-item', { 
            x: -20, 
            opacity: 0, 
            stagger: 0.2,
            duration: 0.4 
          })
          .from('.screen-5 .page-content', { 
            y: 20, 
            opacity: 0, 
            duration: 0.4 
          })
          .to('.screen-5', { opacity: 0, duration: 0.5, delay: 2 });
      }, phoneRef);
      
      return () => ctx.revert();
    }
  }, [isInView]);
  
  const features = [
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Build once, deploy everywhere with React Native & Flutter compatibility"
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      title: "Ready-Made UI",
      description: "Dozens of pre-built components ready to drop into your app"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Clean Code",
      description: "Well-structured, documented code that's easy to customize"
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Performance",
      description: "Optimized for speed and smooth animations on all devices"
    },
    {
      icon: <FiMoon className="w-6 h-6" />,
      title: "Dark Mode",
      description: "Built-in dark mode support for all components and templates"
    },
    {
      icon: <FiSun className="w-6 h-6" />,
      title: "Accessibility",
      description: "Accessible components that work for all users"
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl"
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
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
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
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Experience</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">RapidUIX</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Beautiful, responsive UI components for your next mobile app
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Mobile Phone Showcase */}
          <motion.div 
            ref={phoneRef}
            className="lg:w-1/2 flex justify-center"
            style={{ 
              y: phoneY,
              rotate: phoneRotate,
              scale: phoneScale
            }}
          >
            <div className="relative w-[280px] h-[580px]">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-3xl" />
              
              {/* Phone screen */}
              <div className="absolute inset-[10px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                {/* Screen content */}
                <div className="relative w-full h-full overflow-hidden">
                  {/* Screen 1: Login UI */}
                  <div className="screen-1 absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 opacity-0">
                    <div className="logo h-8 w-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-8 mx-auto" />
                    
                    <div className="space-y-4 mb-6">
                      <div className="input-field h-12 bg-white/10 rounded-lg" />
                      <div className="input-field h-12 bg-white/10 rounded-lg" />
                      <div className="input-field h-12 bg-white/5 rounded-lg" />
                    </div>
                    
                    <div className="login-button h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mb-4" />
                    <div className="h-6 w-32 bg-white/20 rounded-lg mx-auto" />
                  </div>
                  
                  {/* Screen 2: Dashboard UI */}
                  <div className="screen-2 absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 opacity-0">
                    <div className="header h-6 flex justify-between items-center mb-4">
                      <div className="h-6 w-24 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-md" />
                      <div className="h-6 w-6 rounded-full bg-white/10" />
                    </div>
                    
                    <div className="stats-card h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4 p-4">
                      <div className="h-6 w-32 bg-white/20 rounded-md mb-2" />
                      <div className="h-12 w-24 bg-white/10 rounded-md" />
                    </div>
                    
                    <div className="chart h-32 bg-white/5 rounded-xl p-4">
                      <div className="h-full w-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-lg" />
                    </div>
                  </div>
                  
                  {/* Screen 3: E-commerce UI */}
                  <div className="screen-3 absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 opacity-0">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="product-card h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl overflow-hidden">
                        <div className="h-28 bg-white/10" />
                        <div className="p-2">
                          <div className="h-4 w-16 bg-white/20 rounded-md mb-1" />
                          <div className="h-4 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md" />
                        </div>
                      </div>
                      <div className="product-card h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl overflow-hidden">
                        <div className="h-28 bg-white/10" />
                        <div className="p-2">
                          <div className="h-4 w-16 bg-white/20 rounded-md mb-1" />
                          <div className="h-4 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="cart-button h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg" />
                  </div>

                  {/* Screen 4: Theme Toggle */}
                  <div className="screen-4 absolute inset-0 bg-white p-4 opacity-0">
                    <div className="theme-switch h-40 flex items-center justify-center">
                      <div className="w-16 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative">
                        <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-4 mt-8">
                      <div className="h-8 bg-gray-200 rounded-lg" />
                      <div className="h-8 bg-gray-200 rounded-lg" />
                      <div className="h-8 bg-gray-200 rounded-lg" />
                    </div>
                  </div>

                  {/* Screen 5: Navigation */}
                  <div className="screen-5 absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 opacity-0">
                    <div className="nav-item h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mb-4" />
                    <div className="page-content space-y-4">
                      <div className="h-24 bg-white/10 rounded-xl" />
                      <div className="h-24 bg-white/10 rounded-xl" />
                      <div className="h-24 bg-white/10 rounded-xl" />
                    </div>
                  </div>
                </div>
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
              
              {/* Floating elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full border border-cyan-500/30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className="absolute -bottom-8 -left-8 w-12 h-12 rounded-full border border-purple-500/30"
                animate={{
                  y: [0, 10, 0],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
          
          {/* Features */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 group hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-cyan-400 mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileShowcase;