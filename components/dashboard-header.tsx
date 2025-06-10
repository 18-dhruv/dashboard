"use client"

import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-zinc-800 bg-black sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex items-center">
            <span className="text-[#FFCC00]">Task</span>
            <span>Master</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            type="search"
            placeholder="Search tasks, team members..."
            className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFCC00]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFCC00] rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden p-4 border-t border-zinc-800">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search tasks, team members..."
              className="pl-9 bg-zinc-900 border-zinc-800 focus-visible:ring-[#FFCC00]"
            />
          </div>
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start">
              Team
            </Button>
            <Button variant="ghost" className="justify-start">
              Tasks
            </Button>
            <Button variant="ghost" className="justify-start">
              Analytics
            </Button>
            <Button variant="ghost" className="justify-start">
              Settings
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
