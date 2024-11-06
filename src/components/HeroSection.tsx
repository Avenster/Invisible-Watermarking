import React from 'react';
import '../css/app.css'
import '../css/feature.css';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex flex-col items-center relative justify-center middle text-white p-4">
      {/* Main heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
      Invisible Watermarking for Images
      </h1>
      
      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mb-12">
      Protect your images effortlessly with our invisible watermarking tool. Our platform allows you to create{' '}
        <span className="text-white">secure, high-quality watermarked images</span>{' '}
        without affecting their visual appeal.
      </p>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors">
          Get Started
        </button>
        <button className="px-6 py-2 bg-transparent border border-gray-600 rounded-lg font-medium hover:border-gray-400 transition-colors">
          Learn More
        </button>
      </div>
      
      {/* Command line */}
      <div className="bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm">
        
        <span className="text-gray-300">Explore how easy it is to add invisible watermarks to your images!</span>
      </div>
    </div>

  );
};

export default HeroSection;