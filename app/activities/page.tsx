"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "../components/ImageGallery";
import { getPublicImageUrl } from "@/lib/supabaseClient";

export default function ActivitiesPage() {
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [activeSection, setActiveSection] = useState<string>("");

  // Function to fetch images
  const fetchImages = async () => {
    const imageFiles: Record<string, string> = {
      "blood-donation": "Donations.jpg",
      "food-truck": "FoodAid.jpg",
      "cultural-events": "cultural-events.jpg",
    };

    const fetchedImages: { [key: string]: string } = {};

    for (const key in imageFiles) {
      try {
        fetchedImages[key] = getPublicImageUrl("activity-images", imageFiles[key]);
      } catch (error) {
        console.error(`Error fetching image ${key}:`, error);
        fetchedImages[key] = "/placeholder.svg";
      }
    }

    setImages(fetchedImages);
  };

  // Fetch images on initial load
  useEffect(() => {
    fetchImages();
  }, []);

  // Listen for hash changes & update active section
  useEffect(() => {
    const updateActiveSection = () => {
      const newHash = window.location.hash.substring(1);
      setActiveSection(newHash);
    };

    window.addEventListener("hashchange", updateActiveSection);
    updateActiveSection();

    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-center mb-20">Our Activities</h1>

        {/* Blood Donation Section */}
        <section id="blood-donation" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-4">Blood Donation</h2>
              <p className="text-xl text-gray-600">
                Blood donation is a vital community service that saves lives. Our blood donation drives aim to
                increase awareness and encourage regular donations from healthy individuals.
              </p>
            </div>
            <div className="relative w-full h-80 rounded-md overflow-hidden">
              {images["blood-donation"] ? (
                <Image 
                  src={"https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/activity-images//Donations.jpg"} 
                  alt="Blood Donation" 
                  fill 
                  className="object-cover" 
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>
          </div>
        </section>

        {/* Food Truck Section */}
        <section id="food-truck" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-80 rounded-md overflow-hidden">
              {images["food-truck"] ? (
                <Image 
                  src={"https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/activity-images//FoodAid.jpg"} 
                  alt="Food Truck" 
                  fill 
                  className="object-cover" 
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-4xl mb-4">Food Truck</h2>
              <p className="text-xl text-gray-600">
                Our Food Truck initiative brings delicious, locally-sourced meals to various locations in the
                community. We aim to promote local cuisine and provide convenient, quality food options.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Events Section */}
        <section id="cultural-events" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-4">Cultural Events</h2>
              <p className="text-xl text-gray-600">
                Our Cultural Events showcase the rich heritage and traditions of Kerala. From music and dance
                performances to art exhibitions, these events offer a vibrant celebration of our culture.
              </p>
            </div>
            <div className="relative w-full h-80 rounded-md overflow-hidden">
              {images["cultural-events"] ? (
                <Image 
                  src={images["cultural-events"]} 
                  alt="Cultural Events" 
                  fill 
                  className="object-cover" 
                  style={{ borderRadius: "8px" }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <ImageGallery />
      </div>
    </div>
  );
}