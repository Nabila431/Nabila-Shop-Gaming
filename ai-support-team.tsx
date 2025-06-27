"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Bot,
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Brain,
  BarChart3,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface StockItem {
  id: string
  type: "diamond" | "skin"
  name: string
  price: number
  stock: number
  sold: number
  status: "available" | "low_stock" | "out_of_stock"
  autoRestock: boolean
  minStock: number
}

interface PurchaseOrder {
  id: string
  customerId: string
  customerName: string
  item: string
  quantity: number
  total: number
  status: "pending" | "processing" | "completed" | "failed"
  paymentMethod: string
  timestamp: Date
  aiProcessed: boolean
}

interface AIAgent {
  id: string
  name: string
  role: string
  status: "active" | "busy" | "offline"
  tasksCompleted: number
  currentTask: string
}

const initialStock: StockItem[] = [
  {
    id: "1",
    type: "diamond",
    name: "86 Diamond",
    price: 15000,
    stock: 1000,
    sold: 156,
    status: "available",
    autoRestock: true,
    minStock: 100,
  },
  {
    id: "2",
    type: "diamond",
    name: "344 Diamond",
    price: 60000,
    stock: 50,
    sold: 234,
    status: "low_stock",
    autoRestock: true,
    minStock: 100,
  },
  {
    id: "3",
    type: "skin",
    name: "Fanny - Blade Dancer",
    price: 899,
    stock: 25,
    sold: 89,
    status: "low_stock",
    autoRestock: false,
    minStock: 50,
  },
  {
    id: "4",
    type: "skin",
    name: "Gusion - Cosmic Gleam",
    price: 1899,
    stock: 0,
    sold: 45,
    status: "out_of_stock",
    autoRestock: false,
    minStock: 30,
  },
]

const aiAgents: AIAgent[] = [
  {
    id: "1",
    name: "AI-FormBot",
    role: "Form Processing",
    status: "active",
    tasksCompleted: 1247,
    currentTask: "Processing customer registration forms",
  },
  {
    id: "2",
    name: "AI-StockBot",
    role: "Stock Management",
    status: "active",
    tasksCompleted: 892,
    currentTask: "Auto-restocking diamond packages",
  },
  {
    id: "3",
    name: "AI-SalesBot",
    role: "Purchase Processing",
    status: "busy",
    tasksCompleted: 2156,
    currentTask: "Processing 5 pending orders",
  },
  {
    id: "4",
    name: "AI-AnalyticsBot",
    role: "Data Analysis",
    status: "active",
    tasksCompleted: 567,
    currentTask: "Analyzing sales patterns",
  },
]

