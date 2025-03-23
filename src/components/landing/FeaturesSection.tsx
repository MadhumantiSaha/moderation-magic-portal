
import React from "react";
import FeatureCard from "./FeatureCard";
import { Shield, CheckCircle, LineChart, Code, Zap, Clock } from "lucide-react";

interface FeaturesSectionProps {
  isVisible: boolean;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div 
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Comprehensive Moderation Tools
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Our platform provides everything you need to keep your content safe and compliant.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Shield className="h-6 w-6" />}
          title="Content Review"
          description="Efficiently review images, videos, and comments with our intuitive interface."
        />
        <FeatureCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Policy Management"
          description="Create and enforce content policies tailored to your community standards."
        />
        <FeatureCard
          icon={<LineChart className="h-6 w-6" />}
          title="Analytics Dashboard"
          description="Get insights into moderation trends and content distribution."
        />
        <FeatureCard
          icon={<Code className="h-6 w-6" />}
          title="API Integration"
          description="Seamlessly integrate with your existing platform through our robust API."
        />
        <FeatureCard
          icon={<Zap className="h-6 w-6" />}
          title="Automated Filtering"
          description="Leverage AI to automatically filter out problematic content."
        />
        <FeatureCard
          icon={<Clock className="h-6 w-6" />}
          title="Moderation History"
          description="Keep comprehensive records of all moderation actions and decisions."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
