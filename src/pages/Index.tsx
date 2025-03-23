
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { CheckCircle, Shield, LineChart, Zap, Code } from "lucide-react";

// Animated gradient backgrounds
const GradientBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-br from-brand-50 via-white to-blue-50 -z-10"></div>
      <div
        className="absolute top-[50%] -left-[50%] w-[100%] h-[500px] rounded-full bg-brand-100/30 blur-3xl animate-pulse-slow -z-10"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-[30%] -right-[25%] w-[50%] h-[300px] rounded-full bg-blue-100/30 blur-3xl animate-pulse-slow -z-10"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};

// Feature card component
const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="glass-panel p-6 rounded-xl hover:shadow-glass-hover transition-all duration-300 animate-slide-in">
      <div className="h-12 w-12 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ 
  quote, 
  author, 
  role, 
  avatar 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  avatar: string; 
}) => {
  return (
    <div className="glass-panel p-6 rounded-xl flex flex-col h-full">
      <p className="text-gray-600 italic mb-6">&ldquo;{quote}&rdquo;</p>
      <div className="mt-auto flex items-center">
        <img
          src={avatar}
          alt={author}
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

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
      <section className="pt-32 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out transform ${
            isVisible.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto bg-gray-50">
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out ${
            isVisible.testimonials ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 md:px-8">
        <div 
          className={`max-w-5xl mx-auto bg-brand-600 rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ease-out ${
            isVisible.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CM</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">ContentMod</span>
              </div>
              <p className="text-gray-500 text-base">
                Making the internet safer, one piece of content at a time.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Solutions
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Content Review
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Policy Management
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Analytics
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        API
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Documentation
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Guides
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        FAQs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Blog
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Press
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Terms
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Cookie Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Licenses
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2023 ContentMod, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export default Index;
