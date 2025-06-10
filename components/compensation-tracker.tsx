import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const compensationData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Employee",
    amount: "$4,500",
    period: "Monthly",
    status: "Paid",
    date: "Jun 1, 2025",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Intern",
    amount: "$1,200",
    period: "Monthly",
    status: "Paid",
    date: "Jun 1, 2025",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Assignee",
    amount: "$3,250",
    period: "Project",
    status: "Pending",
    date: "Jun 15, 2025",
  },
  {
    id: 4,
    name: "Jessica Taylor",
    role: "Employee",
    amount: "$5,200",
    period: "Monthly",
    status: "Paid",
    date: "Jun 1, 2025",
  },
  {
    id: 5,
    name: "David Rodriguez",
    role: "Assignee",
    amount: "$2,400",
    period: "Project",
    status: "Pending",
    date: "Jun 20, 2025",
  },
]

export default function CompensationTracker() {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white">Compensation Tracker</CardTitle>
          <CardDescription className="text-zinc-400">Track team payments and status</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-900">
              <TableRow className="border-zinc-800 hover:bg-zinc-900">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Role</TableHead>
                <TableHead className="text-zinc-400">Amount</TableHead>
                <TableHead className="text-zinc-400 hidden sm:table-cell">Period</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400 hidden md:table-cell">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compensationData.map((item) => (
                <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-900">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-transparent border-zinc-700">
                      {item.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-[#FFCC00]">{item.amount}</TableCell>
                  <TableCell className="hidden sm:table-cell">{item.period}</TableCell>
                  <TableCell>
                    <Badge
                      className={`
                        ${
                          item.status === "Paid"
                            ? "bg-green-500/20 text-green-500 hover:bg-green-500/20"
                            : "bg-amber-500/20 text-amber-500 hover:bg-amber-500/20"
                        }
                      `}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
