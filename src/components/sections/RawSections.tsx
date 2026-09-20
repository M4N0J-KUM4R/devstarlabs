import "./sections.css";
import {
  S2_HTML,
  S5_HTML,
  S3_HTML,
  S7_HTML,
  S10_HTML,
  FIXED_CTA_HTML,
} from "./rawSections";

/* The follow.art lower-page sections, injected verbatim (brand-swapped
   reference markup) inside their original Section/Sticky scaffold. The
   SectionsEngine client component drives the scroll choreography, the
   get-seen/nexus WebGL mounts and the fixed CTA for all of them.

   Overlap margins: the original stack pulls every next section up over
   the previous one's 100svh sticky reserve in two ways — .section--under-
   next reserves its own tail (margin-bottom:-100svh) while the repo's
   sweep sheets pull themselves up (margin-top:-100svh). At each raw↔sweep
   boundary exactly one mechanism must be active, so the wrappers here
   carry the margin where the raw side has to provide it. */

function Raw({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

/* S2 — CURATORS AND ARTISTS (get-seen): pulled up over the hero's pin
   range so its resting tilted edge sits exactly at the fold, like the
   reference's sheet stack. */
export function GetSeenSection() {
  return (
    <div style={{ marginTop: "-100svh" }}>
      <Raw html={S2_HTML} />
    </div>
  );
}

/* S5 — THE CARD (nexus loop carousel + WebGL). S2's under-next reserve
   already pulls this up one viewport. */
export function TheCardSection() {
  return <Raw html={S5_HTML} />;
}

/* S3 — AUDIENCE SUPPORT (loop-carousel marquee). */
export function AudienceSection() {
  return (
    <div style={{ marginTop: "-100svh" }}>
      <Raw html={S3_HTML} />
    </div>
  );
}

/* S7 — CONNECTORY. */
export function ConnectorySection() {
  return <Raw html={S7_HTML} />;
}

/* S10 — JOIN US (its embedded footer is stripped; the layout footer
   renders right after it, exactly like the reference's flow). */
export function JoinUsSection() {
  return <Raw html={S10_HTML} />;
}

/* The fixed bottom-right Join button (shows past .55 viewport heights). */
export function FixedSignupCta() {
  return <Raw html={FIXED_CTA_HTML} />;
}
