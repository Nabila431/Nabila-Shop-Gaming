"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  BarChart3,
  Bot,
  Clock,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: "diamond" | "skin" | "bundle"
  currentStock: number
  minThreshold: number
  maxCapacity: number
  demandForecast: number
  restockSpeed: number
  popularity: number
  revenue24h: number
  status: "healthy" | "low" | "critical" | "restocking"
  autoRestock: boolean
  lastRestocked: Date
  nextRestock: Date
}

interface AIInventoryBot {
  id: string
  name: string
  function: string
  status: "active" | "processing" | "analyzing"
  itemsManaged: number
  efficiency: number
  currentTask: string
}

const inventoryBots: AIInventoryBot[] = [
  {
    id: "1",
    name: "AI-StockBot",
    function: "Stock Monitoring",
    status: "active",
    itemsManaged: 156,
    efficiency: 98.5,
    currentTask: "Monitoring diamond packages",
  },
  {
    id: "2",
    name: "AI-DemandBot",
    function: "Demand Forecasting",
    status: "analyzing",
    itemsManaged: 89,
    efficiency: 96.2,
    currentTask: "Analyzing weekend patterns",
  },
  {
    id: "3",
    name: "AI-RestockBot",
    function: "Auto Restocking",
    status: "processing",
    itemsManaged: 234,
    efficiency: 99.1,
    currentTask: "Restocking 5 critical items",
  },
]

const generateInventoryItem = (): InventoryItem => {
  const items = [
    "86 Diamond Package",
    "172 Diamond Package",
    "344 Diamond Package",
    "706 Diamond Package",
    "Fanny - Blade Dancer",
    "Gusion - Cosmic Gleam",
    "Kagura - Cherry Witch",
    "Ling - Street Punk",
    "Granger - Lightborn",
    "Chou - King of Fighters",
  ]

  const categories = ["diamond", "skin", "bundle"] as const
  const name = items[Math.floor(Math.random() * items.length)]
  const category = name.includes("Diamond") ? "diamond" : "skin"

  const maxCapacity = Math.floor(Math.random() * 1000) + 500
  const currentStock = Math.floor(Math.random() * maxCapacity)
  const minThreshold = Math.floor(maxCapacity * 0.2)

  let status: InventoryItem["status"] = "healthy"
  if (currentStock <= minThreshold * 0.5) status = "critical"
  else if (currentStock <= minThreshold) status = "low"

  return {
    id: Date.now().toString() + Math.random(),
    name,
    category,
    currentStock,
    minThreshold,
    maxCapacity,
    demandForecast: Math.floor(Math.random() * 100) + 20,
    restockSpeed: Math.floor(Math.random() * 50) + 10,
    popularity: Math.floor(Math.random() * 100),
    revenue24h: Math.floor(Math.random() * 10000000) + 1000000,
    status,
    autoRestock: Math.random() > 0.3,
    lastRestocked: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    nextRestock: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000),
  }
}

