import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Filter } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const assignmentHistory = [
  {
    id: 1,
    title: "Website Redesign",
    status: "Completed",
    date: "Jun 5, 2025",
    notes: "Delivered ahead of schedule with all requirements met.",
    link: "#",
  },
  {
    id: 2,
    title: "Mobile App UI",
    status: "Completed",
    date: "May 28, 2025",
    notes: "Client requested minor revisions which were completed.",
    link: "#",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    status: "Completed",
    date: "May 15, 2025",
    notes: "Exceeded expectations with 25% higher engagement than projected.",
    link: "#",
  },
  {
    id: 4,
    title: "Database Migration",
    status: "Completed",
    date: "May 10, 2025",
    notes: "Completed with zero downtime as required.",
    link: "#",
  },
  {
    id: 5,
    title: "API Integration",
    status: "Completed",
    date: "Apr 30, 2025",
    notes: "All endpoints working as expected with proper documentation.",
    link: "#",
  },
]

export default function AssignmentHistory() {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white">Assignment History</CardTitle>
          <CardDescription className="text-zinc-400">Past project assignments</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {assignmentHistory.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{assignment.title}</h4>
                  <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/20">{assignment.status}</Badge>
                </div>
                <p className="text-sm text-zinc-400 mb-3">{assignment.notes}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{assignment.date}</span>
                  <Button variant="link" size="sm" className="p-0 h-auto text-[#FFCC00] hover:text-[#E6B800]">
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
