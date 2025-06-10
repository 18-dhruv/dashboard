import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, DollarSign, Plus } from "lucide-react"
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
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 px-4 sm:px-6">
        <div>
          <CardTitle className="text-lg sm:text-xl font-bold text-white">Team Overview</CardTitle>
          <CardDescription className="text-sm sm:text-base text-zinc-400">Manage your team members</CardDescription>
        </div>
        <Button 
          className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs sm:text-sm" 
          size="sm"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Add Member</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-3 sm:space-y-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-zinc-800 text-xs sm:text-sm">
                    {member.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white text-sm sm:text-base">{member.name}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-400">
                    <Badge variant="outline" className="text-xs border-zinc-700 bg-transparent">
                      {member.role}
                    </Badge>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span>{member.lastActive}</span>
                    </div>
                    <div className="flex items-center sm:hidden">
                      <DollarSign className="h-3 w-3 text-[#FFCC00] mr-1" />
                      <span>{member.compensation}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden sm:flex items-center text-xs sm:text-sm">
                  <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-[#FFCC00] mr-1" />
                  <span>{member.compensation}</span>
                </div>
                <Badge
                  className={`
                    text-xs sm:text-sm
                    ${
                      member.status === "Active"
                        ? "bg-green-500/20 text-green-500 hover:bg-green-500/20"
                        : member.status === "Idle"
                          ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/20"
                          : "bg-blue-500/20 text-blue-500 hover:bg-blue-500/20"
                    }
                  `}
                >
                  {member.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}