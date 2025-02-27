"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPublicImageUrl, listImagesInBucket } from "@/lib/supabaseClient";

export default function ImageGallery() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      try {
        const images = await listImagesInBucket("gallery");
        if (images.length > 0) {
          const urls = images.map((file) => getPublicImageUrl("gallery", file));
          setImageUrls(urls);
        } else {
          setImageUrls(["/placeholder.svg"]); // Fallback if no images found
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImageUrls(["/placeholder.svg"]); // Fallback in case of error
      }
    }
    fetchImages();
  }, []);

  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Image Gallery</h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Capturing moments that make a difference in our community.
          </p>
        </div>

        {/* Dynamic Image Collage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {imageUrls.length > 0 && (
            <>
              <div className="md:col-span-7">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-full rounded-lg overflow-hidden">
                  <Image
                    src={imageUrls[0] || "/placeholder.svg"}
                    alt="Gallery Image 1"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-8">
                {imageUrls.slice(1, 3).map((url, index) => (
                  <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={url}
                      alt={`Gallery Image ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
