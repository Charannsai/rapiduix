import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowLeft } from 'react-icons/fi';

function TemplateSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentId, template } = location.state || {};

  useEffect(() => {
    if (!paymentId || !template) {
      navigate('/templates');
    }
  }, [paymentId, template, navigate]);

  if (!paymentId || !template) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          
          <p className="text-muted-foreground mb-8">
            Thank you for purchasing {template.title}. Your payment ID is: {paymentId}
          </p>
          
          <div className="flex flex-col gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <FiDownload className="w-5 h-5" />
              Download Code
            </button>
            
            <button
              onClick={() => navigate('/templates')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back to Templates
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TemplateSuccess;