export function AIInventoryManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [bots, setBots] = useState<AIInventoryBot[]>(inventoryBots)
  const [activeTab, setActiveTab] = useState("inventory")

  // Initialize inventory
  useEffect(() => {
    setInventory(Array.from({ length: 15 }, generateInventoryItem))
  }, [])

  // Auto-manage inventory
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stock levels based on demand
      setInventory((prev) =>
        prev.map((item) => {
          let newStock = item.currentStock
          const demand = Math.floor(Math.random() * item.demandForecast * 0.1)
          newStock = Math.max(0, newStock - demand)

          // Auto-restock if enabled and below threshold
          if (item.autoRestock && newStock <= item.minThreshold) {
            const restockAmount = Math.floor(item.maxCapacity * 0.8) - newStock
            newStock = Math.min(item.maxCapacity, newStock + restockAmount)
          }

          // Update status
          let status: InventoryItem["status"] = "healthy"
          if (newStock <= item.minThreshold * 0.5) status = "critical"
          else if (newStock <= item.minThreshold) status = "low"
          else if (item.autoRestock && newStock < item.currentStock) status = "restocking"

          return {
            ...item,
            currentStock: newStock,
            status,
            popularity: Math.min(100, item.popularity + Math.random() * 10 - 5),
            revenue24h: item.revenue24h + Math.floor(Math.random() * 500000),
            lastRestocked: status === "restocking" ? new Date() : item.lastRestocked,
          }
        }),
      )

      // Update bots
      setBots((prev) =>
        prev.map((bot) => ({
          ...bot,
          itemsManaged: bot.itemsManaged + Math.floor(Math.random() * 3),
          efficiency: Math.min(100, bot.efficiency + Math.random() * 2 - 1),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "active":
        return "text-green-400 bg-green-500/20 border-green-500/50"
      case "low":
      case "processing":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50"
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500/50"
      case "restocking":
      case "analyzing":
        return "text-blue-400 bg-blue-500/20 border-blue-500/50"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4" />
      case "low":
        return <AlertTriangle className="w-4 h-4" />
      case "critical":
        return <AlertTriangle className="w-4 h-4" />
      case "restocking":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const criticalItems = inventory.filter((item) => item.status === "critical").length
  const lowStockItems = inventory.filter((item) => item.status === "low").length
  const restockingItems = inventory.filter((item) => item.status === "restocking").length

  if (!isOpen) {
    return (
      <div className="fixed top-20 left-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg"
        >
          <Package className="w-4 h-4 mr-2" />
          AI Inventory
          {criticalItems > 0 && <Badge className="ml-2 bg-red-500 text-white">{criticalItems}</Badge>}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-20 left-6 z-40 w-96">
      <Card
        className={`bg-black/95 border-orange-500/50 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[700px]"
        }`}
      >
        <CardHeader className="pb-2 border-b border-orange-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">AI Inventory Manager</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-orange-400">Auto-Managing Stock 24/7</span>
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
            <div className="flex border-b border-orange-500/30">
              {[
                { id: "inventory", label: "Inventory", icon: <Package className="w-4 h-4" /> },
                { id: "bots", label: "AI Bots", icon: <Bot className="w-4 h-4" /> },
                { id: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-none border-b-2 ${
                    activeTab === tab.id
                      ? "border-orange-400 text-orange-400"
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
                {/* Inventory Tab */}
                {activeTab === "inventory" && (
                  <div className="space-y-4">
                    {/* Status Overview */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Healthy</p>
                            <p className="text-lg font-bold text-white">
                              {inventory.filter((i) => i.status === "healthy").length}
                            </p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Low Stock</p>
                            <p className="text-lg font-bold text-white">{lowStockItems}</p>
                          </div>
                          <AlertTriangle className="w-6 h-6 text-yellow-400" />
                        </div>
                      </div>

                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Critical</p>
                            <p className="text-lg font-bold text-white">{criticalItems}</p>
                          </div>
                          <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Restocking</p>
                            <p className="text-lg font-bold text-white">{restockingItems}</p>
                          </div>
                          <RefreshCw className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </div>

                    {/* Inventory Items */}
                    <div className="space-y-2">
                      {inventory.slice(0, 10).map((item) => (
                        <Card key={item.id} className="bg-gray-800/50 border-orange-500/30">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h5 className="text-white font-medium text-sm">{item.name}</h5>
                                <p className="text-xs text-gray-400">{item.category}</p>
                              </div>
                              <Badge className={`${getStatusColor(item.status)} text-xs`}>
                                {getStatusIcon(item.status)}
                                <span className="ml-1">{item.status}</span>
                              </Badge>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Stock Level</span>
                                <span className="text-white">
                                  {item.currentStock} / {item.maxCapacity}
                                </span>
                              </div>
                              <Progress value={(item.currentStock / item.maxCapacity) * 100} className="h-1" />

                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <span className="text-gray-400">Demand:</span>
                                  <p className="text-white">{item.demandForecast}/day</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Revenue:</span>
                                  <p className="text-white">Rp {(item.revenue24h / 1000000).toFixed(1)}M</p>
                                </div>
                                <div>
                                  <span className="text-gray-400">Auto:</span>
                                  <p className={item.autoRestock ? "text-green-400" : "text-red-400"}>
                                    {item.autoRestock ? "ON" : "OFF"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Bots Tab */}
                {activeTab === "bots" && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">AI Inventory Bots</h4>

                    {bots.map((bot) => (
                      <Card key={bot.id} className="bg-gray-800/50 border-orange-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-white text-sm">{bot.name}</CardTitle>
                                <p className="text-xs text-gray-400">{bot.function}</p>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(bot.status)} text-xs`}>{bot.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-gray-400">Items Managed:</span>
                                <p className="text-white font-medium">{bot.itemsManaged}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Efficiency:</span>
                                <p className="text-white font-medium">{bot.efficiency}%</p>
                              </div>
                            </div>

                            <div className="text-xs">
                              <span className="text-gray-400">Current Task:</span>
                              <p className="text-white">{bot.currentTask}</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Performance</span>
                                <span className="text-orange-400">{bot.efficiency}%</span>
                              </div>
                              <Progress value={bot.efficiency} className="h-1" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === "analytics" && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Inventory Analytics</h4>

                    <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-2 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-orange-400" />
                        AI Insights
                      </h5>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">• Diamond packages showing 40% higher demand</p>
                        <p className="text-gray-300">• Epic skins need faster restocking cycles</p>
                        <p className="text-gray-300">• Weekend demand spikes by 60%</p>
                        <p className="text-gray-300">• Auto-restock efficiency at 99.1%</p>
                        <p className="text-gray-300">• Predicted stockout prevention: 98.5%</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Top Revenue Items (24h)</h5>
                      <div className="space-y-2">
                        {inventory
                          .sort((a, b) => b.revenue24h - a.revenue24h)
                          .slice(0, 5)
                          .map((item, index) => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-800/30 rounded p-2">
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">#{index + 1}</Badge>
                                <span className="text-white text-sm">{item.name}</span>
                              </div>
                              <span className="text-orange-400 text-sm">
                                Rp {(item.revenue24h / 1000000).toFixed(1)}M
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Restock Schedule</h5>
                      <div className="space-y-2">
                        {inventory
                          .filter((item) => item.autoRestock)
                          .sort((a, b) => a.nextRestock.getTime() - b.nextRestock.getTime())
                          .slice(0, 5)
                          .map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-gray-800/30 rounded p-2">
                              <span className="text-white text-sm">{item.name}</span>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3 text-orange-400" />
                                <span className="text-xs text-gray-400">
                                  {item.nextRestock.toLocaleTimeString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
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
