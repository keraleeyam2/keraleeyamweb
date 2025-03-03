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
              <h2 className="text-4xl mb-4">Donations</h2>
              <p className="text-xl text-gray-600 text-justify">
              Our association is proud to have donated to a school in Wayanad that was severely affected by the recent floods. Through this contribution, we aim to support the rebuilding of infrastructure and provide essential resources for students, helping them get back to their education and regain a sense of normalcy. We are committed to making a positive impact in the lives of those affected by this disaster.
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
              <h2 className="text-4xl mb-4">Food Aid</h2>
              <p className="text-xl text-gray-600 text-justify">
              Every year, during the months of September and October, our association proudly donates food to those in need, supporting families and communities during this crucial time. This initiative is part of our ongoing commitment to fighting hunger and ensuring that no one goes without a meal. By providing essential food supplies, we aim to bring comfort and relief to those facing challenging circumstances, helping to make a difference in their lives.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Events Section */}
        <section id="cultural-events" className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl mb-4">Cultural Events</h2>
              <p className="text-xl text-gray-600 text-justify">
              Our association proudly celebrates Onam and Vishu, embracing the rich cultural traditions of our community, and honors Republic Day with patriotic spirit. These celebrations reflect our commitment to unity, culture, and national pride, bringing together members to share joy, traditions, and values that strengthen our bonds.
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