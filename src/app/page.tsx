import type { Metadata } from "next";
import PageMotion from "@/components/system/PageMotion";
import HeroSection from "@/components/home/HeroSection";
import Centralize from "@/components/home/Centralize";
import Testimonials from "@/components/home/Testimonials";
import SectionsEngine from "@/components/home/SectionsEngine";
import {
  GetSeenSection,
  TheCardSection,
  AudienceSection,
  ConnectorySection,
  JoinUsSection,
  FixedSignupCta,
} from "@/components/sections/RawSections";

export const metadata: Metadata = {
  title: "DevStarLabs | Full-Stack Product Studio & AI Engineering Agency",
  description:
    "We engineer high-performance web platforms, mobile apps, managed cloud infrastructure, SEO growth architectures, and autonomous AI automation pipelines.",
  alternates: { canonical: "/" },
};

/* The follow.art landing stack, in the reference's exact section order:
   intro (hero) -> S2 CURATORS AND ARTISTS -> S5 THE CARD ->
   S4 CENTRALIZE -> S3 AUDIENCE SUPPORT -> S9 TESTIMONIALS ->
   S7 CONNECTORY -> S10 JOIN US -> footer (layout). The SectionsEngine
   drives the raw sections' scroll choreography, WebGL mounts and the
   fixed Join CTA. */
export default function HomePage() {
  return (
    <PageMotion>
      <HeroSection />
      <GetSeenSection />
      <TheCardSection />
      <Centralize style={{ marginTop: 0 }} />
      <AudienceSection />
      <Testimonials />
      <ConnectorySection />
      <JoinUsSection />
      <FixedSignupCta />
      <SectionsEngine />
    </PageMotion>
  );
}
