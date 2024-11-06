'use client';
import { useState } from 'react';
import '../css/app.css';
import Image from "next/image";
import ImageUploadPopup from './ImageUploadPopup';
import { Download, ArrowLeft, Key } from 'lucide-react';

export default function Upload() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [originalImageName, setOriginalImageName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const templates = [
    {
      title: 'Next.js Commerce',
      description: 'An all-in-one starter kit for high-performance ecommerce sites.',
      image: "/images/imgs1.png"
    },
    {
      title: 'Image Gallery',
      description: 'An image gallery built with Next.js and Cloudinary.',
      image: "/images/imgs2.jpg"
    },
    {
      title: 'Next.js Boilerplate',
      description: 'A Next.js app and a Serverless Function API.',
      image: "/images/imgs3.jpg"
    },
  ];

  const handleImageProcessed = (imageUrl, originalName) => {
    setProcessedImage(imageUrl);
    setOriginalImageName(originalName);
    setIsProcessing(false);
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      const extension = originalImageName.split('.').pop() || 'jpg';
      link.download = `watermarked_${originalImageName.split('.')[0]}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleBack = () => {
    setProcessedImage(null);
    setOriginalImageName('');
  };

  const renderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-lg">Processing your image...</p>
          </div>
        </div>
      );
    }

    if (processedImage) {
      return (
        <div className="max-w-6xl mx-auto p-8 w-full">
          <div className="flex gap-8">
            {/* Left side - Image */}
            <div className="w-2/3">
              <div className="rounded-lg overflow-hidden">
                {/* <img src={processedImage} alt="Processed" className="w-full h-auto" /> */}
              </div>
            </div>

            {/* Right side - Buttons */}
            <div className="w-1/3 flex flex-col gap-4">
              <button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download Watermarked Image
              </button>

              <button 
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Key className="w-5 h-5" />
                Extract Watermark
              </button>

              <button 
                onClick={handleBack}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Upload
              </button>

              {/* Alpha value display */}
              <div className="mt-2 p-4 bg-gray-900 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Alpha Value</div>
                <div className="text-xl font-medium">0.5</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col lg:flex-row h-[100%] gap-[4vw]">
        <div className="flex flex-col justify-center items-start w-[50%] pt-2">  
        <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">
              Get started in seconds
            </h1>
          </div>

          <div className="mb-12">
            <p className="text-3 text-gray-400 mb-1">
              Our platform makes it quick and easy to add invisible watermarks to your images. With user-friendly tools and seamless integration, you can protect your content in no time.
            </p>
            <p className="text-3 text-gray-400 mb-9">
              Kickstart your watermarking journey with ready-to-use solutions from our platform and community.
            </p>

            <button 
              onClick={() => setIsPopupOpen(true)}
              className="inline-block bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Upload your Image ↗
            </button>
          </div>
        </div>

        <div className="w-[50%] h-[100%] relative flex justify-center items-center">
          <div className="flex items-center justify-end h-full w-full">
            <div className="relative h-full w-full max-w-[20vw] flex justify-end items-end">
              {templates.map((template, index) => (
                <div
                  key={template.title}
                  className={`absolute w-full max-w-[20vw] shadow-lg rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 h-[500px]
                    ${index === 0 ? 'n1' : ''}
                    ${index === 1 ? 'n2' : ''}
                    ${index === 2 ? 'n3' : ''}`}
                >
                  <div className="brx bg-black">
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={template.image}
                        alt={template.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                      <p className="text-gray-400">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white">
      <main className="flex justify-center items-center w-[95%] h-[70vh] mx-auto">
        {renderContent()}

        <ImageUploadPopup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)}
          onImageProcessed={handleImageProcessed}
          onProcessingStart={handleProcessingStart}
        />
      </main>
    </div>
  );
}