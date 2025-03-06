export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <nav>Sidebar</nav>
      <main className="flex-1">{children}</main>
    </div>
  );
}
