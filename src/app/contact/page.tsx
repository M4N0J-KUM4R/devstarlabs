import type { Metadata } from "next";
import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project, enroll in a training track, or book a 20-minute skill consult with DevStarLabs.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <ThemeSection theme="orange" className="overflow-hidden pb-16 pt-32 md:pt-40">
        <h1 className="display-hero max-md:!text-[clamp(56px,16vw,235px)] text-[var(--t-heading)]">
          Contact
        </h1>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-md text-lg text-[var(--t-text)]">
            Tell us what you&apos;re building or what you want to certify.
            A human replies within one business day.
          </p>
          <Doodle name="star" className="w-14 text-[var(--t-heading)]" rotate={15} />
        </div>
      </ThemeSection>

      <ThemeSection theme="light" tilt className="pb-24 pt-20">
        <div className="ed gap-16">
          <ContactForm />

          <aside className="space-y-10">
            <div>
              <h2 className="label mb-4 text-[var(--t-muted)]">Direct</h2>
              <a
                href="mailto:hello@devstarlabs.dev"
                className="text-xl underline-hand"
              >
                hello@devstarlabs.dev
              </a>
            </div>
            <div>
              <h2 className="label mb-4 text-[var(--t-muted)]">Working hours</h2>
              <p className="text-[15px] leading-7">
                Mon–Fri, 09:00–18:00 IST
                <br />
                Support SLAs follow the sun.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: "var(--c-ink)", color: "var(--c-paper)" }}>
              <p className="label text-[var(--c-orange)]">Fast path</p>
              <p className="mt-3 text-sm opacity-80">
                Book a <span className="font-bold text-white">20-minute skill consult</span> —
                we map your experience to the right certification track, free.
              </p>
            </div>
          </aside>
        </div>
      </ThemeSection>
    </>
  );
}
