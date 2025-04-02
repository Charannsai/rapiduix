import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import Footer from '../components/Footer';
import { fetchBlogPostContent } from '../utils/github';

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        const postContent = await fetchBlogPostContent(slug);
        console.log("Fetched Post:", postContent);
        setPost(postContent);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post. Please try again later.");
        setLoading(false);
      }
    };

    loadBlogPost();
  }, [slug]);


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
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-2 border-cyan-500/40 border-t-cyan-500 animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500">{error}</p>
              <Link to="/blog" className="inline-flex items-center text-cyan-400 mt-4">
                <FiArrowLeft className="mr-2" /> Back to Blog
              </Link>
            </div>
          ) : post ? (
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-cyan-400 mb-8 hover:underline">
                <FiArrowLeft className="mr-2" /> Back to Blog
              </Link>
              
              {post.coverImage && (
                <div className="rounded-xl overflow-hidden mb-8">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center text-sm text-muted-foreground mb-8">
                <div className="flex items-center mr-4">
                  <FiCalendar className="mr-1 w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center">
                  <FiUser className="mr-1 w-4 h-4" />
                  <a href="https://linkedin.com/in/charannsai">{post.author}</a>
                </div>
              </div>
              
              <div 
                className="prose prose-invert prose-cyan max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          ) : (
            <div className="text-center py-20">
              <p>No post found</p>
              <Link to="/blog" className="inline-flex items-center text-cyan-400 mt-4">
                <FiArrowLeft className="mr-2" /> Back to Blog
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;