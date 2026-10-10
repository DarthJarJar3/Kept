import type { SVGProps } from "react";

/** Classic upright spoon for the Spoonful brand mark. */
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
      <path d="M12 1.5c-3.05 0-5.5 2.55-5.5 5.75 0 2.4 1.45 4.45 3.5 5.3v8.7a2 2 0 1 0 4 0v-8.7c2.05-.85 3.5-2.9 3.5-5.3 0-3.2-2.45-5.75-5.5-5.75z" />
    </svg>
  );
}
