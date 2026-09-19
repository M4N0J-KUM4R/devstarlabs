/* Devstarlabs flower mark — eight petals around a white star core.
   Gradients use userSpaceOnUse coordinates centered on the flower
   (0,0), so the transform on each petal keeps its gradient aligned.
   Gradient ids are prefixed per instance: header and footer render
   this mark on the same page and ids must stay unique per document. */
export default function LogoMark({
  className,
  idPrefix = "lm",
}: {
  className?: string;
  idPrefix?: string;
}) {
  const axis = `${idPrefix}-gAxis`;
  const diag = `${idPrefix}-gDiag`;
  const star = `${idPrefix}-gStar`;
  const axisPetal =
    "M0,-496 A405.5,405.5 0 0 1 0,154 A405.5,405.5 0 0 1 0,-496 Z";
  const diagPetal =
    "M0,-500 A356.1,356.1 0 0 1 0,75 A356.1,356.1 0 0 1 0,-500 Z";
  return (
    <svg
      viewBox="118 125 1014 1000"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={axis} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="500">
          <stop offset="0" stopColor="#F0500F" />
          <stop offset="0.3" stopColor="#F0500F" />
          <stop offset="0.44" stopColor="#F15413" />
          <stop offset="0.55" stopColor="#F6753A" />
          <stop offset="0.67" stopColor="#F98E56" />
          <stop offset="0.79" stopColor="#FDA36E" />
          <stop offset="0.94" stopColor="#FFB27F" />
          <stop offset="1" stopColor="#FFB27F" />
        </radialGradient>
        <radialGradient id={diag} gradientUnits="userSpaceOnUse" cx="0" cy="0" r="500">
          <stop offset="0" stopColor="#F0500F" />
          <stop offset="0.36" stopColor="#F0500F" />
          <stop offset="0.48" stopColor="#F68D58" />
          <stop offset="0.6" stopColor="#F9A778" />
          <stop offset="0.72" stopColor="#FCBF95" />
          <stop offset="0.84" stopColor="#FED2AA" />
          <stop offset="0.96" stopColor="#FFDDB8" />
          <stop offset="1" stopColor="#FFDDB8" />
        </radialGradient>
        <radialGradient id={star} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFFEFD" />
          <stop offset="0.6" stopColor="#FFFCF8" />
          <stop offset="1" stopColor="#FFEEE3" />
        </radialGradient>
      </defs>
      <g id={`${idPrefix}-mark`}>
        {[0, 90, 180, 270].map((r) => (
          <path
            key={`a${r}`}
            d={axisPetal}
            fill="#fff"
            transform={`translate(625,633) rotate(${r})`}
          />
        ))}
        {[-49.5, 49.5, 130.5, -130.5].map((r) => (
          <path
            key={`d${r}`}
            d={diagPetal}
            fill="#fff"
            transform={`translate(625,633) rotate(${r})`}
          />
        ))}
        {[-49.5, 49.5, 130.5, -130.5].map((r) => (
          <path
            key={`dg${r}`}
            d={diagPetal}
            fill={`url(#${diag})`}
            opacity="0.72"
            transform={`translate(625,633) rotate(${r})`}
          />
        ))}
        {[0, 90, 180, 270].map((r) => (
          <path
            key={`ag${r}`}
            d={axisPetal}
            fill={`url(#${axis})`}
            opacity="0.72"
            transform={`translate(625,633) rotate(${r})`}
          />
        ))}
        <path
          d="M625,476 A157,157 0 0 0 782,633 A157,157 0 0 0 625,790 A157,157 0 0 0 468,633 A157,157 0 0 0 625,476 Z"
          fill={`url(#${star})`}
        />
      </g>
    </svg>
  );
}
