import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  const fill = dark ? "#fafaf9" : "#0f172a";
  const accent = "#d97706";

  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="4"
          y="8"
          width="32"
          height="24"
          rx="2"
          stroke={accent}
          strokeWidth="2"
          fill="none"
        />
        <line
          x1="4"
          y1="14"
          x2="36"
          y2="14"
          stroke={fill}
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1="4"
          y1="20"
          x2="36"
          y2="20"
          stroke={fill}
          strokeWidth="1.5"
          opacity="0.8"
        />
        <line
          x1="4"
          y1="26"
          x2="36"
          y2="26"
          stroke={fill}
          strokeWidth="1.5"
          opacity="0.8"
        />
      </svg>
      <span
        className={`font-cairo text-xl font-bold ${dark ? "text-[#fafaf9]" : "text-[#0f172a]"}`}
      >
        رواد الامانة
      </span>
    </Link>
  );
}
