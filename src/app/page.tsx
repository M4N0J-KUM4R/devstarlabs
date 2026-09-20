import type { Metadata } from "next";
import PageMotion from "@/components/system/PageMotion";
import HeroSection from "@/components/home/HeroSection";
import AboutStory from "@/components/home/AboutStory";
import WhatWeDo from "@/components/home/WhatWeDo";
import Centralize from "@/components/home/Centralize";
import StatsBand from "@/components/home/StatsBand";
import Certifications from "@/components/home/Certifications";
import Lab from "@/components/home/Lab";
import Testimonials from "@/components/home/Testimonials";
import CtaSection from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "DevStarLabs | Full-Stack Product Studio & AI Engineering Agency",
  description:
    "We engineer high-performance web platforms, mobile apps, managed cloud infrastructure, SEO growth architectures, and autonomous AI automation pipelines.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageMotion>
      <HeroSection />
      <AboutStory />
      <WhatWeDo />
      <Centralize />
      <StatsBand />
      <Certifications />
      <Lab />
      <Testimonials />
      <CtaSection />
    </PageMotion>
  );
}
