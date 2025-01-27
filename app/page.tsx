import Hero from "./components/Hero"
import Activities from "./components/Activities"
import GetInvolved from "./components/GetInvolved"
import PageTransition from "./components/PageTransition"

export default function Home() {
  return (
    <>
      <PageTransition />
      <Hero />
      <section id="activities" className="py-20">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-5xl font-bold text-center mb-4">Activities</h2> */}
          <Activities />
        </div>
      </section>
      <GetInvolved />
    </>
  )
}

