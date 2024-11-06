'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download } from 'lucide-react';
import '../css/img.css'

export default function ImageUploadPopup({ isOpen, onClose, onImageProcessed, onProcessingStart }) {
    const [mainImage, setMainImage] = useState(null);
    const [watermarkImage, setWatermarkImage] = useState(null);
    const [alpha, setAlpha] = useState(0.1);

    const onMainImageDrop = useCallback((acceptedFiles) => {
        setMainImage(acceptedFiles[0]);
    }, []);

    const onWatermarkDrop = useCallback((acceptedFiles) => {
        setWatermarkImage(acceptedFiles[0]);
    }, []);

    const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } = useDropzone({
        onDrop: onMainImageDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    const { getRootProps: getWatermarkRootProps, getInputProps: getWatermarkInputProps } = useDropzone({
        onDrop: onWatermarkDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png']
        },
        maxFiles: 1
    });

    const handleSubmit = async () => {
        if (mainImage && watermarkImage) {
            try {
                onProcessingStart();
                onClose();
                
                const formData = new FormData();
                formData.append('main_image', mainImage);
                formData.append('watermark_image', watermarkImage);
                formData.append('alpha', alpha.toString());

                const response = await fetch('http://127.0.0.1:5000/embed_watermark', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    onImageProcessed(imageUrl, mainImage.name);
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.error);
                    alert(errorData.error || 'An error occurred while processing the images');
                }
            } catch (error) {
                console.error('Error uploading images:', error);
                alert('Failed to process images. Please try again.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bgblack br text-white p-8 rounded-lg w-[80%] max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Upload Images</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium">Main Image</label>
                        <div
                            {...getMainRootProps()}
                            className="rounded-lg br0 p-6 h-[20vh] flex justify-center items-center cursor-pointer hover:border-gray-400"
                        >
                            <input {...getMainInputProps()} />
                            <div className="text-center">
                                <p className="text-gray-600">
                                    {mainImage ? mainImage.name : "Drag 'n' drop an image here, or click to select"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Watermark Image</label>
                        <div
                            {...getWatermarkRootProps()}
                            className="rounded-lg br0 p-6 h-[20vh] flex justify-center items-center cursor-pointer hover:border-gray-400"
                        >
                            <input {...getWatermarkInputProps()} />
                            <div className="text-center">
                                <p className="text-gray-600">
                                    {watermarkImage ? watermarkImage.name : "Drag 'n' drop a watermark here, or click to select"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Watermark Strength (Alpha)</label>
                        <input
                            type="range"
                            min="0.1"
                            max="1"
                            step="0.1"
                            value={alpha}
                            onChange={(e) => setAlpha(parseFloat(e.target.value))}
                            className="w-full"
                        />
                        <span className="text-sm">{alpha}</span>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!mainImage || !watermarkImage}
                        className={`w-full py-2 px-4 rounded-lg ${
                            mainImage && watermarkImage
                                ? 'bg-black text-white hover:bg-gray-800'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
