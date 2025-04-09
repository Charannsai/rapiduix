import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiCode, FiEye, FiLock } from 'react-icons/fi';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import { fetchTemplates, loadRazorpay } from '../utils/templates';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await fetchTemplates();
        setTemplates(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading templates:', err);
        setError('Failed to load templates');
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  useEffect(() => {
    if (previewOpen) {
      setPreviewLoading(true);
      const timer = setTimeout(() => {
        setPreviewLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [previewOpen]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  const handlePayment = async (template) => {
    try {
      const razorpay = await loadRazorpay();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: parseFloat(template.price) * 100, // Convert to smallest currency unit
        currency: "USD",
        name: "RapidUIX Pro",
        description: `Purchase ${template.title} Template`,
        handler: function (response) {
          // Handle successful payment
          navigate('/templates/success', { 
            state: { 
              paymentId: response.razorpay_payment_id,
              template: template 
            }
          });
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#0EA5E9"
        }
      };

      const paymentObject = new razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div 
          className="relative w-12 h-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
          <div className="absolute inset-2 rounded-full border-2 border-cyan-500/40 border-t-cyan-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive">{error}</div>
      </div>
    );
  }

  if (templates.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">No templates available</div>
      </div>
    );
  }

  const activeTemplate = templates[activeIndex];
  const previousTemplate = templates[activeIndex === 0 ? templates.length - 1 : activeIndex - 1];
  const nextTemplate = templates[activeIndex === templates.length - 1 ? 0 : activeIndex + 1];

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">RapidUIX</span>{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Pro</span>
          </h1>
          
          <p className="text-xl text-muted-foreground">
            Premium templates to kickstart your next mobile app
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-colors"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/50 backdrop-blur-sm border border-border hover:bg-background/80 transition-colors"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* Templates Display */}
          <div className="flex items-center justify-center gap-8">
            {/* Previous Template (Dimmed) */}
            <motion.div
              key={`prev-${previousTemplate.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              className="hidden md:block"
            >
              <div className="w-72 bg-background/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <div className="aspect-video bg-gray-900" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{previousTemplate.title}</h3>
                </div>
              </div>
            </motion.div>

            {/* Active Template */}
            <motion.div
              key={`active-${activeTemplate.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-96"
            >
              <div className="bg-background/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <div className="aspect-video bg-gray-900" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{activeTemplate.title}</h3>
                  <p className="text-muted-foreground mb-4">{activeTemplate.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">{activeTemplate.price}</span>
                    <div className="flex gap-3">
                      <Dialog.Root open={previewOpen} onOpenChange={setPreviewOpen}>
                        <Dialog.Trigger asChild>
                          <button className="p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <FiEye className="w-5 h-5" />
                          </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-background rounded-xl shadow-xl p-6">
                            <div className="aspect-video w-full mb-4">
                              {previewLoading ? (
                                <div className="w-full h-full flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
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
                                <iframe
                                  src={activeTemplate.preview_link}
                                  className="w-full h-full rounded-lg"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                                  style={{
                                    clipPath: 'inset(9% 0 5.8% 89.5%)',    
                                    position: 'absolute',
                                    top: -20,
                                    left: '-235%', 
                                    right:'100%',
                                    width: '300%', 
                                    height: '100%',
                                    transformOrigin: 'center right'
                                  }}
                                />
                              )}
                            </div>
                            <Dialog.Close className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted">
                              ×
                            </Dialog.Close>
                          </Dialog.Content>
                        </Dialog.Portal>
                      </Dialog.Root>
                      <button
                        onClick={() => handlePayment(activeTemplate)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <FiLock className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Next Template (Dimmed) */}
            <motion.div
              key={`next-${nextTemplate.id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 0.8 }}
              className="hidden md:block"
            >
              <div className="w-72 bg-background/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
                <div className="aspect-video bg-gray-900" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{nextTemplate.title}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Templates;