import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background -z-10 " />
      
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                RapidUIX
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6">
              Premium React Native & Flutter UI Templates for building beautiful cross-platform apps
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/components" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  UI Components
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  App Templates
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Docs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} RapidUIX. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;