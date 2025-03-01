"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

interface Activity {
  title: string;
  image: string;
  link: string;
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const activityData = [
        { title: "Blood Donation", path: "blood-donation.jpg", link: "/activities#blood-donation" },
        { title: "Food Truck", path: "foodtruck.jpg", link: "/activities#food-truck" },
        { title: "Cultural Events", path: "cultural-events.jpg", link: "/activities#cultural-events" },
      ];

      const updatedActivities = await Promise.all(
        activityData.map(async (activity) => {
          const { data } = await supabase.storage
            .from("activity-images") // Replace with your bucket name
            .getPublicUrl(activity.path);

          return { ...activity, image: data.publicUrl };
        })
      );

      setActivities(updatedActivities);
    };

    fetchImages();
  }, []);

  return (
    <section id="activities" className="py-15">
      <div className="container px-4">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl text-center mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Activities
        </motion.h2>
        <motion.p
          className="text-lg sm:text-xl text-center text-gray-600 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Discover how we're making a difference in our community
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={activity.link}>
                <Card className="group overflow-hidden border-none shadow-none transition-all duration-300 hover:-translate-y-2">
                  <CardContent className="p-0 relative">
                    <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-6">
                        <h3 className="text-xl font-semibold text-white">{activity.title}</h3>
                      </div>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
