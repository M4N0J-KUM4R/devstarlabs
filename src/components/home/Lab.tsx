import ThemeSection from "@/components/system/ThemeSection";
import DisplayWordmark from "@/components/system/DisplayWordmark";
import Doodle from "@/components/system/Doodle";

/** The Lab — mentorship & hands-on learning culture (ink sheet). */
export default function Lab() {
  return (
    <ThemeSection theme="dark" motion="sweep" contentClassName="overflow-hidden pb-24 pt-28">
      <DisplayWordmark size="lg" align="right" className="max-md:!text-[clamp(40px,9.5vw,90px)]">
        The Lab
      </DisplayWordmark>

      <div className="ed mt-14 items-start">
        <div className="relative">
          {/* tilted "lab console" card drawn in CSS */}
          <div
            className="w-[min(80vw,420px)] frame-line p-6"
            style={{
              background: "rgba(var(--c-paper-rgb),0.05)",
              border: "1px solid var(--t-line)",
              transform: "rotate(-2.5deg)",
              color: "var(--t-text)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="label opacity-60">Lab cluster · live</span>
              <span
                className="h-2.5 w-2.5"
                style={{ background: "var(--c-orange)", animation: "loader-blink 1.6s infinite" }}
              />
            </div>
            <div className="mt-5 space-y-2 font-mono text-xs leading-5 opacity-80">
              <p>$ kubectl get pods -n training</p>
              <p><span style={{ color: "var(--c-orange)" }}>cka-lab-7f9d</span> 1/1 Running</p>
              <p><span style={{ color: "var(--c-orange)" }}>tf-drill-2a41</span> 1/1 Running</p>
              <p><span style={{ color: "var(--c-orange)" }}>rag-eval-b8c3</span> 1/1 Running</p>
              <p>$ aws sts get-caller-identity ▊</p>
            </div>
            <div className="mt-6 flex gap-2">
              {["AWS", "K8s", "Terraform", "LLM"].map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 text-[10px] font-bold uppercase"
                  style={{ background: "rgba(var(--c-orange-rgb),0.15)", color: "var(--c-orange)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <Doodle
            name="star"
            className="absolute -right-8 -top-8 w-12 text-[var(--c-orange)]"
            rotate={14}
          />
        </div>

        <div>
          <p className="text-lg md:text-xl">
            Every service engagement runs through{" "}
            <span className="underline-hand">The Lab</span> — our internal
            training ground. Junior engineers pair with seniors on real
            client work; clients get fresh eyes, students get production
            scar tissue.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              "Mentor-led cohorts capped at 12 people",
              "Personal lab clusters — break them, fix them, learn",
              "Exam simulations with the same tooling as the real test",
              "Career support: portfolio reviews and mock interviews",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[var(--t-text)]">
                <span className="text-[var(--c-orange)]">★</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ThemeSection>
  );
}
