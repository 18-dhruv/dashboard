import { SidebarTrigger } from "@/components/ui/sidebar"
import TeamOverview from "@/components/widgets/team-overview"
import TaskBoard from "@/components/widgets/task-board"
import CompensationTracker from "@/components/widgets/compensation-tracker"
import PerformanceAnalytics from "@/components/widgets/performance-analytics"
import AssignmentHistory from "@/components/widgets/assignment-history"
import { Bell, Search, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DashboardContent() {
  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-auto border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-white">
              Task Master
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search tasks, teams, or projects..."
                className="pl-7 w-92 lg:w-96 bg-zinc-900 border-zinc-800 text-white"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-zinc-900 ">
              <Bot className="h-4 w-4 " />
              Ask AI
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 " />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Team Overview - spans 2 columns on large screens */}
          <div className="lg:col-span-2">
            <TeamOverview />
          </div>
          
          {/* Performance Analytics - spans 1 column */}
          <div className="lg:col-span-1">
            <PerformanceAnalytics />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          {/* Task Board - spans full width */}
          <div className="col-span-1">
            <TaskBoard />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Compensation Tracker - spans 2 columns */}
          <div className="lg:col-span-2">
            <CompensationTracker />
          </div>
          
          {/* Assignment History - spans 1 column */}
          <div className="lg:col-span-1">
            <AssignmentHistory />
          </div>
        </div>
      </main>
    </div>
  )
}