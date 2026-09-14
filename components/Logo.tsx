import { useId } from "react";

/** Vector redraw of the Heavy Lift Service logo (cube with three load arrows). */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e83030" />
          <stop offset="1" stopColor="#f06830" />
        </linearGradient>
      </defs>
      <g fill="#fff" stroke="#102840" strokeWidth="4" strokeLinejoin="round">
        <path d="M10 28.5 20 19h28l-10 9.5Z" />
        <path d="M38 28.5 48 19v27l-10 9.5Z" />
        <rect x="10" y="28.5" width="28" height="27" rx="4" />
      </g>
      <g stroke={`url(#${id})`} strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M27 36V7" />
        <path d="M42 41h15" />
        <path d="M22 44 9 57" />
      </g>
      <g fill="#e83030">
        <path d="m27 1 5 8h-10Z" />
        <path d="m63 41-8 5v-10Z" />
        <path d="m4 62 2.3-9.2 6.9 6.9Z" />
      </g>
    </svg>
  );
}

export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
      <span
        className={`font-display text-[1.2rem] leading-[0.92] font-bold uppercase italic tracking-[0.01em] sm:text-[1.35rem] ${
          tone === "light" ? "text-white" : "text-navy-900"
        }`}
      >
        Heavy Lift
        <br />
        Service<sup className="ml-0.5 align-super text-[0.5em] not-italic">®</sup>
      </span>
    </span>
  );
}
