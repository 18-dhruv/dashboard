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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black shadow-sm">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold md:text-2xl">Task Master</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
            <Input className="pl-9 w-32 sm:w-48" placeholder="Search..." />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bot className="h-5 w-5" />
            <span className="ml-2 hidden sm:inline">Ask AI</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-black">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Team Overview - spans full width on mobile, 2 columns on laptop */}
          <div className="md:col-span-2">
            <TeamOverview />
          </div>

          {/* Performance Analytics - spans full width on mobile, 1 column on laptop */}
          <div className="md:col-span-1">
            <PerformanceAnalytics />
          </div>

          {/* Task Board - spans full width on all screens */}
          <div className="md:col-span-3">
            <TaskBoard />
          </div>

          {/* Compensation Tracker - spans full width on mobile, 2 columns on laptop */}
          <div className="md:col-span-2">
            <CompensationTracker />
          </div>

          {/* Assignment History - spans full width on mobile, 1 column on laptop */}
          <div className="md:col-span-1">
            <AssignmentHistory />
          </div>
        </div>
      </main>
    </div>
  )
}