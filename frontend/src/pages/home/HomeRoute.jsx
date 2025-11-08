import React from "react";
import HomeHeroSection from "./HomeHeroSection";
import Navbar from "../navbar/navbar";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import Footer from "../footer/Footer";


const HomeRoute = () => {
    return (
        <>
            <Navbar/>
            <HomeHeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <FAQSection />
            <Footer />
        </>
    )
}

export default HomeRoute;
