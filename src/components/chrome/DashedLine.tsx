import { useId } from "react";

type Props = {
  direction?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Dashed technical line — reference L03 (`svg-dashed-line`).
 * SVG <pattern> of short strokes; color inherits currentColor so section
 * theme flips it (stroke tokens: --ck-stroke-light-subtle / dark).
 */
export function DashedLine({ direction = "horizontal", className }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const horizontal = direction === "horizontal";
  return (
    <svg
      className={className}
      width={horizontal ? "100%" : "2"}
      height={horizontal ? "2" : "100%"}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <pattern
        id={`dash-${id}`}
        width={horizontal ? "8" : "100%"}
        height={horizontal ? "100%" : "8"}
        patternUnits="userSpaceOnUse"
      >
        {horizontal ? (
          <line
            x1="0"
            y1="1"
            x2="4"
            y2="1"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <line
            x1="1"
            y1="0"
            x2="1"
            y2="4"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </pattern>
      <rect
        width={horizontal ? "100%" : "1"}
        height={horizontal ? "1" : "100%"}
        fill={`url(#dash-${id})`}
      />
    </svg>
  );
}
