
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  isVisible: boolean;
}

const CTASection: React.FC<CTASectionProps> = ({ isVisible }) => {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-8">
      <div 
        className={`max-w-5xl mx-auto bg-brand-600 rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="px-8 py-16 sm:p-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Ready to transform your content moderation?
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-brand-50">
              Sign up today and experience the difference our platform can make.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <div className="sm:flex">
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/signup">
                  <Button className="w-full bg-white text-brand-600 hover:bg-brand-50 border border-transparent py-6 text-base">
                    Get started now
                  </Button>
                </Link>
              </div>
            </div>
            <p className="mt-3 text-sm text-brand-100 text-center">
              No credit card required. Start your free 14-day trial today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
