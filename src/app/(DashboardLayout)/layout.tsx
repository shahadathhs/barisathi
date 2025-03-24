import DashboardNavbar from "@/components/shared/DashboardNavbar";
import DashboardSide from "@/components/shared/sidebar/DashboardSide";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Drawer */}
      <DashboardSide />

      {/* Main content */}
      <main className="flex-1 p-3 h-screen overflow-y-auto">
        <div className="border rounded h-full">
          <DashboardNavbar />
          <div className="p-3">{children}</div>
        </div>
      </main>
    </div>
  );
}
