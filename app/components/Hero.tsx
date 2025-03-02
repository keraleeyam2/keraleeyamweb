"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionHeight, setSectionHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleResize = () => {
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.offsetHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const progress = Math.min(scrollY / (sectionHeight || 1), 1)
  const scale = Math.max(1 - progress * 0.2, 0.8)
  const borderRadius = `${Math.min(progress * 32, 32)}px`
  const opacity = Math.max(1 - progress, 0)

  return (
    <section id="hero" ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-white pb-[60px]">
      <div
        className="absolute inset-0 overflow-hidden transition-all duration-300 ease-out"
        style={{
          transform: `scale(${scale})`,
          borderRadius,
          opacity,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src="https://lfwraqlxvswwhdcwjuvz.supabase.co/storage/v1/object/public/hero//hero.png"
            alt="Keraleeyam Community Gathering"
            fill
            sizes="100vw"
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="container text-center px-4">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Keraleeyam
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where Culture Meets Compassion
          </motion.p>
        </div>
      </div>
    </section>
  )
}

