
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isVisible: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVisible }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
      <div 
        className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="inline-block mb-6">
          <div className="flex items-center rounded-full bg-brand-50 px-3 py-1 text-sm leading-6 text-brand-700 ring-1 ring-inset ring-brand-600/20">
            <span>Announcing our new API integration</span>
            <a href="#" className="ml-2 font-semibold text-brand-600">
              <span className="absolute inset-0" aria-hidden="true"></span>
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Effortless Content Moderation for Modern Platforms
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
          Protect your users with our powerful content moderation platform. Easily review, manage, and enforce content policies across images, videos, and comments with our intuitive interface.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/signup">
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 rounded-lg text-base">
              Get started
            </Button>
          </Link>
          <Link
            to="/features"
            className="text-base font-semibold leading-6 text-gray-900 flex items-center"
          >
            Learn more <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        </div>
        
        <div className="mt-16 relative">
          <div className="glass-panel rounded-xl overflow-hidden shadow-glass border-gray-200 aspect-[16/9]">
            <img
              src="https://placehold.co/1200x675?text=Dashboard+Preview"
              alt="Platform preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -top-6 -right-6 bg-white p-2 rounded-lg shadow-lg border border-gray-100 animate-pulse-slow hidden md:block">
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">AI-Powered Analysis</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-2 rounded-lg shadow-lg border border-gray-100 animate-pulse-slow hidden md:block" style={{ animationDelay: "1.5s" }}>
            <div className="flex items-center gap-2 px-3 py-2">
              <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
