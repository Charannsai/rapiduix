import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiSearch, FiEye, FiDownload } from 'react-icons/fi';

const StepCard = ({ number, icon, title, description, delay }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <div className="relative z-10 bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
          {number}
        </div>
        
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-cyan-400 mb-6 mx-auto">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-3 text-center">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-center">
          {description}
        </p>
      </div>
      
      {number < 3 && (
        <motion.div 
          className="absolute top-1/2 -right-8 w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent z-0 hidden lg:block"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.3 }}
          style={{ transformOrigin: "left" }}
        />
      )}
    </motion.div>
  );
};

const HowItWorks = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const steps = [
    {
      number: 1,
      icon: <FiSearch className="w-8 h-8" />,
      title: "Browse & Select",
      description: "Explore our vast collection of UI components & full app templates."
    },
    {
      number: 2,
      icon: <FiEye className="w-8 h-8" />,
      title: "Live Preview",
      description: "See the design in action and customize it to fit your needs."
    },
    {
      number: 3,
      icon: <FiDownload className="w-8 h-8" />,
      title: "Download & Integrate",
      description: "Get production-ready code and add it directly to your project."
    }
  ];

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">How It</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Works</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with RapidUIX in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;