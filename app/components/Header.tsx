"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLAnchorElement
      const elementId = target.getAttribute("href")?.slice(1)
      const element = document.getElementById(elementId || "")
      if (element) {
        const yOffset = -80
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        window.scrollTo({ top: y, behavior: "smooth" })
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener("click", handleScroll)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll)
      })
    }
  }, [])

  const scrollToHero = (e: React.MouseEvent) => {
    e.preventDefault()
    const heroSection = document.getElementById("hero")
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white text-gray-900 p-4 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-05%20at%2019.20%20Background%20Removed.01-CEpUezbR8u5K5qWgrZVOvc6kCBqsSM.png"
            alt="Keraleeyam Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-2xl ">Keraleeyam</span>
        </Link>
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          className={`${isMenuOpen ? "block" : "hidden"} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none flex justify-center`}
        >
          <ul className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            {pathname === "/" ? (
              <>
                <li>
                  <a href="#activities" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 block">
                    Activities
                  </a>
                </li>
                <li>
                  <a href="#get-involved" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 block">
                    Get Involved
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/#activities" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 block">
                    Activities
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#get-involved"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-600 block"
                  >
                    Get Involved
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-gray-600 block">
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}