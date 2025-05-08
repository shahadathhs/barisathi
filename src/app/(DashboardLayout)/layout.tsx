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
      <main className="flex-1 p-3 h-screen">
        <div className="border rounded h-full flex flex-col">
          <DashboardNavbar />
          <div className="p-2 md:p-3 flex-1 overflow-y-scroll">{children}</div>
        </div>
      </main>
    </div>
  );
}
