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
import { useState } from "react"

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
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarHeader>
              <div>
                TaskMaster
                Team Dashboard
              </div>
            </SidebarHeader>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeItem === item.title}
                    onClick={() => setActiveItem(item.title)}
                  >
                    <a href={item.url}>
                      <item.icon />
                      {item.title}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}