import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import DashboardContent from "@/components/dashboard-content"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-black text-white flex">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <DashboardContent />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
