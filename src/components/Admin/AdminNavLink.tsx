import Link from "next/link";

type Props = {
  role: string;
  className?: string;
};

export default function AdminNavLink({ role, className }: Props) {
  if (role !== "admin") return null;

  return (
    <Link href="/admin" className={className}>
      Admin
    </Link>
  );
}
