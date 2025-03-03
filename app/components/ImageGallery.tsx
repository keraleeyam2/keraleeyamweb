"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Importing icons

const imageUrls = [
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Class%20by%20Koshy%20Joseph.JPG",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Formation.jpeg",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Releif%20support%20to%20school-4.jpeg",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Republic%20Day%20lamp%20lighting.jpg",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Republic%20day.jpeg",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/gallery//Malayalam%20mission.JPG"
];

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative flex flex-col items-center">
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl mb-12">Image Gallery</h2>
      <p className="text-center mb-6 text-lg">Capturing moments that make a difference in our community.</p>

      {/* Image Display with Increased Size */}
      <div className="relative flex items-center justify-center w-[600px] h-[420px]">
        {/* Left Arrow - Plain Black */}
        <button
          onClick={prevImage}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2"
        >
          <ArrowLeft size={32} stroke="black" />
        </button>

        {/* Image */}
        <Image
          src={imageUrls[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          width={600} // Increased size
          height={420} // Increased size
          className="rounded-lg object-cover w-full h-full shadow-xl"
        />

        {/* Right Arrow - Plain Black */}
        <button
          onClick={nextImage}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2"
        >
          <ArrowRight size={32} stroke="black" />
        </button>
      </div>

      {/* Image Indicators */}
      <div className="flex mt-4 space-x-2">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
