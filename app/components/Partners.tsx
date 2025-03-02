"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Hardcoded partner logos
const partnerLogos = [
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/sponsors//bhima.png",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/sponsors//prestige.png",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/sponsors//honda.jpeg",
  "https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/sponsors//justbake.png",
  // "https://example.com/logo5.png",
  // "https://example.com/logo6.png",
];

export default function Partners() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollerInnerRef = useRef<HTMLDivElement>(null);

  // Set up the infinite scroll effect
  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current || partnerLogos.length === 0) return;

    const scrollerContent = Array.from(scrollerInnerRef.current.children);

    // Clone items for the infinite scroll effect
    scrollerContent.slice(0, partnerLogos.length).forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerInnerRef.current) {
        scrollerInnerRef.current.appendChild(duplicatedItem);
      }
    });

    const scrollerInner = scrollerInnerRef.current;
    const scrollerWidth = scrollerInner.offsetWidth / 2; // Divide by 2 because we duplicated the content

    function checkScroll() {
      if (scrollerRef.current) {
        if (scrollerRef.current.scrollLeft >= scrollerWidth) {
          scrollerRef.current.scrollLeft -= scrollerWidth;
        } else if (scrollerRef.current.scrollLeft <= 0) {
          scrollerRef.current.scrollLeft += scrollerWidth;
        }
      }
    }

    if (scrollerRef.current) {
      scrollerRef.current.addEventListener("scroll", checkScroll);
    }

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <motion.div
      className="py-15 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl text-center sm:text-4xl md:text-5xl mb-12">Our Sponsors</h2>
      <div 
        ref={scrollerRef} 
        className="scroller" 
        style={{ 
          overflow: "auto hidden",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        <div 
          ref={scrollerInnerRef} 
          className="scroller__inner flex"
          style={{
            animation: partnerLogos.length > 3 ? "scroll 20s linear infinite" : "none"
          }}
        >
          {partnerLogos.map((logo, index) => (
            <div
              key={index}
              className="w-[150px] sm:w-[200px] h-20 mx-4 sm:mx-8 flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                width={100}
                height={50}
                style={{ width: "auto", height: "auto", maxWidth: "100%", maxHeight: "100%" }}
                className="object-contain opacity-100 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-50%));
          }
        }
        
        .scroller {
          mask: linear-gradient(
            90deg,
            transparent,
            white 20%,
            white 80%,
            transparent
          );
        }
        
        .scroller[data-animated="true"] .scroller__inner {
          width: max-content;
          flex-wrap: nowrap;
        }
        
        .scroller::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
