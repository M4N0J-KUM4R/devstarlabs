import ThemeSection from "@/components/system/ThemeSection";
import Doodle from "@/components/system/Doodle";
import FillButton from "@/components/system/FillButton";
import StarSpin from "@/components/webgl/StarSpin";

export default function CtaSection() {
  return (
    <ThemeSection theme="orange" tilt className="overflow-hidden pb-20 pt-32">
      <div className="grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
        <div className="relative">
          <p className="display-hero max-md:!text-[clamp(72px,22vw,235px)] text-[var(--t-heading)]">
            LET&apos;S
            <br />
            BUILD
          </p>
          <p className="absolute -top-4 right-2 hidden -rotate-6 font-display text-5xl text-[var(--t-text)] md:block">
            ★ it
          </p>
          <p className="mt-8 max-w-md text-lg text-[var(--t-text)]">
            A product to ship, a cloud to tame, a team to upskill — start
            with a 30-minute call.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <FillButton href="/contact">Book a call</FillButton>
            <Doodle
              name="arrow"
              className="w-20 text-[var(--t-heading)]"
              rotate={18}
            />
          </div>
        </div>
        <StarSpin />
      </div>
    </ThemeSection>
  );
}
