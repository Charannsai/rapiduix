import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FiX, FiCopy, FiCheck } from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PreviewRenderer from './PreviewRenderer';
import { motion, AnimatePresence } from 'framer-motion';

function CodePreview({ component, onClose }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (component.error) {
    return (
      <Dialog.Root open={true} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-background/80 backdrop-blur-md rounded-2xl shadow-xl p-6">
            <div className="text-red-500 mb-4">
              {component.error}
            </div>
            <Dialog.Close asChild>
              <button className="w-full px-4 py-2 bg-b