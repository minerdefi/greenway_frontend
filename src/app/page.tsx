import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import BlogSection from "@/components/sections/BlogSection";
import StatsSection from "@/components/sections/StatsSection";
import MapSection from "@/components/sections/MapSection";
import PartnersSection from "@/components/sections/PartnersSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { Footer } from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <BlogSection />
      <StatsSection />
      <MapSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}