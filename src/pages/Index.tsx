
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import GradientBackground from "@/components/landing/GradientBackground";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    testimonials: false,
    cta: false,
  });

  useEffect(() => {
    // Trigger animations on component mount
    setIsVisible({
      hero: true,
      features: false,
      testimonials: false,
      cta: false,
    });

    // Trigger remaining animations after a delay
    const timer1 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, features: true }));
    }, 300);

    const timer2 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, testimonials: true }));
    }, 600);

    const timer3 = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, cta: true }));
    }, 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background */}
      <GradientBackground />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection isVisible={isVisible.hero} />

      {/* Features Section */}
      <FeaturesSection isVisible={isVisible.features} />

      {/* Testimonials Section */}
      <TestimonialsSection isVisible={isVisible.testimonials} />

      {/* CTA Section */}
      <CTASection isVisible={isVisible.cta} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
