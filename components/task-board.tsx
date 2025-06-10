"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Plus } from "lucide-react"
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
}

export default function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
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
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white">Task Management</CardTitle>
          <CardDescription className="text-zinc-400">Manage and track project tasks</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button size="sm" className="bg-[#FFCC00] hover:bg-[#E6B800] text-black">
            <Plus className="h-4 w-4 mr-2" /> New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-white">{column.title}</h3>
                <Badge variant="outline" className="bg-zinc-900 border-zinc-800">
                  {column.tasks.length}
                </Badge>
              </div>
              <div className="space-y-3 flex-1">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white">{task.title}</h4>
                      <Badge
                        className={`
                          ${
                            task.priority === "High"
                              ? "bg-red-500/20 text-red-500 hover:bg-red-500/20"
                              : task.priority === "Medium"
                                ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/20"
                                : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"
                          }
                        `}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-zinc-800 border-zinc-700 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-zinc-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{task.dueDate}</span>
                      </div>
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} alt={task.assignee.name} />
                        <AvatarFallback className="text-xs bg-zinc-800">
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
