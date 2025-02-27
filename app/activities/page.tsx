import { useState, useEffect } from "react";
import Image from "next/image";
import ImageGallery from "../components/ImageGallery";
import { getPublicImageUrl } from "@/lib/supabaseClient";

export default function ActivitiesPage() {
  const [images, setImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchImages = async () => {
      const imageFiles = ["blood-donation.jpg", "food-truck.jpg", "cultural-events.jpg"];
      const fetchedImages: { [key: string]: string } = {};

      for (const file of imageFiles) {
        const url = await getPublicImageUrl("activities", file);
        fetchedImages[file] = url || "/placeholder.svg";
      }

      setImages(fetchedImages);
    };

    fetchImages();
  }, []);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="pt-16 pb-32">
          <h1 className="text-5xl font-bold text-center mb-20">Our Activities</h1>

          {/* Blood Donation Section */}
          <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-5 flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-6">Blood Donation</h2>
                <p className="text-xl text-gray-600">
                  Blood donation is a vital community service that saves lives. Our blood donation drives aim to
                  increase awareness and encourage regular donations from healthy individuals.
                </p>
              </div>
              <div className="md:col-span-7 relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={images["blood-donation.jpg"] || "/placeholder.svg"}
                  alt="Blood Donation"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Food Truck Section */}
          <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-7 relative aspect-[16/9] rounded-lg overflow-hidden order-2 md:order-1">
                <Image
                  src={images["food-truck.jpg"] || "/placeholder.svg"}
                  alt="Food Truck"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-5 flex flex-col justify-center order-1 md:order-2">
                <h2 className="text-4xl font-bold mb-6">Food Truck</h2>
                <p className="text-xl text-gray-600">
                  Our Food Truck initiative brings delicious, locally-sourced meals to various locations in the
                  community. We aim to promote local cuisine and provide convenient, quality food options.
                </p>
              </div>
            </div>
          </section>

          {/* Cultural Events Section */}
          <section className="mb-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-5 flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-6">Cultural Events</h2>
                <p className="text-xl text-gray-600">
                  Our Cultural Events showcase the rich heritage and traditions of Kerala. From music and dance
                  performances to art exhibitions, these events offer a vibrant celebration of our culture.
                </p>
              </div>
              <div className="md:col-span-7 relative aspect-[16/9] rounded-lg overflow-hidden">
                <Image
                  src={images["cultural-events.jpg"] || "/placeholder.svg"}
                  alt="Cultural Events"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <ImageGallery />
        </div>
      </div>
    </div>
  );
}
