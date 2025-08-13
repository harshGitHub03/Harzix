import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Cruip">
      <span className="text-2xl font-bold ml-2"><span className="text-blue-500">H</span>z</span>
    </Link>
  );
}
