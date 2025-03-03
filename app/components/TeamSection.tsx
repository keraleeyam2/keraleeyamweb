"use client";

import { useState } from "react";
import Image from "next/image";
import { Linkedin, Instagram, Globe } from "lucide-react";
import { getPublicImageUrl } from "@/lib/supabaseClient";

const teamMembers = [
  {
    name: "Dr. Jimmy Thomas",
    title: "President",
    description: "Experienced physician specializing in community health initiatives and blood donation programs.",
    // image: getPublicImageUrl("team", "Jimmy.jpg"),
    image: "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/team//Jimmy.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-jimmy-thomas-28ab551b",
      Instagram: "https://www.instagram.com/drjimmythomasmundackal",
      // website: "#",
    },
  },
  {
    name: "Harikrishnan Mangot",
    title: "Vice President",
    description: "Master chef with expertise in traditional Kerala cuisine, leading our food truck program.",
    // image: getPublicImageUrl("team", "Hari.jpeg"),
    image: "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/team//Hari.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-jimmy-thomas-28ab551b",
      // Instagram: "#",
    },
  },
  {
    name: "Rajesh Vettamthody",
    title: "Scretary",
    description: "Passionate about preserving and promoting Kerala's rich cultural heritage through various events.",
    // image: getPublicImageUrl("team", "Rajesh.jpeg"),
    image: "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/team//Rajesh.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-jimmy-thomas-28ab551b",
      // Instagram: "#",
      // website: "#",
    },
  },
  {
    name: "Jobin Augustine",
    title: "Treasurer",
    description: "Passionate about preserving and promoting Kerala's rich cultural heritage through various events.",
    // image: getPublicImageUrl("team", "Rajesh.jpeg"),
    image: "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/team//Jobin.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-jimmy-thomas-28ab551b",
      // Instagram: "#",
      // website: "#",
    },
  },
  {
    name: "Divya Catherine",
    title: "Joint Treasurer",
    description: "Passionate about preserving and promoting Kerala's rich cultural heritage through various events.",
    // image: getPublicImageUrl("team", "Rajesh.jpeg"),
    image: "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/team//Divya.jpeg",
    social: {
      linkedin: "https://www.linkedin.com/in/dr-jimmy-thomas-28ab551b",
      // Instagram: "#",
      // website: "#",
    },
  },
];

export default function TeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 4) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 4 + teamMembers.length) % teamMembers.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-none px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font mb-4">Our team</h2>
        <p className="text-lg text-gray-600 mb-16">Meet the amazing people behind our initiatives.</p>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.slice(currentSlide, currentSlide + 4).map((member, index) => (
              <div key={index} className="transition-opacity duration-300">
                <div className="mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden relative bg-gray-100 mx-auto">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{member.title}</p>
                  {/* <p className="text-sm text-gray-600 mb-4">{member.description}</p> */}
                  <div className="flex gap-4 justify-center">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-600 hover:text-gray-900">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.Instagram && (
                      <a href={member.social.Instagram} className="text-gray-600 hover:text-gray-900">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {member.social.website && (
                      <a href={member.social.website} className="text-gray-600 hover:text-gray-900">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-between items-center px-1">
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(teamMembers.length / 4) }, (_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentSlide / 4) === i ? "bg-gray-900" : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentSlide(i * 4)}
                />
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                &#9665;
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                &#9655;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
