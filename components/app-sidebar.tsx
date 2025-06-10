"use client"

import { BarChart3, DollarSign, Home, Settings, TrendingUp, Users, CheckSquare, History } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Team",
    url: "/teams",
    icon: Users,
  },
  {
    title: "Performance",
    url: "/performances",
    icon: TrendingUp,
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  

  const isItemActive = (itemUrl: string) => {
    if (itemUrl === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(itemUrl)
  }

  return (
    <Sidebar className="border-r border-zinc-800" style={{ backgroundColor: "#000000" }}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FFCC00] rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white">TaskMaster</span>
            <span className="text-xs text-zinc-400">Team Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = isItemActive(item.url)
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        w-full justify-start gap-3 px-3 py-3 rounded-2xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-[#FFCC00] text-black hover:bg-[#E6B800] shadow-lg shadow-[#FFCC00]/20"
                            : "text-zinc-300 hover:bg-zinc-900 hover:text-white hover:shadow-lg hover:shadow-[#FFCC00]/10"
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-3 w-full">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}