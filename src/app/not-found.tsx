import Link from "next/link";
import Doodle from "@/components/system/Doodle";

export default function NotFound() {
  return (
    <section className="ui-orange sheet flex min-h-[100svh] flex-col items-start justify-center overflow-hidden">
      <p className="display-hero max-md:!text-[clamp(80px,24vw,235px)] text-[var(--t-heading)]">
        404
      </p>
      <p className="mt-4 max-w-md text-lg text-[var(--t-text)]">
        This page shipped to another cluster. Let&apos;s get you back to
        something that runs.
      </p>
      <div className="mt-8 flex items-center gap-8">
        <Link href="/" className="btn btn--pill">
          ← Home
        </Link>
        <Doodle name="star" className="w-10 text-[var(--t-heading)]" rotate={12} />
      </div>
    </section>
  );
}
