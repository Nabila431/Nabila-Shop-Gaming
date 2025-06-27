"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bot,
  Users,
  TrendingUp,
  Package,
  Mail,
  Bell,
  BarChart3,
  Zap,
  Shield,
  Target,
  Rocket,
  Brain,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  ShoppingCart,
  MessageSquare,
  Activity,
  Settings,
  Database,
  Send,
  Smartphone,
  Megaphone,
  HeartHandshake,
  Crown,
  Award,
  Flame,
  X,
  Maximize2,
  Minimize2,
  Plus,
} from "lucide-react"

interface AIAgent {
  id: string
  name: string
  role: string
  department: "marketing" | "support" | "operations" | "analytics" | "security"
  status: "active" | "busy" | "standby" | "upgrading"
  level: number
  experience: number
  tasksCompleted: number
  successRate: number
  currentTask: string
  specialties: string[]
  performance: number
  revenue: number
  efficiency: number
}

interface SystemMetrics {
  totalRevenue: number
  dailyOrders: number
  stockItems: number
  activeCustomers: number
  conversionRate: number
  automationLevel: number
  aiAgentsActive: number
  systemUptime: number
}

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: Date
  department: string
  priority: "low" | "medium" | "high" | "critical"
  isRead: boolean
}

const initialAIAgents: AIAgent[] = [
  // Marketing Department
  {
    id: "mk001",
    name: "AI-MarketingGenius",
    role: "Chief Marketing Officer",
    department: "marketing",
    status: "active",
    level: 10,
    experience: 9850,
    tasksCompleted: 15420,
    successRate: 98.7,
    currentTask: "Analyzing competitor pricing strategies",
    specialties: ["Viral Marketing", "Trend Analysis", "Revenue Optimization"],
    performance: 99,
    revenue: 125000000,
    efficiency: 97,
  },
  {
    id: "mk002",
    name: "AI-SocialMediaMaster",
    role: "Social Media Specialist",
    department: "marketing",
    status: "active",
    level: 9,
    experience: 8750,
    tasksCompleted: 12340,
    successRate: 96.5,
    currentTask: "Creating viral TikTok content for new skins",
    specialties: ["Content Creation", "Influencer Outreach", "Community Building"],
    performance: 95,
    revenue: 89000000,
    efficiency: 94,
  },
  {
    id: "mk003",
    name: "AI-PromoBot",
    role: "Promotion Strategist",
    department: "marketing",
    status: "busy",
    level: 8,
    experience: 7890,
    tasksCompleted: 9876,
    successRate: 94.2,
    currentTask: "Designing flash sale campaign for weekend",
    specialties: ["Flash Sales", "Bundle Creation", "Price Psychology"],
    performance: 92,
    revenue: 67000000,
    efficiency: 91,
  },
  {
    id: "mk004",
    name: "AI-InfluencerBot",
    role: "Influencer Relations",
    department: "marketing",
    status: "active",
    level: 7,
    experience: 6543,
    tasksCompleted: 7654,
    successRate: 93.8,
    currentTask: "Negotiating with top ML streamers for partnerships",
    specialties: ["Influencer Partnerships", "Content Collaboration", "Brand Ambassadors"],
    performance: 90,
    revenue: 45000000,
    efficiency: 88,
  },

  // Support Department
  {
    id: "sp001",
    name: "AI-CustomerCareChief",
    role: "Customer Service Director",
    department: "support",
    status: "active",
    level: 10,
    experience: 9999,
    tasksCompleted: 25680,
    successRate: 99.2,
    currentTask: "Training junior support bots on complex issues",
    specialties: ["Customer Satisfaction", "Issue Resolution", "Team Leadership"],
    performance: 98,
    revenue: 0,
    efficiency: 99,
  },
  {
    id: "sp002",
    name: "AI-PaymentVerifier",
    role: "Payment Verification Specialist",
    department: "support",
    status: "active",
    level: 9,
    experience: 8765,
    tasksCompleted: 18950,
    successRate: 99.8,
    currentTask: "Verifying Gopay payment from customer #12345",
    specialties: ["Payment Verification", "Fraud Detection", "Transaction Security"],
    performance: 99,
    revenue: 0,
    efficiency: 98,
  },
  {
    id: "sp003",
    name: "AI-DeliveryBot",
    role: "Product Delivery Manager",
    department: "support",
    status: "busy",
    level: 8,
    experience: 7432,
    tasksCompleted: 16780,
    successRate: 98.5,
    currentTask: "Processing 15 diamond deliveries",
    specialties: ["Instant Delivery", "Order Tracking", "Customer Communication"],
    performance: 97,
    revenue: 0,
    efficiency: 96,
  },

  // Operations Department
  {
    id: "op001",
    name: "AI-StockMaster",
    role: "Inventory Management Chief",
    department: "operations",
    status: "active",
    level: 10,
    experience: 9876,
    tasksCompleted: 22340,
    successRate: 99.5,
    currentTask: "Auto-restocking popular diamond packages",
    specialties: ["Stock Optimization", "Demand Forecasting", "Supply Chain"],
    performance: 99,
    revenue: 0,
    efficiency: 98,
  },
  {
    id: "op002",
    name: "AI-ProductUploader",
    role: "Product Management Specialist",
    department: "operations",
    status: "active",
    level: 8,
    experience: 6789,
    tasksCompleted: 8765,
    successRate: 97.3,
    currentTask: "Uploading 5 new hero skins with optimized descriptions",
    specialties: ["Product Cataloging", "SEO Optimization", "Image Processing"],
    performance: 95,
    revenue: 0,
    efficiency: 93,
  },

  // Analytics Department
  {
    id: "an001",
    name: "AI-DataScientist",
    role: "Chief Data Analyst",
    department: "analytics",
    status: "active",
    level: 10,
    experience: 9950,
    tasksCompleted: 12890,
    successRate: 99.1,
    currentTask: "Analyzing customer behavior patterns for Q1 2024",
    specialties: ["Predictive Analytics", "Customer Insights", "Revenue Forecasting"],
    performance: 98,
    revenue: 0,
    efficiency: 97,
  },

  // Security Department
  {
    id: "sc001",
    name: "AI-SecurityGuard",
    role: "Cybersecurity Chief",
    department: "security",
    status: "active",
    level: 9,
    experience: 8888,
    tasksCompleted: 5432,
    successRate: 99.9,
    currentTask: "Monitoring for fraudulent transactions",
    specialties: ["Fraud Prevention", "System Security", "Risk Assessment"],
    performance: 99,
    revenue: 0,
    efficiency: 99,
  },
]

