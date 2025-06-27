"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Bot,
  Sparkles,
  TrendingUp,
  Package,
  Star,
  Zap,
  Clock,
  Target,
  Brain,
  X,
  Minimize2,
  Maximize2,
  Plus,
  Eye,
} from "lucide-react"

interface ProductCollection {
  id: string
  name: string
  category: "diamond" | "skin" | "bundle" | "special"
  items: ProductItem[]
  status: "generating" | "ready" | "featured" | "archived"
  aiGenerated: boolean
  popularity: number
  revenue: number
  createdAt: Date
  tags: string[]
}

interface ProductItem {
  id: string
  name: string
  type: "diamond" | "skin" | "bundle"
  price: number
  originalPrice?: number
  rarity: string
  hero?: string
  description: string
  imageUrl: string
  isNew: boolean
  isHot: boolean
  discount?: number
}

interface AICurator {
  id: string
  name: string
  specialty: string
  status: "active" | "generating" | "analyzing"
  collectionsCreated: number
  successRate: number
  currentTask: string
  efficiency: number
}

const aiCurators: AICurator[] = [
  {
    id: "1",
    name: "AI-TrendBot",
    specialty: "Trending Products",
    status: "active",
    collectionsCreated: 156,
    successRate: 94.5,
    currentTask: "Analyzing viral hero skins",
    efficiency: 98,
  },
  {
    id: "2",
    name: "AI-SeasonBot",
    specialty: "Seasonal Collections",
    status: "generating",
    collectionsCreated: 89,
    successRate: 96.2,
    currentTask: "Creating New Year bundle",
    efficiency: 95,
  },
  {
    id: "3",
    name: "AI-PromoBot",
    specialty: "Special Offers",
    status: "analyzing",
    collectionsCreated: 234,
    successRate: 92.8,
    currentTask: "Optimizing discount strategies",
    efficiency: 97,
  },
  {
    id: "4",
    name: "AI-MetaBot",
    specialty: "Meta Analysis",
    status: "active",
    collectionsCreated: 178,
    successRate: 98.1,
    currentTask: "Tracking competitive heroes",
    efficiency: 99,
  },
]

const generateRandomProduct = (): ProductItem => {
  const heroes = ["Fanny", "Gusion", "Kagura", "Ling", "Granger", "Chou", "Hayabusa", "Lesley", "Lancelot", "Alucard"]
  const skinTypes = [
    "Blade Dancer",
    "Cosmic Gleam",
    "Cherry Witch",
    "Street Punk",
    "Lightborn",
    "King of Fighters",
    "Future Enforcer",
    "Dangerous Laison",
    "Royal Matador",
    "Viscount",
  ]
  const rarities = ["Normal", "Elite", "Special", "Epic", "Legend", "Mythic"]

  const hero = heroes[Math.floor(Math.random() * heroes.length)]
  const skinType = skinTypes[Math.floor(Math.random() * skinTypes.length)]
  const rarity = rarities[Math.floor(Math.random() * rarities.length)]

  const basePrice = rarity === "Mythic" ? 2699 : rarity === "Legend" ? 1899 : rarity === "Epic" ? 899 : 599
  const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0

  return {
    id: Date.now().toString() + Math.random(),
    name: `${hero} - ${skinType}`,
    type: "skin",
    price: Math.floor(basePrice * (1 - discount / 100)),
    originalPrice: discount > 0 ? basePrice : undefined,
    rarity,
    hero,
    description: `Exclusive ${rarity} skin for ${hero} with stunning visual effects and unique animations.`,
    imageUrl: "/placeholder.svg?height=300&width=400",
    isNew: Math.random() > 0.6,
    isHot: Math.random() > 0.8,
    discount,
  }
}

