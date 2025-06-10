import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Filter, Calendar } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const assignmentHistory = [
  {
    id: 1,
    title: "Website Redesign",
    status: "Completed",
    date: "Jun 5, 2025",
    notes: "Delivered ahead of schedule with all requirements met.",
    link: "#",
    priority: "High",
  },
  {
    id: 2,
    title: "Mobile App UI",
    status: "Completed",
    date: "May 28, 2025",
    notes: "Client requested minor revisions which were completed.",
    link: "#",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    status: "Completed",
    date: "May 15, 2025",
    notes: "Exceeded expectations with 25% higher engagement than projected.",
    link: "#",
    priority: "High",
  },
  {
    id: 4,
    title: "Database Migration",
    status: "Completed",
    date: "May 10, 2025",
    notes: "Completed with zero downtime as required.",
    link: "#",
    priority: "High",
  },
  {
    id: 5,
    title: "API Integration",
    status: "Completed",
    date: "Apr 30, 2025",
    notes: "All endpoints working as expected with proper documentation.",
    link: "#",
    priority: "Medium",
  },
]

export default function AssignmentHistory() {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-2xl h-full hover:shadow-[#FFCC00]/5 transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-2 h-2 bg-[#FFCC00] rounded-full"></div>
            Assignment History
          </CardTitle>
          <CardDescription className="text-zinc-400">Past project assignments and outcomes</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-white">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {assignmentHistory.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:shadow-lg hover:shadow-[#FFCC00]/10 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white group-hover:text-[#FFCC00] transition-colors">
                    {assignment.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`
                        ${
                          assignment.priority === "High"
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/20 border-red-500/30"
                            : "bg-amber-500/20 text-amber-400 hover:bg-amber-500/20 border-amber-500/30"
                        }
                      `}
                    >
                      {assignment.priority}
                    </Badge>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 border-green-500/30">
                      {assignment.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-zinc-400 mb-3 leading-relaxed">{assignment.notes}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-zinc-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{assignment.date}</span>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="p-0 h-auto text-[#FFCC00] hover:text-[#E6B800] transition-colors"
                  >
                    View Details <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
