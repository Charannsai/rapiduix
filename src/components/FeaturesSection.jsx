import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPackage, FiCode, FiLayout, FiZap, FiEye, FiDollarSign,  FiCpu } from 'react-icons/fi';
import gsap from 'gsap';

const FeatureCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative bg-background/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          {title}
        </h3>
        
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.features-title',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
      
      gsap.fromTo(
        '.features-subtitle',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <FiPackage className="w-6 h-6" />,
      title: "Cross-Platform Compatible",
      description: "Works seamlessly with React Native & Flutter for consistent experiences across all devices."
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Pre-Built UI Components",
      description: "Extensive library of buttons, modals, forms, navigation components, and more."
    },
    {
      icon: <FiLayout className="w-6 h-6" />,
      title: "Full App Templates",
      description: "Complete app designs and layouts, ready to integrate into your project."
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: "Performance Optimized",
      description: "Lightweight, smooth, and responsive UI elements that won't slow down your app."
    },
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Live Preview & Code",
      description: "See and test designs before using them with our interactive preview system."
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Freemium Model",
      description: "Start with free components and upgrade to premium as your needs grow."
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Developer-Friendly",
      description: "Clean, modular, and well-documented code that's easy to customize."
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "Regular Updates",
      description: "Constant improvements and new components to keep your UI fresh and modern."
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"
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
      
      <div className="container mx-auto px-4">
        <div ref={headingRef} className="text-center mb-16">
          <motion.h2 
            className="features-title text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Why Choose</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">RapidUIX?</span>
          </motion.h2>
          
          <motion.p 
            className="features-subtitle text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Save time, reduce costs, and build faster with our premium UI components
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;