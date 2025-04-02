import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiMail, FiMessageSquare, FiBook, FiHelpCircle } from 'react-icons/fi';
import Footer from '../components/Footer';

const SupportCard = ({ icon, title, description, buttonText, buttonLink, index }) => {
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
      <div className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-cyan-400 mb-4">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6">
          {description}
        </p>
        
        <a 
          href={buttonLink} 
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {buttonText} →
        </a>
      </div>
    </motion.div>
  );
};

const FAQItem = ({ question, answer, index }) => {
  const faqRef = useRef(null);
  const isInView = useInView(faqRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={faqRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="mb-6"
    >
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-muted-foreground">{answer}</p>
    </motion.div>
  );
};

function Support() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const supportOptions = [
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email Support",
      description: "Get in touch with our support team for personalized assistance with your questions or issues.",
      buttonText: "Contact Support",
      buttonLink: "mailto:support@rapiduix.com"
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Community Forum",
      description: "Join our community forum to connect with other developers, share ideas, and get help.",
      buttonText: "Join Forum",
      buttonLink: "#"
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Documentation",
      description: "Browse our comprehensive documentation for detailed guides, tutorials, and API references.",
      buttonText: "Read Docs",
      buttonLink: "#"
    },
    {
      icon: <FiHelpCircle className="w-6 h-6" />,
      title: "FAQs",
      description: "Find answers to commonly asked questions about our components, templates, and services.",
      buttonText: "View FAQs",
      buttonLink: "#faqs"
    }
  ];
  
  const faqs = [
    {
      question: "What is RapidUIX?",
      answer: "RapidUIX is a platform offering pre-built UI components and full app templates for React Native and Flutter, helping developers build apps faster."
    },
    {
      question: "Is RapidUIX free to use?",
      answer: "Yes! We offer free UI components, while premium templates are available for purchase."
    },
    {
      question: "Can I customize the UI components?",
      answer: "Absolutely! All our components are fully customizable with flexible styling and structure."
    },
    {
      question: "Do I need coding experience to use RapidUIX?",
      answer: "Yes, you'll need basic knowledge of React Native or Flutter to integrate the templates into your app."
    },
    {
      question: "Does RapidUIX support dark mode?",
      answer: "Yes! Our components come with dark and light themes, ensuring a seamless experience."
    },
    {
      question: "How do I integrate a UI component into my app?",
      answer: "Simply copy the code, customize it if needed, and paste it into your project—it's that easy!"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and Stripe for purchasing premium templates."
    },
    {
      question: "Do you provide customer support?",
      answer: "Yes! Our Pro & Enterprise users get priority support for troubleshooting and queries."
    }
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
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Help &</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Support</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              We're here to help you get the most out of RapidUIX. Find the support option that works best for you.
            </p>
          </motion.div>
          
          <div ref={sectionRef} className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {supportOptions.map((option, index) => (
                <SupportCard
                  key={index}
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  buttonText={option.buttonText}
                  buttonLink={option.buttonLink}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div id="faqs" className="max-w-4xl mx-auto mb-24">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Frequently Asked</span>{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Questions</span>
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about RapidUIX
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative bg-background/30 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />
              
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you couldn't find the answer to your question, please don't hesitate to reach out to our support team. We're here to help!
              </p>
              
              <a 
                href="mailto:support@rapiduix.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-colors"
              >
                <FiMail className="w-5 h-5" />
                Contact Support
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Support;