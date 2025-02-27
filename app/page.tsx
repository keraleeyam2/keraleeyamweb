import Hero from "./components/Hero"
import Activities from "./components/Activities"
import GetInvolved from "./components/GetInvolved"
import PageTransition from "./components/PageTransition"
import Partners from "./components/Partners"

export default function Home() {
  return (
    <>
      <PageTransition />
      <Hero />
      <Activities />
      <GetInvolved />
      <Partners />
    </>
  )
}

