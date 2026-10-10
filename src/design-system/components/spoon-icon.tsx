import type { SVGProps } from "react";

/** Simple spoon mark for the Spoonful brand. */
export function SpoonIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse
        cx="8.2"
        cy="8"
        rx="4.4"
        ry="5.4"
        transform="rotate(-38 8.2 8)"
        fill="currentColor"
      />
      <path
        d="M11.2 11.6 19.4 19.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}