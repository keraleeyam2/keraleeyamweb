"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const partners = [
  { name: "Partner 1", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Partner 2", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Partner 3", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Partner 4", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Partner 5", logo: "/placeholder.svg?height=50&width=100" },
  { name: "Partner 6", logo: "/placeholder.svg?height=50&width=100" },
]

export default function Partners() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollerInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current) return

    const scrollerContent = Array.from(scrollerInnerRef.current.children)

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (scrollerInnerRef.current) {
        scrollerInnerRef.current.appendChild(duplicatedItem)
      }
    })

    const scrollerInner = scrollerInnerRef.current
    const scrollerWidth = scrollerInner.offsetWidth

    function checkScroll() {
      if (scrollerRef.current) {
        if (scrollerRef.current.scrollLeft >= scrollerWidth) {
          scrollerRef.current.scrollLeft -= scrollerWidth
        } else if (scrollerRef.current.scrollLeft <= 0) {
          scrollerRef.current.scrollLeft += scrollerWidth
        }
      }
    }

    if (scrollerRef.current) {
      scrollerRef.current.addEventListener("scroll", checkScroll)
    }

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener("scroll", checkScroll)
      }
    }
  }, [])

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller")

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation()
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true")
      })
    }
  }, [])

  return (
    <motion.div
      className="py-15 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl text-center mb-8">Our Partners</h2>
      <div ref={scrollerRef} className="scroller">
        <div ref={scrollerInnerRef} className="scroller__inner flex">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="w-[150px] sm:w-[200px] h-20 mx-4 sm:mx-8 flex-shrink-0 flex items-center justify-center"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={100}
                height={50}
                className="object-contain opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

