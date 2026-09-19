import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/system/SmoothScroll";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";

// The two faces follow.art runs — Hardbop Bold for display headings,
// HeadingNow 73 Book for body/UI text (self-hosted woff2 in /public/fonts).
const hardbop = localFont({
  src: "../../public/fonts/Hardbop-Bold.woff2",
  weight: "700",
  variable: "--font-hardbop",
  display: "swap",
});

const headingNow = localFont({
  src: "../../public/fonts/HeadingNow-73Book.woff2",
  weight: "400",
  variable: "--font-headingnow",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devstarlabs.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevStarLabs | Software Studio & Certification Training",
    template: "%s | DevStarLabs",
  },
  description:
    "DevStarLabs builds software and engineers: UI/UX, web & app development, cloud hosting, DevOps, SEO, AI solutions, digital marketing — plus hands-on certification training for AWS, Terraform, Kubernetes, Docker, and more.",
  keywords: [
    "DevStarLabs",
    "software agency",
    "UI UX design",
    "web development",
    "app development",
    "cloud hosting",
    "DevOps",
    "SEO optimization",
    "AI solutions",
    "digital marketing",
    "AWS training",
    "Terraform certification",
    "CKA training",
    "CKAD training",
    "Docker training",
    "full stack training",
    "generative AI course",
    "data engineering training",
    "machine learning training",
    "IoT training",
  ],
  openGraph: {
    type: "website",
    siteName: "DevStarLabs",
    url: SITE_URL,
    title: "DevStarLabs | Software Studio & Certification Training",
    description:
      "Build. Ship. Scale. Software services and hands-on certification training — from UI/UX and cloud to AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevStarLabs | Software Studio & Certification Training",
    description:
      "Build. Ship. Scale. Software services and hands-on certification training — from UI/UX and cloud to AI.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4793a",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DevStarLabs",
  url: SITE_URL,
  description:
    "Software services studio and certification training provider: UI/UX, web & app development, cloud hosting, DevOps, SEO, AI solutions, digital marketing, and hands-on certification training.",
  knowsAbout: [
    "UI/UX Design",
    "Web Development",
    "App Development",
    "Cloud Hosting",
    "DevOps",
    "SEO",
    "AI Solutions",
    "Digital Marketing",
    "AWS",
    "Terraform",
    "Kubernetes",
    "Docker",
    "Generative AI",
    "Data Engineering",
    "Machine Learning",
    "IoT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${hardbop.variable} ${headingNow.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
