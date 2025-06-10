"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Task = {
  id: number
  title: string
  priority: "High" | "Medium" | "Low"
  tags: string[]
  dueDate: string
  assignee: {
    name: string
    avatar: string
  }
}

type Column = {
  id: string
  title: string
  tasks: Task[]
  color: string
}

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      color: "bg-red-500/10 border-red-500/20",
      tasks: [
        {
          id: 1,
          title: "Redesign landing page",
          priority: "High",
          tags: ["Design", "Website"],
          dueDate: "Tomorrow",
          assignee: {
            name: "Alex J.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
        {
          id: 2,
          title: "Update user documentation",
          priority: "Medium",
          tags: ["Docs"],
          dueDate: "Next week",
          assignee: {
            name: "Sarah W.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      color: "bg-amber-500/10 border-amber-500/20",
      tasks: [
        {
          id: 3,
          title: "Implement authentication",
          priority: "High",
          tags: ["Backend", "Security"],
          dueDate: "Today",
          assignee: {
            name: "Michael C.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
        {
          id: 4,
          title: "Create onboarding flow",
          priority: "Medium",
          tags: ["UX", "Frontend"],
          dueDate: "Friday",
          assignee: {
            name: "Jessica T.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      color: "bg-green-500/10 border-green-500/20",
      tasks: [
        {
          id: 5,
          title: "Fix payment integration",
          priority: "High",
          tags: ["Backend", "Payments"],
          dueDate: "Completed",
          assignee: {
            name: "David R.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
        {
          id: 6,
          title: "Update privacy policy",
          priority: "Low",
          tags: ["Legal"],
          dueDate: "Completed",
          assignee: {
            name: "Alex J.",
            avatar: "/placeholder.svg?height=32&width=32",
          },
        },
      ],
    },
  ])

  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-2xl hover:shadow-[#FFCC00]/5 transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFCC00] rounded-full"></div>
            Task Management Board
          </CardTitle>
          <CardDescription className="text-zinc-400">Drag and drop tasks to update their status</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button
            size="sm"
            className="bg-[#FFCC00] hover:bg-[#E6B800] text-black font-medium shadow-lg hover:shadow-[#FFCC00]/20"
          >
            <Plus className="h-4 w-4 mr-2" /> New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div className={`flex items-center justify-between mb-4 p-3 rounded-2xl border ${column.color}`}>
                <h3 className="font-medium text-white">{column.title}</h3>
                <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-300">
                  {column.tasks.length}
                </Badge>
              </div>
              <div className="space-y-4 flex-1">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-[#FFCC00]/10 transition-all duration-200 cursor-move group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-white group-hover:text-[#FFCC00] transition-colors">
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`
                            ${
                              task.priority === "High"
                                ? "bg-red-500/20 text-red-400 hover:bg-red-500/20 border-red-500/30"
                                : task.priority === "Medium"
                                  ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 border-amber-500/30"
                                  : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 border-blue-500/30"
                            }
                          `}
                        >
                          {task.priority}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {task.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-zinc-800 border-zinc-700 text-zinc-300 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-zinc-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                      <Avatar className="h-6 w-6 ring-2 ring-zinc-800 group-hover:ring-[#FFCC00]/30 transition-all">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs bg-zinc-800 text-white">
                          {task.assignee.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
