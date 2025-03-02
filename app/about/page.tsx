import Image from "next/image";
import TeamSection from "../components/TeamSection";
import { getPublicImageUrl } from "../../lib/supabaseClient";

const imageUrl = "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/about-us//about-us.jpg"; 

export default function AboutUs() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-15">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center mb-16">About Us</h1>
        <div className="mb-8">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="About Keraleeyam"
              fill
              className="object-cover"
              priority
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
        <div className="w-full max-w-none text-left">
          <p className="text-base sm:text-lg mb-6">
            Keraleeyam is a community-driven initiative that aims to celebrate and promote the rich culture and heritage
            of Kerala. Our mission is to bring people together through various activities and events that showcase the
            best of Kerala's traditions, cuisine, and arts.
          </p>
          <p className="text-base sm:text-lg mb-6">
            Founded in 2023, we have been working tirelessly to create meaningful experiences for our community members
            and visitors alike. Through our blood donation drives, food truck initiatives, and cultural events, we
            strive to make a positive impact on society while preserving and sharing our cultural identity.
          </p>
          <p className="text-base sm:text-lg mb-12">
            Join us in our journey to create a vibrant, compassionate, and culturally rich community. Together, we can
            make a difference and keep the spirit of Kerala alive in our hearts and actions.
          </p>
        </div>
      </div>

      {/* <TeamSection /> */}
    </div>
  );
}
