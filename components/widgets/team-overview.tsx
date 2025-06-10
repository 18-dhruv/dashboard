import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, DollarSign, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Employee",
    status: "Active",
    compensation: "$4,500/mo",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Intern",
    status: "Active",
    compensation: "$1,200/mo",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "5m ago",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Assignee",
    status: "Idle",
    compensation: "$65/hr",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "1h ago",
  },
  {
    id: 4,
    name: "Jessica Taylor",
    role: "Employee",
    status: "Done",
    compensation: "$5,200/mo",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "2h ago",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Assignee",
    status: "Active",
    compensation: "$75/hr",
    avatar: "/placeholder.svg?height=40&width=40",
    lastActive: "30m ago",
  },
]

export default function TeamOverview() {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-2xl h-full hover:shadow-[#FFCC00]/5 transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFCC00] rounded-full"></div>
            Team Overview
          </CardTitle>
          <CardDescription className="text-zinc-400">Manage your team members and their status</CardDescription>
        </div>
        <Button className="bg-[#FFCC00] hover:bg-[#E6B800] text-black font-medium shadow-lg hover:shadow-[#FFCC00]/20 transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" /> Add Member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-200 hover:shadow-lg hover:shadow-[#FFCC00]/10 group"
            >
              <div className="flex items-center gap-4">
                <Avatar className="ring-2 ring-zinc-800 group-hover:ring-[#FFCC00]/30 transition-all duration-200">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-zinc-800 text-white">{member.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{member.name}</p>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <Badge variant="outline" className="text-xs border-zinc-700 bg-transparent text-zinc-300">
                      {member.role}
                    </Badge>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{member.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center text-sm">
                  <DollarSign className="h-3 w-3 text-[#FFCC00] mr-1" />
                  <span className="text-white font-medium">{member.compensation}</span>
                </div>
                <Badge
                  className={`
                    ${
                      member.status === "Active"
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/30"
                        : member.status === "Idle"
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 border-amber-500/30"
                          : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/20 border-blue-500/30"
                    }
                  `}
                >
                  {member.status}
                </Badge>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