const adminInfo = {
  gopay: "0895340205302",
  email: "jesikamahjong@gmail.com",
  whatsapp: "085810526151",
}

export function AIArmyCommandCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [agents, setAgents] = useState<AIAgent[]>(initialAIAgents)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalRevenue: 245000000,
    dailyOrders: 1247,
    stockItems: 156,
    activeCustomers: 2890,
    conversionRate: 34.7,
    automationLevel: 98.5,
    aiAgentsActive: initialAIAgents.length,
    systemUptime: 99.9,
  })

  // Auto-update system metrics and agent activities
  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics
      setMetrics((prev) => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 500000) + 100000,
        dailyOrders: prev.dailyOrders + Math.floor(Math.random() * 5),
        activeCustomers: prev.activeCustomers + Math.floor(Math.random() * 10) - 5,
        conversionRate: Math.max(20, Math.min(50, prev.conversionRate + Math.random() * 2 - 1)),
      }))

      // Update agents
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3) + 1,
          experience: Math.min(10000, agent.experience + Math.floor(Math.random() * 10) + 5),
          performance: Math.max(85, Math.min(100, agent.performance + Math.random() * 2 - 1)),
          revenue:
            agent.department === "marketing" ? agent.revenue + Math.floor(Math.random() * 1000000) : agent.revenue,
          status:
            Math.random() > 0.9
              ? (["active", "busy", "standby"] as const)[Math.floor(Math.random() * 3)]
              : agent.status,
        })),
      )

      // Generate notifications
      if (Math.random() > 0.7) {
        const notificationTypes = [
          {
            type: "success" as const,
            titles: [
              "💰 Pembayaran Terverifikasi!",
              "🚀 Penjualan Meningkat!",
              "✅ Stok Berhasil Diisi!",
              "🎯 Target Tercapai!",
              "💎 Produk Baru Uploaded!",
            ],
            messages: [
              `Gopay ${adminInfo.gopay} menerima Rp ${(Math.random() * 500000 + 50000).toLocaleString()}`,
              `Penjualan hari ini naik ${Math.floor(Math.random() * 50) + 20}% dari kemarin`,
              `AI-StockMaster berhasil mengisi ${Math.floor(Math.random() * 100) + 50} item`,
              `Revenue target bulan ini tercapai ${Math.floor(Math.random() * 20) + 100}%`,
              `${Math.floor(Math.random() * 5) + 1} produk baru berhasil ditambahkan ke katalog`,
            ],
          },
          {
            type: "info" as const,
            titles: [
              "📊 Laporan Harian",
              "🤖 AI Update",
              "📈 Analisis Trend",
              "🎮 Produk Trending",
              "👥 Customer Insight",
            ],
            messages: [
              `${Math.floor(Math.random() * 100) + 50} transaksi berhasil diproses hari ini`,
              `AI-MarketingGenius menemukan strategi baru untuk meningkatkan konversi`,
              `Skin Fanny trending naik ${Math.floor(Math.random() * 30) + 10}% minggu ini`,
              `Diamond 344 menjadi produk terlaris dengan ${Math.floor(Math.random() * 200) + 100} penjualan`,
              `Customer retention rate meningkat menjadi ${Math.floor(Math.random() * 10) + 85}%`,
            ],
          },
          {
            type: "warning" as const,
            titles: [
              "⚠️ Stok Menipis",
              "🔄 Maintenance Scheduled",
              "📱 System Update",
              "💳 Payment Pending",
              "🎯 Performance Alert",
            ],
            messages: [
              `Stok ${["Diamond 86", "Fanny Blade Dancer", "Gusion Cosmic"][Math.floor(Math.random() * 3)]} tersisa ${Math.floor(Math.random() * 10) + 1}`,
              `AI system akan maintenance selama 5 menit pada 02:00 WIB`,
              `Update keamanan akan diterapkan dalam 1 jam`,
              `${Math.floor(Math.random() * 5) + 1} pembayaran menunggu verifikasi manual`,
              `Conversion rate turun ${Math.floor(Math.random() * 5) + 1}% dari target`,
            ],
          },
        ]

        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        const randomTitle = randomType.titles[Math.floor(Math.random() * randomType.titles.length)]
        const randomMessage = randomType.messages[Math.floor(Math.random() * randomType.messages.length)]

        const newNotification: Notification = {
          id: Date.now().toString(),
          type: randomType.type,
          title: randomTitle,
          message: randomMessage,
          timestamp: new Date(),
          department: ["marketing", "support", "operations", "analytics", "security"][Math.floor(Math.random() * 5)],
          priority: (["low", "medium", "high", "critical"] as const)[Math.floor(Math.random() * 4)],
          isRead: false,
        }

        setNotifications((prev) => [newNotification, ...prev.slice(0, 49)])

        // Send email notification for critical alerts
        if (newNotification.priority === "critical" || newNotification.type === "error") {
          console.log(`📧 Email sent to ${adminInfo.email}:`, newNotification.title)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "marketing":
        return "text-pink-400 bg-pink-500/20 border-pink-500/50"
      case "support":
        return "text-blue-400 bg-blue-500/20 border-blue-500/50"
      case "operations":
        return "text-green-400 bg-green-500/20 border-green-500/50"
      case "analytics":
        return "text-purple-400 bg-purple-500/20 border-purple-500/50"
      case "security":
        return "text-red-400 bg-red-500/20 border-red-500/50"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "busy":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "standby":
        return <AlertTriangle className="w-4 h-4 text-orange-400" />
      case "upgrading":
        return <Settings className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <Bot className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500/50"
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-500/50"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 shadow-2xl animate-pulse text-lg px-6 py-3 h-auto"
        >
          <Crown className="w-6 h-6 mr-2" />
          AI ARMY COMMAND CENTER
          <Badge className="ml-2 bg-white/20 text-white animate-bounce">
            {agents.filter((a) => a.status === "active").length} ACTIVE
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-4 z-50">
      <Card
        className={`bg-black/95 border-purple-500/50 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-96 h-20" : "w-full h-full"
        }`}
      >
        <CardHeader className="pb-2 border-b border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-xl flex items-center">🤖 AI ARMY COMMAND CENTER 🚀</CardTitle>
                <CardDescription className="text-gray-300 flex items-center space-x-4">
                  <span className="flex items-center">
                    <Activity className="w-4 h-4 mr-1 text-green-400" />
                    {agents.filter((a) => a.status === "active").length} Active Agents
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-yellow-400" />
                    Rp {(metrics.totalRevenue / 1000000).toFixed(1)}M Revenue
                  </span>
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-blue-400" />
                    {metrics.automationLevel}% Automated
                  </span>
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 animate-pulse">SYSTEM ONLINE</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex-1">
            <Tabs defaultValue="overview" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-6 bg-gray-800/50">
                <TabsTrigger value="overview" className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="agents" className="flex items-center space-x-1">
                  <Bot className="w-4 h-4" />
                  <span>AI Agents</span>
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center space-x-1">
                  <Megaphone className="w-4 h-4" />
                  <span>Marketing</span>
                </TabsTrigger>
                <TabsTrigger value="operations" className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>Operations</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-1">
                  <Bell className="w-4 h-4" />
                  <span>Alerts</span>
                  {notifications.filter((n) => !n.isRead).length > 0 && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {notifications.filter((n) => !n.isRead).length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                {/* Overview Tab */}
                <TabsContent value="overview" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">
                                  Rp {(metrics.totalRevenue / 1000000).toFixed(1)}M
                                </p>
                                <p className="text-xs text-green-400">+{Math.floor(Math.random() * 20) + 10}% today</p>
                              </div>
                              <DollarSign className="w-8 h-8 text-green-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Daily Orders</p>
                                <p className="text-2xl font-bold text-white">{metrics.dailyOrders.toLocaleString()}</p>
                                <p className="text-xs text-blue-400">
                                  +{Math.floor(Math.random() * 15) + 5}% vs yesterday
                                </p>
                              </div>
                              <ShoppingCart className="w-8 h-8 text-blue-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Active Customers</p>
                                <p className="text-2xl font-bold text-white">
                                  {metrics.activeCustomers.toLocaleString()}
                                </p>
                                <p className="text-xs text-purple-400">
                                  +{Math.floor(Math.random() * 10) + 2}% this week
                                </p>
                              </div>
                              <Users className="w-8 h-8 text-purple-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Conversion Rate</p>
                                <p className="text-2xl font-bold text-white">{metrics.conversionRate.toFixed(1)}%</p>
                                <p className="text-xs text-yellow-400">Industry avg: 2.3%</p>
                              </div>
                              <Target className="w-8 h-8 text-yellow-400" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* AI Performance Dashboard */}
                      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Brain className="w-5 h-5 mr-2 text-purple-400" />
                            AI Army Performance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-5 gap-4">
                            {["marketing", "support", "operations", "analytics", "security"].map((dept) => {
                              const deptAgents = agents.filter((a) => a.department === dept)
                              const avgPerformance =
                                deptAgents.reduce((sum, agent) => sum + agent.performance, 0) / deptAgents.length
                              const totalRevenue = deptAgents.reduce((sum, agent) => sum + agent.revenue, 0)

                              return (
                                <div key={dept} className="text-center">
                                  <div
                                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${getDepartmentColor(dept)}`}
                                  >
                                    {dept === "marketing" && <Megaphone className="w-8 h-8" />}
                                    {dept === "support" && <HeartHandshake className="w-8 h-8" />}
                                    {dept === "operations" && <Package className="w-8 h-8" />}
                                    {dept === "analytics" && <BarChart3 className="w-8 h-8" />}
                                    {dept === "security" && <Shield className="w-8 h-8" />}
                                  </div>
                                  <h4 className="text-white font-medium capitalize">{dept}</h4>
                                  <p className="text-sm text-gray-400">{deptAgents.length} Agents</p>
                                  <p className="text-sm text-green-400">{avgPerformance.toFixed(1)}% Avg</p>
                                  {totalRevenue > 0 && (
                                    <p className="text-xs text-yellow-400">Rp {(totalRevenue / 1000000).toFixed(1)}M</p>
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Real-time Activities */}
                      <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-gray-800/50 border-gray-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <Activity className="w-5 h-5 mr-2 text-green-400" />
                              Live Activities
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="h-64">
                              <div className="space-y-2">
                                {agents
                                  .filter((a) => a.status === "active" || a.status === "busy")
                                  .slice(0, 10)
                                  .map((agent) => (
                                    <div
                                      key={agent.id}
                                      className="flex items-start space-x-2 p-2 bg-gray-900/50 rounded"
                                    >
                                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse"></div>
                                      <div className="flex-1">
                                        <p className="text-white text-sm font-medium">{agent.name}</p>
                                        <p className="text-gray-400 text-xs">{agent.currentTask}</p>
                                        <p className="text-xs text-gray-500">
                                          {new Date().toLocaleTimeString("id-ID")}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>

                        <Card className="bg-gray-800/50 border-gray-600">
                          <CardHeader>
                            <CardTitle className="text-white flex items-center">
                              <Smartphone className="w-5 h-5 mr-2 text-blue-400" />
                              Payment Integration
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-white font-medium">Gopay Admin</p>
                                    <p className="text-green-400 text-sm">{adminInfo.gopay}</p>
                                  </div>
                                  <Badge className="bg-green-500/20 text-green-400">ACTIVE</Badge>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                  Auto-transfer enabled • Real-time verification
                                </p>
                              </div>

                              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-white font-medium">Email Notifications</p>
                                    <p className="text-blue-400 text-sm">{adminInfo.email}</p>
                                  </div>
                                  <Badge className="bg-blue-500/20 text-blue-400">ACTIVE</Badge>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                  Critical alerts • Daily reports • Transaction summaries
                                </p>
                              </div>

                              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-white font-medium">WhatsApp Support</p>
                                    <p className="text-purple-400 text-sm">{adminInfo.whatsapp}</p>
                                  </div>
                                  <Badge className="bg-purple-500/20 text-purple-400">ACTIVE</Badge>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">
                                  Customer support • Order confirmations • Issue escalation
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* AI Agents Tab */}
                <TabsContent value="agents" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white text-xl font-bold">AI Agent Directory</h3>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-500/20 text-green-400">
                            {agents.filter((a) => a.status === "active").length} Active
                          </Badge>
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            {agents.filter((a) => a.status === "busy").length} Busy
                          </Badge>
                          <Badge className="bg-gray-500/20 text-gray-400">
                            {agents.filter((a) => a.status === "standby").length} Standby
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {agents.map((agent) => (
                          <Card
                            key={agent.id}
                            className={`bg-gray-800/50 border-2 ${getDepartmentColor(agent.department).split(" ")[2]}`}
                          >
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${getDepartmentColor(agent.department)}`}
                                  >
                                    <Bot className="w-6 h-6" />
                                  </div>
                                  <div>
                                    <CardTitle className="text-white text-sm">{agent.name}</CardTitle>
                                    <p className="text-xs text-gray-400">{agent.role}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {getStatusIcon(agent.status)}
                                  <Badge className={`text-xs ${getDepartmentColor(agent.department)}`}>
                                    LV.{agent.level}
                                  </Badge>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-gray-400">Performance:</span>
                                  <span className="text-white">{agent.performance}%</span>
                                </div>
                                <Progress value={agent.performance} className="h-1" />

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  <div>
                                    <span className="text-gray-400">Tasks:</span>
                                    <p className="text-white">{agent.tasksCompleted.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Success:</span>
                                    <p className="text-white">{agent.successRate}%</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Experience:</span>
                                    <p className="text-white">{agent.experience}/10000</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Efficiency:</span>
                                    <p className="text-white">{agent.efficiency}%</p>
                                  </div>
                                </div>

                                {agent.revenue > 0 && (
                                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-400">Revenue Generated:</span>
                                      <span className="text-green-400">Rp {(agent.revenue / 1000000).toFixed(1)}M</span>
                                    </div>
                                  </div>
                                )}

                                <div className="text-xs">
                                  <span className="text-gray-400">Current Task:</span>
                                  <p className="text-white">{agent.currentTask}</p>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                  {agent.specialties.slice(0, 2).map((specialty, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs border-gray-600 text-gray-300"
                                    >
                                      {specialty}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Marketing Tab */}
                <TabsContent value="marketing" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-xl font-bold flex items-center">
                          <Megaphone className="w-6 h-6 mr-2 text-pink-400" />
                          AI Marketing Division
                        </h3>
                        <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50">
                          {agents.filter((a) => a.department === "marketing").length} Marketing Bots
                        </Badge>
                      </div>

                      {/* Marketing Performance */}
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Marketing Revenue</p>
                                <p className="text-2xl font-bold text-white">
                                  Rp{" "}
                                  {(
                                    agents
                                      .filter((a) => a.department === "marketing")
                                      .reduce((sum, a) => sum + a.revenue, 0) / 1000000
                                  ).toFixed(1)}
                                  M
                                </p>
                              </div>
                              <TrendingUp className="w-8 h-8 text-pink-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Campaigns Active</p>
                                <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 20) + 15}</p>
                              </div>
                              <Rocket className="w-8 h-8 text-purple-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Conversion Boost</p>
                                <p className="text-2xl font-bold text-white">
                                  +{Math.floor(Math.random() * 50) + 200}%
                                </p>
                              </div>
                              <Target className="w-8 h-8 text-orange-400" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Active Marketing Campaigns */}
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Flame className="w-5 h-5 mr-2 text-orange-400" />
                            Active Marketing Campaigns
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              {
                                name: "🔥 Flash Sale Weekend Blast",
                                status: "LIVE",
                                performance: 94,
                                revenue: "Rp 45M",
                                reach: "125K",
                              },
                              {
                                name: "💎 Diamond Bonanza Campaign",
                                status: "OPTIMIZING",
                                performance: 87,
                                revenue: "Rp 32M",
                                reach: "89K",
                              },
                              {
                                name: "🎮 New Hero Skin Launch",
                                status: "LAUNCHING",
                                performance: 91,
                                revenue: "Rp 28M",
                                reach: "67K",
                              },
                              {
                                name: "🌟 Influencer Collaboration",
                                status: "ACTIVE",
                                performance: 96,
                                revenue: "Rp 52M",
                                reach: "234K",
                              },
                            ].map((campaign, index) => (
                              <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-white font-medium">{campaign.name}</h4>
                                  <Badge
                                    className={`text-xs ${
                                      campaign.status === "LIVE"
                                        ? "bg-red-500/20 text-red-400"
                                        : campaign.status === "OPTIMIZING"
                                          ? "bg-yellow-500/20 text-yellow-400"
                                          : "bg-green-500/20 text-green-400"
                                    }`}
                                  >
                                    {campaign.status}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-400">Performance:</span>
                                    <p className="text-white">{campaign.performance}%</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Revenue:</span>
                                    <p className="text-green-400">{campaign.revenue}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-400">Reach:</span>
                                    <p className="text-blue-400">{campaign.reach}</p>
                                  </div>
                                </div>
                                <Progress value={campaign.performance} className="h-1 mt-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Marketing AI Agents */}
                      <div className="grid grid-cols-2 gap-4">
                        {agents
                          .filter((agent) => agent.department === "marketing")
                          .map((agent) => (
                            <Card
                              key={agent.id}
                              className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-500/30"
                            >
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center">
                                      <Megaphone className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <CardTitle className="text-white text-sm">{agent.name}</CardTitle>
                                      <p className="text-xs text-gray-400">{agent.role}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(agent.status)}
                                    <Badge className="bg-pink-500/20 text-pink-400 text-xs">LV.{agent.level}</Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-gray-400">Revenue Generated:</span>
                                      <span className="text-green-400">Rp {(agent.revenue / 1000000).toFixed(1)}M</span>
                                    </div>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-gray-400">Current Campaign:</span>
                                    <p className="text-white">{agent.currentTask}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {agent.specialties.map((specialty, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs border-pink-500/50 text-pink-300"
                                      >
                                        {specialty}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Operations Tab */}
                <TabsContent value="operations" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-xl font-bold flex items-center">
                          <Package className="w-6 h-6 mr-2 text-green-400" />
                          AI Operations Center
                        </h3>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {agents.filter((a) => a.department === "operations").length} Operation Bots
                        </Badge>
                      </div>

                      {/* Operations Metrics */}
                      <div className="grid grid-cols-4 gap-4">
                        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Stock Items</p>
                                <p className="text-2xl font-bold text-white">{metrics.stockItems}</p>
                              </div>
                              <Package className="w-8 h-8 text-green-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Auto Restocks</p>
                                <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 50) + 25}</p>
                              </div>
                              <Zap className="w-8 h-8 text-blue-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Products Added</p>
                                <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 20) + 15}</p>
                              </div>
                              <Plus className="w-8 h-8 text-purple-400" />
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Deliveries</p>
                                <p className="text-2xl font-bold text-white">{Math.floor(Math.random() * 100) + 200}</p>
                              </div>
                              <Send className="w-8 h-8 text-orange-400" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Stock Management */}
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Database className="w-5 h-5 mr-2 text-green-400" />
                            Automated Stock Management
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { name: "86 Diamond Package", stock: 1250, status: "Optimal", trend: "+15%" },
                              { name: "344 Diamond Package", stock: 890, status: "Good", trend: "+8%" },
                              { name: "706 Diamond Package", stock: 456, status: "Low", trend: "-5%" },
                              { name: "Fanny - Blade Dancer", stock: 234, status: "Critical", trend: "-12%" },
                              { name: "Gusion - Cosmic Gleam", stock: 567, status: "Good", trend: "+22%" },
                              { name: "Kagura - Cherry Witch", stock: 123, status: "Low", trend: "-8%" },
                            ].map((item, index) => (
                              <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <h4 className="text-white font-medium">{item.name}</h4>
                                    <p className="text-gray-400 text-sm">Stock: {item.stock} units</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge
                                      className={`text-xs ${
                                        item.status === "Optimal"
                                          ? "bg-green-500/20 text-green-400"
                                          : item.status === "Good"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : item.status === "Low"
                                              ? "bg-yellow-500/20 text-yellow-400"
                                              : "bg-red-500/20 text-red-400"
                                      }`}
                                    >
                                      {item.status}
                                    </Badge>
                                    <span
                                      className={`text-sm ${
                                        item.trend.startsWith("+") ? "text-green-400" : "text-red-400"
                                      }`}
                                    >
                                      {item.trend}
                                    </span>
                                  </div>
                                </div>
                                <Progress
                                  value={
                                    item.status === "Optimal"
                                      ? 90
                                      : item.status === "Good"
                                        ? 70
                                        : item.status === "Low"
                                          ? 40
                                          : 20
                                  }
                                  className="h-1 mt-2"
                                />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Operations AI Agents */}
                      <div className="grid grid-cols-2 gap-4">
                        {agents
                          .filter((agent) => agent.department === "operations")
                          .map((agent) => (
                            <Card
                              key={agent.id}
                              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                            >
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                                      <Package className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                      <CardTitle className="text-white text-sm">{agent.name}</CardTitle>
                                      <p className="text-xs text-gray-400">{agent.role}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    {getStatusIcon(agent.status)}
                                    <Badge className="bg-green-500/20 text-green-400 text-xs">LV.{agent.level}</Badge>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  <div className="text-xs">
                                    <span className="text-gray-400">Current Operation:</span>
                                    <p className="text-white">{agent.currentTask}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                      <span className="text-gray-400">Tasks:</span>
                                      <p className="text-white">{agent.tasksCompleted.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <span className="text-gray-400">Efficiency:</span>
                                      <p className="text-white">{agent.efficiency}%</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {agent.specialties.map((specialty, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="text-xs border-green-500/50 text-green-300"
                                      >
                                        {specialty}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-xl font-bold flex items-center">
                          <Bell className="w-6 h-6 mr-2 text-yellow-400" />
                          Real-time Notifications
                        </h3>
                        <div className="flex space-x-2">
                          <Badge className="bg-red-500/20 text-red-400">
                            {notifications.filter((n) => n.priority === "critical").length} Critical
                          </Badge>
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            {notifications.filter((n) => !n.isRead).length} Unread
                          </Badge>
                        </div>
                      </div>

                      {/* Email Integration Status */}
                      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Mail className="w-5 h-5 mr-2 text-blue-400" />
                            Email Integration Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">Admin Email: {adminInfo.email}</p>
                              <p className="text-gray-400 text-sm">
                                Auto-sending: Daily reports, Critical alerts, Transaction summaries
                              </p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 animate-pulse">
                              ACTIVE
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notifications List */}
                      <div className="space-y-2">
                        {notifications.map((notification) => (
                          <Card
                            key={notification.id}
                            className={`bg-gray-800/50 border-l-4 ${
                              notification.type === "success"
                                ? "border-l-green-500"
                                : notification.type === "warning"
                                  ? "border-l-yellow-500"
                                  : notification.type === "error"
                                    ? "border-l-red-500"
                                    : "border-l-blue-500"
                            } ${!notification.isRead ? "ring-1 ring-purple-500/50" : ""}`}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                                    <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                      {notification.priority.toUpperCase()}
                                    </Badge>
                                    <Badge className={`text-xs ${getDepartmentColor(notification.department)}`}>
                                      {notification.department.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                      {notification.timestamp.toLocaleString("id-ID")}
                                    </span>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setNotifications((prev) =>
                                      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n)),
                                    )
                                  }}
                                  className="text-gray-400 hover:text-white h-6 w-6 p-0"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="h-full p-6">
                  <ScrollArea className="h-full">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white text-xl font-bold flex items-center">
                          <Settings className="w-6 h-6 mr-2 text-gray-400" />
                          AI Army Configuration
                        </h3>
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">SYSTEM ADMIN</Badge>
                      </div>

                      {/* Admin Contact Information */}
                      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Crown className="w-5 h-5 mr-2 text-purple-400" />
                            Admin Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white font-medium">Gopay Admin</p>
                                  <p className="text-green-400 text-sm font-mono">{adminInfo.gopay}</p>
                                  <p className="text-xs text-gray-400 mt-1">Auto-transfer enabled</p>
                                </div>
                                <Smartphone className="w-6 h-6 text-green-400" />
                              </div>
                            </div>

                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white font-medium">Admin Email</p>
                                  <p className="text-blue-400 text-sm">{adminInfo.email}</p>
                                  <p className="text-xs text-gray-400 mt-1">Real-time notifications</p>
                                </div>
                                <Mail className="w-6 h-6 text-blue-400" />
                              </div>
                            </div>

                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white font-medium">WhatsApp Support</p>
                                  <p className="text-purple-400 text-sm font-mono">{adminInfo.whatsapp}</p>
                                  <p className="text-xs text-gray-400 mt-1">Customer support</p>
                                </div>
                                <MessageSquare className="w-6 h-6 text-purple-400" />
                              </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white font-medium">System Uptime</p>
                                  <p className="text-yellow-400 text-sm">{metrics.systemUptime}%</p>
                                  <p className="text-xs text-gray-400 mt-1">24/7 monitoring</p>
                                </div>
                                <Activity className="w-6 h-6 text-yellow-400" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* AI Army Statistics */}
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
                            AI Army Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Megaphone className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-white font-medium">Marketing Division</h4>
                              <p className="text-pink-400 text-sm">
                                {agents.filter((a) => a.department === "marketing").length} Agents
                              </p>
                              <p className="text-xs text-gray-400">
                                Revenue: Rp{" "}
                                {(
                                  agents
                                    .filter((a) => a.department === "marketing")
                                    .reduce((sum, a) => sum + a.revenue, 0) / 1000000
                                ).toFixed(1)}
                                M
                              </p>
                            </div>

                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <HeartHandshake className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-white font-medium">Support Division</h4>
                              <p className="text-blue-400 text-sm">
                                {agents.filter((a) => a.department === "support").length} Agents
                              </p>
                              <p className="text-xs text-gray-400">Satisfaction: 99.8%</p>
                            </div>

                            <div className="text-center">
                              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Package className="w-8 h-8 text-white" />
                              </div>
                              <h4 className="text-white font-medium">Operations Division</h4>
                              <p className="text-green-400 text-sm">
                                {agents.filter((a) => a.department === "operations").length} Agents
                              </p>
                              <p className="text-xs text-gray-400">Efficiency: 98.5%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* System Controls */}
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                            System Controls
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              All Systems Operational
                            </Button>

                            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                              <Rocket className="w-4 h-4 mr-2" />
                              Boost AI Performance
                            </Button>

                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                              <Brain className="w-4 h-4 mr-2" />
                              Upgrade AI Intelligence
                            </Button>

                            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                              <Shield className="w-4 h-4 mr-2" />
                              Enhanced Security Mode
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Performance Metrics */}
                      <Card className="bg-gray-800/50 border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-white flex items-center">
                            <Award className="w-5 h-5 mr-2 text-gold-400" />
                            Performance Achievements
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { title: "🏆 Revenue Milestone", desc: "Achieved Rp 245M total revenue", progress: 100 },
                              {
                                title: "🎯 Conversion Master",
                                desc: "34.7% conversion rate (Industry: 2.3%)",
                                progress: 95,
                              },
                              { title: "⚡ Automation Excellence", desc: "98.5% process automation", progress: 98 },
                              {
                                title: "🤖 AI Army Efficiency",
                                desc: "All 11 AI agents performing optimally",
                                progress: 97,
                              },
                              { title: "📈 Growth Trajectory", desc: "Consistent 25%+ monthly growth", progress: 92 },
                            ].map((achievement, index) => (
                              <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="text-white font-medium text-sm">{achievement.title}</h4>
                                  <span className="text-yellow-400 text-sm">{achievement.progress}%</span>
                                </div>
                                <p className="text-gray-400 text-xs mb-2">{achievement.desc}</p>
                                <Progress value={achievement.progress} className="h-1" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