const generateCollection = (): ProductCollection => {
  const collectionTypes = [
    "Weekly Featured Skins",
    "Meta Heroes Collection",
    "Seasonal Special Bundle",
    "Trending Assassin Skins",
    "Legendary Marksman Pack",
    "Epic Mage Collection",
    "Fighter Domination Bundle",
    "Support Hero Essentials",
    "New Year Special Offer",
    "Valentine's Day Romance",
    "Summer Beach Collection",
    "Halloween Horror Pack",
  ]

  const categories = ["skin", "bundle", "special"] as const
  const tags = ["trending", "meta", "seasonal", "limited", "exclusive", "popular", "new", "hot"]

  const name = collectionTypes[Math.floor(Math.random() * collectionTypes.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]
  const itemCount = Math.floor(Math.random() * 6) + 3

  return {
    id: Date.now().toString(),
    name,
    category,
    items: Array.from({ length: itemCount }, generateRandomProduct),
    status: "generating",
    aiGenerated: true,
    popularity: Math.floor(Math.random() * 100),
    revenue: Math.floor(Math.random() * 50000000) + 10000000,
    createdAt: new Date(),
    tags: tags.slice(0, Math.floor(Math.random() * 4) + 2),
  }
}

export function AIProductCurator() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [collections, setCollections] = useState<ProductCollection[]>([])
  const [curators, setCurators] = useState<AICurator[]>(aiCurators)
  const [activeTab, setActiveTab] = useState("collections")
  const [generationProgress, setGenerationProgress] = useState(0)

  // Auto-generate collections continuously
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new collections
      if (Math.random() > 0.6) {
        const newCollection = generateCollection()
        setCollections((prev) => [newCollection, ...prev.slice(0, 19)])
        setGenerationProgress(0)
      }

      // Update collection status
      setCollections((prev) =>
        prev.map((collection) => {
          if (collection.status === "generating") {
            return {
              ...collection,
              status: Math.random() > 0.3 ? "ready" : "generating",
            }
          }
          if (collection.status === "ready" && Math.random() > 0.8) {
            return {
              ...collection,
              status: "featured",
              popularity: Math.min(100, collection.popularity + Math.floor(Math.random() * 20)),
            }
          }
          return collection
        }),
      )

      // Update curators
      setCurators((prev) =>
        prev.map((curator) => ({
          ...curator,
          collectionsCreated: curator.collectionsCreated + Math.floor(Math.random() * 2),
          efficiency: Math.min(100, curator.efficiency + Math.random() * 2 - 1),
          status:
            Math.random() > 0.7
              ? (["active", "generating", "analyzing"] as const)[Math.floor(Math.random() * 3)]
              : curator.status,
        })),
      )

      // Update generation progress
      setGenerationProgress((prev) => (prev >= 100 ? 0 : prev + Math.floor(Math.random() * 15) + 5))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
      case "featured":
      case "active":
        return "text-green-400 bg-green-500/20 border-green-500/50"
      case "generating":
      case "analyzing":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50"
      case "archived":
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
      default:
        return "text-blue-400 bg-blue-500/20 border-blue-500/50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "diamond":
        return <Sparkles className="w-4 h-4" />
      case "skin":
        return <Star className="w-4 h-4" />
      case "bundle":
        return <Package className="w-4 h-4" />
      case "special":
        return <Zap className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythic":
        return "text-red-400"
      case "Legend":
        return "text-yellow-400"
      case "Epic":
        return "text-purple-400"
      case "Special":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-[420px] z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg animate-pulse"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          AI Product Curator
          <Badge className="ml-2 bg-white/20 text-white">
            {collections.filter((c) => c.status === "generating").length}
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-[420px] z-40">
      <Card
        className={`bg-black/95 border-pink-500/50 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-[600px] h-[700px]"
        }`}
      >
        <CardHeader className="pb-2 border-b border-pink-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-sm">AI Product Curator</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-pink-400">Generating Collections 24/7</span>
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
            <div className="flex border-b border-pink-500/30">
              {[
                { id: "collections", label: "Collections", icon: <Package className="w-4 h-4" /> },
                { id: "curators", label: "AI Curators", icon: <Bot className="w-4 h-4" /> },
                { id: "trending", label: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
                { id: "generator", label: "Generator", icon: <Brain className="w-4 h-4" /> },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-none border-b-2 ${
                    activeTab === tab.id
                      ? "border-pink-400 text-pink-400"
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
                {/* Collections Tab */}
                {activeTab === "collections" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-medium">AI Generated Collections</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-pink-500/20 text-pink-400 border-pink-500/50">
                          {collections.length} Total
                        </Badge>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
                          {collections.filter((c) => c.status === "generating").length} Generating
                        </Badge>
                      </div>
                    </div>

                    {/* Generation Progress */}
                    <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm">AI Collection Generator</span>
                        <span className="text-pink-400 text-sm">{generationProgress}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2" />
                      <p className="text-xs text-gray-400 mt-1">
                        Continuously analyzing trends and creating new collections...
                      </p>
                    </div>

                    {collections.map((collection) => (
                      <Card key={collection.id} className="bg-gray-800/50 border-pink-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(collection.category)}
                              <div>
                                <CardTitle className="text-white text-sm">{collection.name}</CardTitle>
                                <p className="text-xs text-gray-400">{collection.items.length} items</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getStatusColor(collection.status)} text-xs`}>
                                {collection.status}
                              </Badge>
                              {collection.aiGenerated && <Bot className="w-3 h-3 text-pink-400" />}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              {collection.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs border-pink-500/50 text-pink-300"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <span className="text-gray-400">Popularity:</span>
                                <p className="text-white font-medium">{collection.popularity}%</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Revenue:</span>
                                <p className="text-white font-medium">
                                  Rp {(collection.revenue / 1000000).toFixed(1)}M
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-400">Created:</span>
                                <p className="text-white font-medium">
                                  {collection.createdAt.toLocaleDateString("id-ID")}
                                </p>
                              </div>
                            </div>

                            {/* Preview Items */}
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {collection.items.slice(0, 3).map((item, index) => (
                                <div key={index} className="bg-gray-900/50 rounded p-2">
                                  <div className="flex items-center space-x-1 mb-1">
                                    {item.isNew && (
                                      <Badge className="bg-green-500/20 text-green-400 text-xs">NEW</Badge>
                                    )}
                                    {item.isHot && <Badge className="bg-red-500/20 text-red-400 text-xs">HOT</Badge>}
                                  </div>
                                  <p className="text-white text-xs font-medium truncate">{item.name}</p>
                                  <p className={`text-xs ${getRarityColor(item.rarity)}`}>{item.rarity}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-yellow-400 text-xs">💎 {item.price}</span>
                                    {item.discount && (
                                      <Badge className="bg-red-500/20 text-red-400 text-xs">-{item.discount}%</Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs border-pink-500/50 text-pink-300"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View All
                              </Button>
                              {collection.status === "ready" && (
                                <Button size="sm" className="flex-1 text-xs bg-pink-600 hover:bg-pink-700">
                                  <Star className="w-3 h-3 mr-1" />
                                  Feature
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* AI Curators Tab */}
                {activeTab === "curators" && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">AI Curator Team</h4>

                    {curators.map((curator) => (
                      <Card key={curator.id} className="bg-gray-800/50 border-pink-500/30">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-white text-sm">{curator.name}</CardTitle>
                                <p className="text-xs text-gray-400">{curator.specialty}</p>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(curator.status)} text-xs`}>{curator.status}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div>
                                <span className="text-gray-400">Collections:</span>
                                <p className="text-white font-medium">{curator.collectionsCreated}</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Success Rate:</span>
                                <p className="text-white font-medium">{curator.successRate}%</p>
                              </div>
                              <div>
                                <span className="text-gray-400">Efficiency:</span>
                                <p className="text-white font-medium">{curator.efficiency}%</p>
                              </div>
                            </div>

                            <div className="text-xs">
                              <span className="text-gray-400">Current Task:</span>
                              <p className="text-white">{curator.currentTask}</p>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Efficiency</span>
                                <span className="text-pink-400">{curator.efficiency}%</span>
                              </div>
                              <Progress value={curator.efficiency} className="h-1" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Trending Tab */}
                {activeTab === "trending" && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">Trending Analysis</h4>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">Hot Collections</p>
                            <p className="text-lg font-bold text-white">
                              {collections.filter((c) => c.popularity > 80).length}
                            </p>
                          </div>
                          <TrendingUp className="w-6 h-6 text-pink-400" />
                        </div>
                      </div>

                      <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-gray-400">New Today</p>
                            <p className="text-lg font-bold text-white">
                              {
                                collections.filter(
                                  (c) => new Date(c.createdAt).toDateString() === new Date().toDateString(),
                                ).length
                              }
                            </p>
                          </div>
                          <Sparkles className="w-6 h-6 text-rose-400" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2 text-pink-400" />
                        AI Trend Insights
                      </h5>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-300">• Assassin skins trending +45% this week</p>
                        <p className="text-gray-300">• Epic rarity items showing highest conversion</p>
                        <p className="text-gray-300">• Bundle collections outperforming individual items</p>
                        <p className="text-gray-300">• Seasonal themes driving 60% more engagement</p>
                        <p className="text-gray-300">• Meta heroes generating 3x revenue</p>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Top Performing Collections</h5>
                      <div className="space-y-2">
                        {collections
                          .filter((c) => c.status === "featured")
                          .sort((a, b) => b.popularity - a.popularity)
                          .slice(0, 5)
                          .map((collection, index) => (
                            <div
                              key={collection.id}
                              className="flex items-center justify-between bg-gray-800/30 rounded p-2"
                            >
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">#{index + 1}</Badge>
                                <span className="text-white text-sm">{collection.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-pink-400 text-sm">{collection.popularity}%</span>
                                <TrendingUp className="w-4 h-4 text-green-400" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Generator Tab */}
                {activeTab === "generator" && (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">AI Collection Generator</h4>

                    <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-lg p-4">
                      <h5 className="text-white font-medium mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-pink-400" />
                        Generation Statistics
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Collections Generated Today:</span>
                          <p className="text-white font-medium">{collections.length}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Success Rate:</span>
                          <p className="text-white font-medium">96.8%</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Avg Generation Time:</span>
                          <p className="text-white font-medium">3.2 seconds</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Active Generators:</span>
                          <p className="text-white font-medium">4 AI Bots</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-white font-medium">Manual Generation Controls</h5>

                      <Button
                        className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                        onClick={() => {
                          const newCollection = generateCollection()
                          setCollections((prev) => [newCollection, ...prev])
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Generate New Collection
                      </Button>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-pink-500/50 text-pink-300"
                          onClick={() => {
                            const trendingCollection = generateCollection()
                            trendingCollection.name = "AI Trending Collection"
                            trendingCollection.tags = ["trending", "hot", "meta"]
                            setCollections((prev) => [trendingCollection, ...prev])
                          }}
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-pink-500/50 text-pink-300"
                          onClick={() => {
                            const seasonalCollection = generateCollection()
                            seasonalCollection.name = "Seasonal Special Bundle"
                            seasonalCollection.tags = ["seasonal", "limited", "exclusive"]
                            setCollections((prev) => [seasonalCollection, ...prev])
                          }}
                        >
                          <Star className="w-3 h-3 mr-1" />
                          Seasonal
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-medium mb-2">Generation Queue</h5>
                      <div className="space-y-2">
                        {[
                          "Meta Heroes Bundle - Processing...",
                          "Valentine Special Collection - Queued",
                          "Trending Assassin Skins - Analyzing",
                          "Epic Marksman Pack - Generating",
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-800/30 rounded p-2">
                            <span className="text-white text-sm">{item}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs text-gray-400">{index + 1}m</span>
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
