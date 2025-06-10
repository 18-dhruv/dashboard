"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Bar, BarChart, Line, LineChart } from "recharts"
import { Search, DollarSign, Target, TrendingUp, Calendar } from "lucide-react"
import { 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"

import { AppSidebar } from "@/components/app-sidebar"

// Dummy data for employees
const employees = [
  { id: 1, name: "Sarah Johnson", role: "Frontend Developer", avatar: "SJ" },
  { id: 2, name: "Mike Chen", role: "Backend Developer", avatar: "MC" },
  { id: 3, name: "Emily Rodriguez", role: "UI/UX Designer", avatar: "ER" },
  { id: 4, name: "David Kim", role: "Product Manager", avatar: "DK" },
  { id: 5, name: "Lisa Thompson", role: "Data Analyst", avatar: "LT" }
]

// Performance data for selected employee
const getPerformanceData = (employeeId: number) => {
  const baseData = [
    { date: "Mon", tasks: 5, completion: 80 },
    { date: "Tue", tasks: 8, completion: 75 },
    { date: "Wed", tasks: 12, completion: 90 },
    { date: "Thu", tasks: 7, completion: 85 },
    { date: "Fri", tasks: 10, completion: 95 },
    { date: "Sat", tasks: 4, completion: 100 },
    { date: "Sun", tasks: 2, completion: 100 },
  ]
  
  return baseData.map(day => ({
    ...day,
    tasks: day.tasks + (employeeId % 3),
    completion: Math.max(60, day.completion + (employeeId * 2) % 20 - 10)
  }))
}

// Payment vs Output data
const getPaymentOutputData = (employeeId: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map((month, index) => ({
    month,
    payment: 8000 + (employeeId * 500) + (index * 200),
    output: 75 + (employeeId * 5) + (index * 3),
    projects: 3 + (index % 3),
    revenue: 12000 + (employeeId * 800) + (index * 400)
  }))
}

// Custom Chart Container with black background
const DarkChartContainer = ({ children, config }: { children: React.ReactElement; config: Record<string, any> }) => (
  <div className="w-full h-full bg-black rounded-lg">
    <ChartContainer config={config} className="w-full h-full bg-black">
      {children}
    </ChartContainer>
  </div>
)

// Performance Analytics Component
type PerformanceData = {
  date: string;
  tasks: number;
  completion: number;
};

const PerformanceAnalytics = ({ data }: { data: PerformanceData[] }) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl font-bold text-white">Weekly Task Performance</CardTitle>
        <CardDescription className="text-zinc-400 text-sm">Tasks completed and completion rate</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        <div className="h-[200px] sm:h-[240px] md:h-[280px] bg-black rounded-lg">
          <DarkChartContainer
            config={{
              tasks: {
                label: "Tasks Completed",
                color: "#FFCC00",
              },
              completion: {
                label: "Completion Rate (%)",
                color: "#10b981",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFCC00" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFCC00" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="completionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#666" 
                  tickLine={false} 
                  axisLine={false}
                  fontSize={12}
                  padding={{ left: 10, right: 10 }}
                  tick={{ dy: 5, fill: "#666" }}
                />
                <YAxis 
                  stroke="#666" 
                  tickLine={false} 
                  axisLine={false}
                  fontSize={12}
                  width={40}
                  tick={{ fill: "#666" }}
                  tickFormatter={(value) => (value >= 100 ? `${value}%` : value)}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />}
                  formatter={(value, name) => [
                    name === 'completion' ? `${value}%` : value,
                    name === 'tasks' ? 'Tasks' : 'Completion Rate'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stackId="1"
                  stroke="#FFCC00" 
                  fill="url(#tasksGradient)"
                />
                <Area 
                  type="monotone" 
                  dataKey="completion" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="url(#completionGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </DarkChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default function IndividualPerformancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0])
  const [filteredEmployees, setFilteredEmployees] = useState(employees)

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value)
    const filtered = employees.filter(emp => 
      emp.name.toLowerCase().includes(value.toLowerCase()) ||
      emp.role.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredEmployees(filtered)
  }

  // Get data for selected employee
  const performanceData = getPerformanceData(selectedEmployee.id)
  const paymentOutputData = getPaymentOutputData(selectedEmployee.id)
  
  // Calculate metrics
  const avgCompletion = Math.round(performanceData.reduce((sum, day) => sum + day.completion, 0) / performanceData.length)
  const totalTasks = performanceData.reduce((sum, day) => sum + day.tasks, 0)
  const totalPayment = paymentOutputData.reduce((sum, month) => sum + month.payment, 0)
  const avgOutput = Math.round(paymentOutputData.reduce((sum, month) => sum + month.output, 0) / paymentOutputData.length)
  const totalRevenue = paymentOutputData.reduce((sum, month) => sum + month.revenue, 0)
  const roi = Math.round(((totalRevenue - totalPayment) / totalPayment) * 100)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black">
          {/* Header with sidebar trigger */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
            <SidebarTrigger className="text-white hover:bg-zinc-900" />
            <div className="h-4 w-px bg-zinc-800" />
            <h1 className="text-xl font-semibold text-white">Individual Performance</h1>
          </header>

          {/* Main content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Search and employee selection */}
            <div className="flex flex-col space-y-4 mb-6">
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                />
              </div>

              {/* Employee Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {filteredEmployees.map(employee => (
                  <button
                    key={employee.id}
                    onClick={() => setSelectedEmployee(employee)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                      selectedEmployee.id === employee.id 
                        ? 'bg-[#FFCC00] text-black' 
                        : 'bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <div className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedEmployee.id === employee.id ? 'bg-black text-[#FFCC00]' : 'bg-zinc-700 text-white'
                    }`}>
                      {employee.avatar}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{employee.name}</p>
                      <p className="text-xs opacity-70 truncate">{employee.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              
              {/* Selected Employee Info - Spans 2 columns on larger screens */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFCC00] flex items-center justify-center text-black text-xl sm:text-2xl font-bold">
                        {selectedEmployee.avatar}
                      </div>
                      <div className="text-center sm:text-left">
                        <CardTitle className="text-xl sm:text-2xl text-white">{selectedEmployee.name}</CardTitle>
                        <CardDescription className="text-zinc-400 text-base sm:text-lg">{selectedEmployee.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Performance Overview Cards - 4 cards spanning remaining space */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 h-full">
                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-400 text-xs sm:text-sm truncate">Completion Rate</p>
                          <p className="text-lg sm:text-2xl font-bold text-[#FFCC00]">{avgCompletion}%</p>
                        </div>
                        <Target className="text-[#FFCC00] w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-400 text-xs sm:text-sm truncate">Total Payment</p>
                          <p className="text-lg sm:text-2xl font-bold text-white">${totalPayment.toLocaleString()}</p>
                        </div>
                        <DollarSign className="text-green-400 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-400 text-xs sm:text-sm truncate">Avg Output</p>
                          <p className="text-lg sm:text-2xl font-bold text-white">{avgOutput}%</p>
                        </div>
                        <TrendingUp className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-zinc-950 border-zinc-800">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-400 text-xs sm:text-sm truncate">ROI</p>
                          <p className="text-lg sm:text-2xl font-bold text-emerald-400">{roi}%</p>
                        </div>
                        <Calendar className="text-emerald-400 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Performance Analytics - Spans 3 columns */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-3">
                <PerformanceAnalytics data={performanceData} />
              </div>

              {/* Payment vs Output Chart - Spans 3 columns */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-3">
                <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-white">Payment vs Output Analysis</CardTitle>
                    <CardDescription className="text-zinc-400 text-sm">Monthly payment and output comparison</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="h-[200px] sm:h-[240px] md:h-[280px] bg-black rounded-lg">
                      <DarkChartContainer
                        config={{
                          payment: {
                            label: "Payment ($)",
                            color: "#ef4444",
                          },
                          output: {
                            label: "Output (%)",
                            color: "#FFCC00",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={paymentOutputData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                              dataKey="month"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              tick={{ dy: 5, fill: "#666" }}
                            />
                            <YAxis
                              yAxisId="left"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              width={60}
                              tick={{ fill: "#666" }}
                              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              width={50}
                              tick={{ fill: "#666" }}
                              tickFormatter={(value) => `${value}%`}
                            />
                            <ChartTooltip
                              content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />}
                              formatter={(value, name) => [
                                name === "payment" ? `$${value.toLocaleString()}` : `${value}%`,
                                name === "payment" ? "Payment" : "Output",
                              ]}
                            />
                            <Bar
                              yAxisId="left"
                              dataKey="payment"
                              fill="#ef4444"
                              opacity={0.8}
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                            />
                            <Bar
                              yAxisId="right"
                              dataKey="output"
                              fill="#FFCC00"
                              opacity={0.8}
                              radius={[4, 4, 0, 0]}
                              barSize={30}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </DarkChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Trend Analysis - Full width */}
              <div className="md:col-span-2 lg:col-span-4 xl:col-span-6">
                <Card className="bg-zinc-950 border-zinc-800 shadow-lg h-full">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-white">Monthly Trend Analysis</CardTitle>
                    <CardDescription className="text-zinc-400 text-sm">Projects completed and revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <div className="h-[200px] sm:h-[240px] md:h-[300px] bg-black rounded-lg">
                      <DarkChartContainer
                        config={{
                          projects: {
                            label: "Projects",
                            color: "#3b82f6",
                          },
                          revenue: {
                            label: "Revenue ($)",
                            color: "#10b981",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={paymentOutputData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis
                              dataKey="month"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              tick={{ dy: 5, fill: "#666" }}
                            />
                            <YAxis
                              yAxisId="left"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              width={50}
                              tick={{ fill: "#666" }}
                              tickFormatter={(value) => value}
                            />
                            <YAxis
                              yAxisId="right"
                              orientation="right"
                              stroke="#666"
                              tickLine={false}
                              axisLine={false}
                              fontSize={12}
                              width={70}
                              tick={{ fill: "#666" }}
                              tickFormatter={(value) => `${(value/1000).toFixed(0)}k`}
                            />
                            <ChartTooltip
                              content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />}
                              formatter={(value, name) => [
                                name === "revenue" ? `${value.toLocaleString()}` : value,
                                name === "projects" ? "Projects" : "Revenue",
                              ]}
                            />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="projects"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#3b82f6" }}
                            />
                            <Line
                              yAxisId="right"
                              type="monotone"
                              dataKey="revenue"
                              stroke="#10b981"
                              strokeWidth={3}
                              dot={{ fill: "#10b981", strokeWidth: 2, r: 5 }}
                              activeDot={{ r: 7, fill: "#10b981" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </DarkChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}