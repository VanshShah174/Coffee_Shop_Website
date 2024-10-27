import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Menu from './Menu'
import Gallery from './Gallery'

const Home = () => {
  return (
    <div className="font-poppins bg-[#faf3e0] text-text-color leading-relaxed min-h-screen">
              <Header />
              <Hero/>
                <Menu />
                <Gallery/>
     </div>

  )
}

export default Home