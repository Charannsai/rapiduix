import FuturisticBackground from '../components/FuturisticBackground';
import HeroSection from '../components/HeroSection';
import MobileShowcase from '../components/MobileShowcase';
import FeaturesSection from '../components/FeaturesSection';
import ComponentsShowcase from '../components/ComponentsShowcase';
import HowItWorks from '../components/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="relative">
      <FuturisticBackground />
      <HeroSection />
      <MobileShowcase />
      <FeaturesSection />
      <ComponentsShowcase />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Home;