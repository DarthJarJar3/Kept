import type { SVGProps } from "react";

/** Simple spoon mark for the Spoonful brand. */
export function SpoonIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Bowl */}
      <ellipse cx="8.2" cy="7.6" rx="4.6" ry="5.4" transform="rotate(-40 8.2 7.6)" />
      {/* Handle */}
      <path d="M11.2 12.1c.55-.5 1.42-.46 1.92.08l6.35 6.85a1.45 1.45 0 0 1-2.05 2.05l-6.85-6.35a1.35 1.35 0 0 1 .08-1.92c.16-.18.36-.3.55-.4z" />
    </svg>
  );
}
