import React from 'react'
import Features from './Features'
import Header from 'components/header/Header'
import Footer from 'components/footer/Footer'

import Hero from './Hero'
import SectionSignup from './SectionSignup'
function Home() {
    return (
        <>
             <Header />
                    <Hero />
                    <Features />
                    <SectionSignup />
                    <Footer />
        </>
    )
}

export default Home
