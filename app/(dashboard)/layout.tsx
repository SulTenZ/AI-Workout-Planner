// app/(dashboard)/layout.tsx

// Layout ini hanya untuk mengelompokkan rute dan bisa digunakan untuk
// hal-hal seperti proteksi rute di masa depan.
// Untuk sekarang, cukup render children-nya.
export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}