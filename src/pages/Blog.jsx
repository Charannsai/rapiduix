import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiUser, FiArrowRight } from 'react-icons/fi';
import Footer from '../components/Footer';
import { fetchBlogPosts } from '../utils/github';

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-background/30 backdrop-blur-sm border border-white/10 h-full transition-all duration-300 group-hover:translate-y-[-4px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {post.coverImage && (
            <div className="aspect-video overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <div className="flex items-center mr-4">
                <FiCalendar className="mr-1 w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-1 w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
              {post.title}
            </h3>
            
            <p className="text-muted-foreground mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            
            <div className="flex items-center text-cyan-400 font-medium">
              Read More <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const blogPosts = await fetchBlogPosts();
        // Ensure blogPosts is an array before setting state
        setPosts(Array.isArray(blogPosts) ? blogPosts : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
        // Initialize posts as an empty array when there's an error
        setPosts([]);
      }
    };

    loadBlogPosts();
  }, []);

  // Make sure posts is always treated as an array before filtering
  const filteredPosts = Array.isArray(posts) 
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen">
      <div className="relative pt-24 pb-16 mb-12">
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
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">RapidUIX</span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Blog</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Insights, tutorials, and updates from the RapidUIX team
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background/30 backdrop-blur-sm border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-24">
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
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-3 text-center py-20">
                <p className="text-muted-foreground">No posts found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default Blog;