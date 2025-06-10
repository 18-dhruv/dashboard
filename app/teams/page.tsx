"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, RadialBar, RadialBarChart } from "recharts"
import { Search, Users, TrendingUp, Award, Calendar, Filter, Download, RefreshCw, AlertTriangle, CheckCircle, Clock, Target } from "lucide-react"
import { 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Teams data structure
const teams = [
  { 
    id: 1, 
    name: "Frontend Team", 
    department: "Engineering", 
    members: 8, 
    lead: "Sarah Johnson",
    color: "#FFCC00",
    avatar: "FE"
  },
  { 
    id: 2, 
    name: "Backend Team", 
    department: "Engineering", 
    members: 6, 
    lead: "Mike Chen",
    color: "#10b981",
    avatar: "BE"
  },
  { 
    id: 3, 
    name: "Design Team", 
    department: "Design", 
    members: 5, 
    lead: "Emily Rodriguez",
    color: "#3b82f6",
    avatar: "DT"
  },
  { 
    id: 4, 
    name: "Product Team", 
    department: "Product", 
    members: 4, 
    lead: "David Kim",
    color: "#ef4444",
    avatar: "PT"
  },
  { 
    id: 5, 
    name: "Data Team", 
    department: "Analytics", 
    members: 7, 
    lead: "Lisa Thompson",
    color: "#8b5cf6",
    avatar: "DA"
  },
  { 
    id: 6, 
    name: "QA Team", 
    department: "Quality", 
    members: 4, 
    lead: "John Wilson",
    color: "#f59e0b",
    avatar: "QA"
  }
]

// Generate team performance data
const generateTeamData = (teamId: number) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
  return months.map((month, index) => ({
    month,
    productivity: 70 + (teamId * 3) + (index * 2) + Math.random() * 10,
    satisfaction: 75 + (teamId * 2) + (index * 1.5) + Math.random() * 8,
    velocity: 60 + (teamId * 4) + (index * 3) + Math.random() * 12,
    quality: 80 + (teamId * 1.5) + (index * 2) + Math.random() * 6,
    delivery: 85 + (teamId * 2) + (index * 1) + Math.random() * 8,
    collaboration: 78 + (teamId * 2.5) + (index * 2) + Math.random() * 7
  }))
}

// Weekly comparison data
const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
  return days.map(day => ({
    day,
    ...teams.reduce((acc, team) => {
      acc[team.name.replace(' Team', '')] = 70 + Math.random() * 30
      return acc
    }, {} as Record<string, number>)
  }))
}

// Department overview data
const getDepartmentData = () => {
  const departments = [...new Set(teams.map(team => team.department))]
  return departments.map(dept => {
    const deptTeams = teams.filter(team => team.department === dept)
    const totalMembers = deptTeams.reduce((sum, team) => sum + team.members, 0)
    return {
      name: dept,
      teams: deptTeams.length,
      members: totalMembers,
      performance: 75 + Math.random() * 20,
      projects: Math.floor(Math.random() * 12) + 3
    }
  })
}

// Custom Chart Container
const DarkChartContainer = ({ children, config }: { children: React.ReactElement; config: Record<string, any> }) => (
  <div className="w-full h-full bg-black rounded-lg">
    <ChartContainer config={config} className="w-full h-full bg-black">
      {children}
    </ChartContainer>
  </div>
)

// Team Performance Radar Chart Component
const TeamRadarChart = ({ team }: { team: any }) => {
  const radarData = [
    { metric: "Productivity", value: 75 + (team.id * 3), fullMark: 100 },
    { metric: "Quality", value: 80 + (team.id * 2), fullMark: 100 },
    { metric: "Velocity", value: 70 + (team.id * 4), fullMark: 100 },
    { metric: "Satisfaction", value: 85 + (team.id * 1.5), fullMark: 100 },
    { metric: "Collaboration", value: 78 + (team.id * 2.5), fullMark: 100 }
  ]

  return (
    <DarkChartContainer config={{}}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={radarData}>
          <RadialBar 
            dataKey="value" 
            cornerRadius={10} 
            fill={team.color}
            background={{ fill: '#333' }}
          />
          <ChartTooltip 
            content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />}
            formatter={(value) => [`${value}%`, 'Score']}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </DarkChartContainer>
  )
}

