"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

const performanceData = [
  { date: "Mon", tasks: 5, completion: 80 },
  { date: "Tue", tasks: 8, completion: 75 },
  { date: "Wed", tasks: 12, completion: 90 },
  { date: "Thu", tasks: 7, completion: 85 },
  { date: "Fri", tasks: 10, completion: 95 },
  { date: "Sat", tasks: 4, completion: 100 },
  { date: "Sun", tasks: 2, completion: 100 },
]

export default function PerformanceAnalytics() {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl font-bold text-white">Performance Analytics</CardTitle>
          <CardDescription className="text-zinc-400">Task completion metrics</CardDescription>
        </div>
        <Select defaultValue="week">
          <SelectTrigger className="w-[120px] bg-zinc-900 border-zinc-800 focus:ring-[#FFCC00]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
            <SelectItem value="day" className="text-white">Day</SelectItem>
            <SelectItem value="week" className="text-white">Week</SelectItem>
            <SelectItem value="month" className="text-white">Month</SelectItem>
            <SelectItem value="year" className="text-white">Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[240px]">
          <ChartContainer
            config={{
              tasks: {
                label: "Tasks",
                color: "hsl(var(--chart-1))",
              },
              completion: {
                label: "Completion %",
                color: "#FFCC00",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCompletion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFCC00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="date" stroke="#666" tickLine={false} axisLine={false} />
                <YAxis stroke="#666" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#colorTasks)"
                />
                <Area
                  type="monotone"
                  dataKey="completion"
                  stroke="#FFCC00"
                  fillOpacity={1}
                  fill="url(#colorCompletion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-zinc-400 text-sm">Avg. Completion Rate</p>
            <p className="text-2xl font-bold text-[#FFCC00]">89%</p>
          </div>
          <div className="bg-zinc-900 p-4 rounded-xl">
            <p className="text-zinc-400 text-sm">Tasks Completed</p>
            <p className="text-2xl font-bold text-white">48</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
