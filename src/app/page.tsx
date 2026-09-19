import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import WhatWeDo from "@/components/home/WhatWeDo";
import Showcase from "@/components/home/Showcase";
import StatsBand from "@/components/home/StatsBand";
import Certifications from "@/components/home/Certifications";
import Testimonials from "@/components/home/Testimonials";
import Lab from "@/components/home/Lab";
import CtaSection from "@/components/home/CtaSection";
import FixedJoinButton from "@/components/system/FixedJoinButton";

export const metadata: Metadata = {
  title: "DevStarLabs | Software Studio & Certification Training",
  description:
    "Build. Ship. Scale. Eight software disciplines and eleven hands-on certification tracks — one accountable lab.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDo />
      <Showcase />
      <StatsBand />
      <Certifications />
      <Testimonials />
      <Lab />
      <CtaSection />
      <FixedJoinButton />
    </>
  );
}