export default function TeamPerformancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState(teams[0])
  const [timeRange, setTimeRange] = useState("6months")
  const [viewMode, setViewMode] = useState("overview") // overview, detailed, comparison
  const [selectedMetric, setSelectedMetric] = useState("productivity")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Filter teams based on search
  const filteredTeams = useMemo(() => {
    return teams.filter(team => 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.lead.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  // Get data for charts
  const teamData = generateTeamData(selectedTeam.id)
  const weeklyData = generateWeeklyData()
  const departmentData = getDepartmentData()

  // Calculate overall metrics
  const overallMetrics = useMemo(() => {
    const totalMembers = teams.reduce((sum, team) => sum + team.members, 0)
    const avgProductivity = Math.round(teamData.reduce((sum, month) => sum + month.productivity, 0) / teamData.length)
    const avgSatisfaction = Math.round(teamData.reduce((sum, month) => sum + month.satisfaction, 0) / teamData.length)
    const totalProjects = departmentData.reduce((sum, dept) => sum + dept.projects, 0)
    
    return {
      totalTeams: teams.length,
      totalMembers,
      avgProductivity,
      avgSatisfaction,
      totalProjects,
      completionRate: 89
    }
  }, [teamData, departmentData])

  // Handle refresh animation
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <SidebarProvider>
        <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-black">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-800 bg-black px-4">
            <SidebarTrigger className="text-white hover:bg-zinc-900" />
            <div className="h-4 w-px bg-zinc-800" />
            <h1 className="text-xl font-semibold text-white">Team Performance</h1>
            
            {/* Header Controls */}
            <div className="ml-auto flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className={`p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white transition-all ${isRefreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white">
                <Download className="w-4 h-4" />
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            
            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              {/* Search and View Mode */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search teams, departments, or leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80 pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-2">
                  {['overview', 'detailed', 'comparison'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        viewMode === mode 
                          ? 'bg-[#FFCC00] text-black' 
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric Filter */}
              <div className="flex items-center space-x-3">
                <Filter className="text-zinc-400 w-4 h-4" />
                <select 
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
                >
                  <option value="productivity">Productivity</option>
                  <option value="satisfaction">Satisfaction</option>
                  <option value="velocity">Velocity</option>
                  <option value="quality">Quality</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>

            {/* Overview Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Total Teams</p>
                      <p className="text-2xl font-bold text-white">{overallMetrics.totalTeams}</p>
                    </div>
                    <Users className="text-[#FFCC00] w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Total Members</p>
                      <p className="text-2xl font-bold text-white">{overallMetrics.totalMembers}</p>
                    </div>
                    <Target className="text-blue-400 w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Avg Productivity</p>
                      <p className="text-2xl font-bold text-emerald-400">{overallMetrics.avgProductivity}%</p>
                    </div>
                    <TrendingUp className="text-emerald-400 w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Satisfaction</p>
                      <p className="text-2xl font-bold text-purple-400">{overallMetrics.avgSatisfaction}%</p>
                    </div>
                    <CheckCircle className="text-purple-400 w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Active Projects</p>
                      <p className="text-2xl font-bold text-orange-400">{overallMetrics.totalProjects}</p>
                    </div>
                    <Clock className="text-orange-400 w-6 h-6" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-950 border-zinc-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-400 text-xs">Completion Rate</p>
                      <p className="text-2xl font-bold text-green-400">{overallMetrics.completionRate}%</p>
                    </div>
                    <Award className="text-green-400 w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Select Team for Detailed Analysis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                {filteredTeams.map(team => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team)}
                    className={`flex items-center space-x-3 p-4 rounded-lg transition-all border ${
                      selectedTeam.id === team.id 
                        ? 'bg-[#FFCC00] text-black border-[#FFCC00]' 
                        : 'bg-zinc-900 text-white border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div 
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold ${
                        selectedTeam.id === team.id ? 'bg-black text-[#FFCC00]' : 'text-white'
                      }`}
                      style={{ backgroundColor: selectedTeam.id === team.id ? 'black' : team.color }}
                    >
                      {team.avatar}
                    </div>
                    <div className="text-left flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{team.name}</p>
                      <p className="text-xs opacity-70 truncate">{team.members} members</p>
                      <p className="text-xs opacity-70 truncate">{team.department}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {/* Team Performance Trends */}
              <div className="xl:col-span-2">
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">
                      {selectedTeam.name} - Performance Trends
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      Monthly performance across key metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-black rounded-lg">
                      <DarkChartContainer
                        config={{
                          productivity: { label: "Productivity", color: "#FFCC00" },
                          satisfaction: { label: "Satisfaction", color: "#10b981" },
                          velocity: { label: "Velocity", color: "#3b82f6" },
                          quality: { label: "Quality", color: "#ef4444" }
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={teamData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="month" stroke="#666" tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />} />
                            <Line type="monotone" dataKey="productivity" stroke="#FFCC00" strokeWidth={3} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="satisfaction" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="velocity" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="quality" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </DarkChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Radar Chart */}
              <div>
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Team Strengths</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Multi-dimensional performance view
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <TeamRadarChart team={selectedTeam} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Team Comparison */}
              <div className="xl:col-span-2">
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Weekly Team Comparison</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Daily performance across all teams
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-black rounded-lg">
                      <DarkChartContainer
                        config={teams.reduce((acc, team) => {
                          acc[team.name.replace(' Team', '')] = { label: team.name, color: team.color }
                          return acc
                        }, {} as Record<string, any>)}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#666" tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent className="bg-zinc-900 border-zinc-700 text-white" />} />
                            {teams.map(team => (
                              <Bar 
                                key={team.id}
                                dataKey={team.name.replace(' Team', '')} 
                                fill={team.color}
                                opacity={0.8}
                                radius={[2, 2, 0, 0]}
                              />
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </DarkChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Department Overview */}
              <div>
                <Card className="bg-zinc-950 border-zinc-800 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Department Overview</CardTitle>
                    <CardDescription className="text-zinc-400">
                      Performance by department
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentData.map((dept, index) => (
                        <div key={dept.name} className="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
                          <div>
                            <p className="font-medium text-white text-sm">{dept.name}</p>
                            <p className="text-xs text-zinc-400">{dept.teams} teams • {dept.members} members</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-white">{Math.round(dept.performance)}%</p>
                            <p className="text-xs text-zinc-400">{dept.projects} projects</p>
                          </div>
                        </div>
                      ))}
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