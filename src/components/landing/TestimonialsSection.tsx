
import React from "react";
import Testimonial from "./Testimonial";

interface TestimonialsSectionProps {
  isVisible: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isVisible }) => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto bg-gray-50">
      <div 
        className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Trusted by Content Teams
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Hear from the teams that rely on our platform every day.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Testimonial
          quote="The dashboard analytics have revolutionized how we approach content moderation, giving us insights we never had before."
          author="Sarah Johnson"
          role="Head of Community, SocialConnect"
          avatar="https://randomuser.me/api/portraits/women/1.jpg"
        />
        <Testimonial
          quote="We've reduced our moderation response time by 60% since implementing this platform. The automated filtering is incredibly accurate."
          author="Michael Chen"
          role="CTO, VideoShare"
          avatar="https://randomuser.me/api/portraits/men/2.jpg"
        />
        <Testimonial
          quote="The policy management tools have made it simple to enforce consistent standards across all our content channels."
          author="Aisha Williams"
          role="Content Operations, MediaGroup"
          avatar="https://randomuser.me/api/portraits/women/3.jpg"
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
