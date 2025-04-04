import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import * as Select from '@radix-ui/react-select';
import { FiCopy, FiCheck, FiChevronDown } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchComponentCode, fetchComponentDocs } from '../utils/github';
import PreviewRenderer from './PreviewRenderer';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-dart';

function ComponentView({ components }) {
  const { component: componentSlug } = useParams();
  const [activeComponent, setActiveComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('react-native');
  const [componentCode, setComponentCode] = useState('');
  const [componentDocs, setComponentDocs] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  useEffect(() => {
    const loadComponent = async () => {
      setLoading(true);
      try {
        const component = components.find(c => 
          (c.title || c.name).toLowerCase().replace(/\s+/g, '-') === componentSlug
        );
        
        if (component) {
          const [code, docs] = await Promise.all([
            fetchComponentCode(component.name, selectedFramework),
            fetchComponentDocs(component.name, selectedFramework)
          ]);
          
          setComponentCode(code);
          setComponentDocs(docs);
          setActiveComponent(component);
        } else {
          setError('Component not found');
        }
      } catch (err) {
        console.error('Error loading component:', err);
        setError('Failed to load component');
      } finally {
        setLoading(false);
      }
    };

    if (componentSlug && components.length > 0) {
      loadComponent();
    }
  }, [componentSlug, components, selectedFramework]);

  const handleFrameworkChange = async (framework) => {
    setCodeLoading(true);
    try {
      if (activeComponent) {
        const code = await fetchComponentCode(activeComponent.name, framework);
        setComponentCode(code);
        setSelectedFramework(framework);
      }
    } catch (err) {
      console.error('Error loading component code:', err);
      setError('Failed to load component code');
    } finally {
      setCodeLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
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

  if (error || !activeComponent) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-destructive">
          {error || 'Component not found'}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="p-6 border-b border-border">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl font-bold text-gradient"
        >
          {activeComponent.title || activeComponent.name}
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-invert max-w-none mt-4"
          dangerouslySetInnerHTML={{ __html: componentDocs }}
        />
      </div>

      <Tabs.Root defaultValue="preview" className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Tabs.List className="flex space-x-4">
            <Tabs.Trigger
              value="preview"
              className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors"
            >
              Preview
            </Tabs.Trigger>
            <Tabs.Trigger
              value="code"
              className="px-4 py-2 text-sm font-medium rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary transition-colors"
            >
              Code
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <Tabs.Content value="preview" className="rounded-lg overflow-hidden">
          <PreviewRenderer code={componentCode} />
        </Tabs.Content>

        <Tabs.Content value="code" className="rounded-lg">
          <div className="flex justify-end mb-4">
            <Select.Root value={selectedFramework} onValueChange={handleFrameworkChange}>
              <Select.Trigger className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium bg-background/50 border border-border rounded-lg hover:bg-background/80 transition-colors">
                <Select.Value />
                <Select.Icon>
                  <FiChevronDown className="ml-2" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-background border border-border rounded-lg shadow-lg">
                  <Select.Viewport>
                    <Select.Item value="react-native" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 outline-none">
                      <Select.ItemText>React Native</Select.ItemText>
                    </Select.Item>
                    <Select.Item value="flutter" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary/10 outline-none">
                      <Select.ItemText>Flutter</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="relative">
            <CopyToClipboard text={componentCode} onCopy={handleCopy}>
              <button className="absolute top-4 right-4 p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                {copied ? (
                  <FiCheck className="w-5 h-5" />
                ) : (
                  <FiCopy className="w-5 h-5" />
                )}
              </button>
            </CopyToClipboard>
            {codeLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <motion.div 
                  className="relative w-8 h-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-500" />
                </motion.div>
              </div>
            ) : (
              <pre className="p-4 bg-[#1a1a1a] rounded-lg overflow-auto">
                <code
                  className={`language-${selectedFramework === 'flutter' ? 'dart' : 'jsx'}`}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      componentCode,
                      selectedFramework === 'flutter' ? Prism.languages.dart : Prism.languages.jsx,
                      selectedFramework === 'flutter' ? 'dart' : 'jsx'
                    ),
                  }}
                />
              </pre>
            )}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </motion.div>
  );
}

export default ComponentView;