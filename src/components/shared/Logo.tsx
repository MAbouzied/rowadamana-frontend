import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img
        src="/logo.svg"
        alt="رواد الامانة"
        width={70}
        height={70}
        className={`h-12 w-12 flex-shrink-0 object-contain ${dark ? "invert" : ""}`}
      />
      <span
        className={`font-cairo text-xl font-bold ${dark ? "text-[#fafaf9]" : "text-[#0f172a]"}`}
      >
        رواد الامانة
      </span>
    </Link>
  );
}
