import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import TestCategories from "@/components/sections/TestCategories";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import Cta from "@/components/sections/Cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <TestCategories />
      <Stats />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  );
}