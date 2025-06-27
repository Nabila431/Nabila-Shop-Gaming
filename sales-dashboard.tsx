"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, ShoppingCart, Target, Zap, Star, BarChart3, PieChart, Activity } from "lucide-react"

interface SalesMetrics {
  totalRevenue: number
  totalOrders: number
  activeUsers: number
  conversionRate: number
  topProducts: Array<{
    name: string
    sales: number
    revenue: number
  }>
  recentActivity: Array<{
    type: string
    message: string
    timestamp: Date
  }>
}

export function SalesDashboard() {
  const [metrics, setMetrics] = useState<SalesMetrics>({
    totalRevenue: 15750000,
    totalOrders: 342,
    activeUsers: 89,
    conversionRate: 23.5,
    topProducts: [
      { name: "344 Diamond Package", sales: 156, revenue: 9360000 },
      { name: "Fanny - Blade Dancer", sales: 89, revenue: 2670000 },
      { name: "706 Diamond Package", sales: 67, revenue: 8040000 },
      { name: "Gusion - Cosmic Gleam", sales: 45, revenue: 2565000 },
    ],
    recentActivity: [
      {
        type: "sale",
        message: "User baru membeli 344 Diamond Package",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
      },
      {
        type: "inquiry",
        message: "5 user bertanya tentang promo skin",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
      },
      {
        type: "conversion",
        message: "Chat bot berhasil convert 3 leads",
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
      },
    ],
  })

  const [isVisible, setIsVisible] = useState(false)

  // Auto-update metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 100000),
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 3),
        activeUsers: Math.floor(Math.random() * 20) + 80,
        conversionRate: Math.random() * 5 + 20,
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => setIsVisible(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Sales Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-80">
      <Card className="bg-black/95 border-green-500/50 backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Sales Analytics
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          <CardDescription className="text-gray-300">Real-time sales performance</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="text-lg font-bold text-white">Rp {(metrics.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Orders</p>
                  <p className="text-lg font-bold text-white">{metrics.totalOrders}</p>
                </div>
                <ShoppingCart className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Active Users</p>
                  <p className="text-lg font-bold text-white">{metrics.activeUsers}</p>
                </div>
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Conversion</p>
                  <p className="text-lg font-bold text-white">{metrics.conversionRate.toFixed(1)}%</p>
                </div>
                <Target className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Top Products
            </h4>
            <div className="space-y-2">
              {metrics.topProducts.slice(0, 3).map((product, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800/50 rounded p-2">
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium truncate">{product.name}</p>
                    <p className="text-gray-400 text-xs">{product.sales} sales</p>
                  </div>
                  <Badge variant="outline" className="border-green-500/50 text-green-400 text-xs">
                    Rp {(product.revenue / 1000000).toFixed(1)}M
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-1 text-blue-400" />
              Live Activity
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {metrics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-2 bg-gray-800/30 rounded p-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-white text-xs">{activity.message}</p>
                    <p className="text-gray-400 text-xs">
                      {activity.timestamp.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-3">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <PieChart className="w-4 h-4 mr-1 text-purple-400" />
              AI Insights
            </h4>
            <div className="space-y-1">
              <p className="text-xs text-gray-300">• Peak hours: 19:00-23:00 WIB</p>
              <p className="text-xs text-gray-300">• Best converting product: 344 Diamond</p>
              <p className="text-xs text-gray-300">• Recommended: Push skin promo</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