export function AISupportTeam() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [stock, setStock] = useState<StockItem[]>(initialStock)
  const [orders, setOrders] = useState<PurchaseOrder[]>([])
  const [agents, setAgents] = useState<AIAgent[]>(aiAgents)

  // Auto-generate orders and process them
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random orders
      if (Math.random() > 0.7) {
        const newOrder: PurchaseOrder = {
          id: Date.now().toString(),
          customerId: `user_${Math.floor(Math.random() * 1000)}`,
          customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
          item: stock[Math.floor(Math.random() * stock.length)].name,
          quantity: Math.floor(Math.random() * 3) + 1,
          total: Math.floor(Math.random() * 100000) + 15000,
          status: "pending",
          paymentMethod: "Gopay",
          timestamp: new Date(),
          aiProcessed: false,
        }
        setOrders((prev) => [newOrder, ...prev.slice(0, 19)])
      }

      // Auto-process orders
      setOrders((prev) =>
        prev.map((order) => {
          if (order.status === "pending" && !order.aiProcessed) {
            return {
              ...order,
              status: "processing",
              aiProcessed: true,
            }
          }
          if (order.status === "processing" && Math.random() > 0.5) {
            return {
              ...order,
              status: "completed",
            }
          }
          return order
        }),
      )

      // Auto-restock
      setStock((prev) =>
        prev.map((item) => {
          if (item.autoRestock && item.stock < item.minStock) {
            return {
              ...item,
              stock: item.stock + 500,
              status: "available",
            }
          }
          return item
        }),
      )

      // Update agent tasks
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [stock])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
      case "completed":
      case "active":
        return "text-green-400"
      case "low_stock":
      case "processing":
      case "busy":
        return "text-yellow-400"
      case "out_of_stock":
      case "failed":
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
      case "completed":
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "low_stock":
      case "processing":
      case "busy":
        return <Clock className="w-4 h-4" />
      case "out_of_stock":
      case "failed":
      case "offline":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-80 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg animate-pulse"
        >
          <Brain className="w-4 h-4 mr-2" />
          AI Support Team
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-80 z-40">
      <Card
        className={`bg-black/95 border-emerald-500/50 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-[500px] h-[700px]"
        }`}
      >
        <CardHeader className="pb-2 border-b border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">AI Support Team</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-400">4 Agents Active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Tab Navigation */}
            <div className="flex border-b border-emerald-500/30">
              {[
                { id: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
                { id: "agents", label: "AI Agents", icon: <Bot className="w-4 h-4" /> },
                { id: "stock", label: "Stock", icon: <Package className="w-4 h-4" /> },
                { id: "orders", label: "Orders", icon: <ShoppingCart className="w-4 h-4" /> },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-none border-b-2 ${
                    activeTab === tab.id
                      ? "border-emerald-400 text-emerald-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span className="ml-1 text-xs">{tab.label}</span>
                </Button>
              ))}
            </div>

            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-[580px] p-4">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Total Orders</p>
                            <p className="text-lg font-bold text-white">{orders.length}</p>
                          </div>
                          <ShoppingCart className="w-6 h-6 text-emerald-400" />
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">AI Processed</p>
                            <p className="text-lg font-bold text-white">{orders.filter((o) => o.aiProcessed).length}</p>
                          </div>
                          <Bot className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>

                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Stock Items</p>
                            <p className="text-lg font-bold text-white">{stock.length}</p>
                          </div>
                          <Package className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Automation</p>
                            <p className="text-lg font-bold text-white">98%</p>
                          </div>
                          <Zap className="w-6 h-6 text-yellow-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-emerald-400" />
                        AI Performance Today
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Forms Processed</span>
                          <span className="text-emerald-400">1,247</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Auto-Restocks</span>
                          <span className="text-emerald-400">23</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Orders Completed</span>
                          <span className="text-emerald-400">2,156</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Success Rate</span>
                          <span className="text-emerald-400">99.8%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">Recent AI Activities</h4>
                      <div className="space-y-2">
                        {[
                          "Auto-processed customer form for User #1234",
                          "Restocked 344 Diamond package (500 units)",
                          "Completed order #5678 automatically",
                          "Updated stock levels for 3 items",
                          "Generated sales report for admin",
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start space-x-2 bg-gray-800/30 rounded p-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0"></div>
                            <p className="text-white text-xs">{activity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Agents Tab */}
                {activeTab === "agents" && (
                  <div className="space-y-4">
                    {agents.map((agent) => (
                      <Card key={agent.id} className="bg-gray-800/50 border-emerald-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-white text-sm">{agent.name}</CardTitle>
                                <p className="text-xs text-gray-400">{agent.role}</p>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(agent.status)} bg-transparent border-current`}>
                              {getStatusIcon(agent.status)}
                              <span className="ml-1">{agent.status}</span>
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-400">Tasks Completed</span>
                              <span className="text-emerald-400">{agent.tasksCompleted.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-300">
                              <span className="text-gray-400">Current Task:</span> {agent.currentTask}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Stock Management Tab */}
                {activeTab === "stock" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">Stock Management</h4>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                        onClick={() => {
                          setStock((prev) =>
                            prev.map((item) => ({
                              ...item,
                              stock: item.stock + 100,
                              status: "available",
                            })),
                          )
                        }}
                      >
                        <Package className="w-3 h-3 mr-1" />
                        Auto Restock All
                      </Button>
                    </div>

                    {stock.map((item) => (
                      <Card key={item.id} className="bg-gray-800/50 border-emerald-500/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h5 className="text-white font-medium text-sm">{item.name}</h5>
                              <p className="text-xs text-gray-400">
                                {item.type === "diamond" ? "Diamond Package" : "Hero Skin"}
                              </p>
                            </div>
                            <Badge className={`${getStatusColor(item.status)} bg-transparent border-current text-xs`}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{item.status.replace("_", " ")}</span>
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">Stock:</span>
                              <p className="text-white font-medium">{item.stock}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Sold:</span>
                              <p className="text-white font-medium">{item.sold}</p>
                            </div>
                            <div>
                              <span className="text-gray-400">Price:</span>
                              <p className="text-white font-medium">
                                {item.type === "diamond" ? `Rp ${item.price.toLocaleString()}` : `${item.price} 💎`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">Auto-Restock:</span>
                              <Badge variant={item.autoRestock ? "default" : "secondary"} className="text-xs">
                                {item.autoRestock ? "ON" : "OFF"}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-400">Min: {item.minStock}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">Order Processing</h4>
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
                        {orders.filter((o) => o.status === "processing").length} Processing
                      </Badge>
                    </div>

                    {orders.slice(0, 10).map((order) => (
                      <Card key={order.id} className="bg-gray-800/50 border-emerald-500/30">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h5 className="text-white font-medium text-sm">#{order.id.slice(-4)}</h5>
                              <p className="text-xs text-gray-400">{order.customerName}</p>
                            </div>
                            <Badge className={`${getStatusColor(order.status)} bg-transparent border-current text-xs`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Item:</span>
                              <span className="text-white">{order.item}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Total:</span>
                              <span className="text-white">Rp {order.total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Payment:</span>
                              <span className="text-white">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">AI Processed:</span>
                              <span className={order.aiProcessed ? "text-emerald-400" : "text-yellow-400"}>
                                {order.aiProcessed ? "Yes" : "Pending"}
                              </span>
                            </div>
                          </div>

                          <div className="text-xs text-gray-500 mt-2">{order.timestamp.toLocaleString("id-ID")}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
