import Image from "next/image"

export default function ImageGallery() {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Image Gallery</h2>
          <p className="text-lg sm:text-xl text-gray-600">Capturing moments that make a difference in our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-full rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=800&width=1200" alt="Gallery Image 1" fill className="object-cover" />
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-8">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Gallery Image 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Gallery Image 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

