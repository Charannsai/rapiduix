import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiUsers, FiTarget, FiAward } from 'react-icons/fi';
import Footer from '../components/Footer';

const TeamMember = ({ name, role, image, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group flex justify-center "
    >
      <div className="relative w-fit overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border border-white/10 p-6 text-center">
       
        
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 mx-auto mb-4 overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-cyan-400">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground mb-4">{role}</p>
        
        <div className="flex justify-center space-x-3">
          <a href="https://x.com/saircasticc" className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
            </svg>
          </a>
          <a href="https://github.com/charannsai" className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/charannsai" className="w-8 h-8 rounded-full bg-background/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ValueCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div className="relative bg-background/30 light:border backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
        
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const values = [
    {
      icon: <FiCode className="w-6 h-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors" />,
      title: "Quality Code",
      description: "We believe in writing clean, maintainable, and efficient code that stands the test of time."
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      title: "User-Centric",
      description: "Everything we build is designed with the end-user in mind, ensuring intuitive and delightful experiences."
    },
    {
      icon: <FiTarget className="w-6 h-6" />,
      title: "Innovation",
      description: "We constantly push boundaries and explore new technologies to deliver cutting-edge solutions."
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from design to implementation to support."
    }
  ];
  
  const team = [
    { name: "Charan Sai Pathuri", role: "Founder & CEO", image: "https://media.licdn.com/dms/image/v2/D5603AQF1OgRm9MVMqg/profile-displayphoto-shrink_800_800/B56ZV1CQfQGsAc-/0/1741425281618?e=1749081600&v=beta&t=IqlPecxcmqziniAjPd3VYeqZzFBIIajmCjiPbt7et_0" },
  ];

  return (
    <div className="min-h-screen">
      <div className="relative pt-24 pb-16">
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 group hover:border-cyan-500/30 transition-colors"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 ">About</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">RapidUIX</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              We're on a mission to make UI development faster, easier, and more enjoyable for developers worldwide.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 group hover:border-cyan-500/30 transition-colors"
            >
              
              <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
              
              <p className="text-muted-foreground mb-4">
                RapidUIX was born out of frustration. As developers, we spent countless hours building the same UI components over and over again for different projects. We knew there had to be a better way.
              </p>
              
              <p className="text-muted-foreground mb-4">
                 we set out to create a comprehensive library of UI components and templates specifically designed for React Native and Flutter developers. Our goal was simple: to help developers build beautiful, cross-platform apps faster.
              </p>
              
            </motion.div>
          </div>
          
          <div ref={sectionRef} className="mb-24">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Our</span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Values</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 max-w-6xl mx-auto  group hover:border-cyan-500/30 transition-colors">
              {values.map((value, index) => (
                <ValueCard
                  key={index}
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-24">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Meet Team Behind RapidUIX</span>
              </h2>
            
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default About;