
import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  avatar 
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

export default Testimonial;
