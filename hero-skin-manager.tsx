"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search, Edit, Trash2, Eye, Upload, ImageIcon, Star, Diamond } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HeroSkin {
  id: string
  hero: string
  skinName: string
  rarity: string
  price: number
  category: string
  description: string
  imageUrl: string
  uploadedAt: string
  isActive: boolean
}

const mockSkins: HeroSkin[] = [
  {
    id: "1",
    hero: "Fanny",
    skinName: "Blade Dancer",
    rarity: "Epic",
    price: 899,
    category: "Assassin",
    description: "Elegant blade dancer with flowing movements",
    imageUrl: "/placeholder.svg?height=300&width=400",
    uploadedAt: "2024-01-15T10:30:00Z",
    isActive: true,
  },
  {
    id: "2",
    hero: "Gusion",
    skinName: "Cosmic Gleam",
    rarity: "Legend",
    price: 1899,
    category: "Assassin",
    description: "Cosmic warrior with stellar powers",
    imageUrl: "/placeholder.svg?height=300&width=400",
    uploadedAt: "2024-01-14T15:45:00Z",
    isActive: true,
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Legend":
      return "bg-gradient-to-r from-yellow-400 to-orange-500"
    case "Epic":
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "Special":
      return "bg-gradient-to-r from-blue-500 to-cyan-500"
    case "Mythic":
      return "bg-gradient-to-r from-red-500 to-pink-600"
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600"
  }
}

export function HeroSkinManager() {
  const [skins, setSkins] = useState<HeroSkin[]>(mockSkins)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRarity, setFilterRarity] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredSkins = skins.filter((skin) => {
    const matchesSearch =
      skin.hero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skin.skinName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRarity = filterRarity === "all" || skin.rarity === filterRarity
    const matchesCategory = filterCategory === "all" || skin.category === filterCategory

    return matchesSearch && matchesRarity && matchesCategory
  })

  const toggleSkinStatus = (id: string) => {
    setSkins((prev) => prev.map((skin) => (skin.id === id ? { ...skin, isActive: !skin.isActive } : skin)))
  }

  const deleteSkin = (id: string) => {
    if (confirm("Are you sure you want to delete this skin?")) {
      setSkins((prev) => prev.filter((skin) => skin.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="container mx-auto max-w-7xl">
        <Card className="bg-black/40 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-2xl flex items-center">
                  <ImageIcon className="w-6 h-6 mr-2 text-purple-400" />
                  Hero Skin Manager
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your Mobile Legends hero skin collection
                </CardDescription>
              </div>
              <Link href="/admin/upload">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Skin
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search hero or skin name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm"
                >
                  <option value="all">All Rarities</option>
                  <option value="Normal">Normal</option>
                  <option value="Elite">Elite</option>
                  <option value="Special">Special</option>
                  <option value="Epic">Epic</option>
                  <option value="Legend">Legend</option>
                  <option value="Mythic">Mythic</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Assassin">Assassin</option>
                  <option value="Mage">Mage</option>
                  <option value="Marksman">Marksman</option>
                  <option value="Fighter">Fighter</option>
                  <option value="Tank">Tank</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Skins</p>
                    <p className="text-2xl font-bold text-white">{skins.length}</p>
                  </div>
                  <ImageIcon className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Skins</p>
                    <p className="text-2xl font-bold text-white">{skins.filter((s) => s.isActive).length}</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Epic+ Skins</p>
                    <p className="text-2xl font-bold text-white">
                      {skins.filter((s) => ["Epic", "Legend", "Mythic"].includes(s.rarity)).length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Avg Price</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.round(skins.reduce((acc, s) => acc + s.price, 0) / skins.length)}
                    </p>
                  </div>
                  <Diamond className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Skins Grid */}
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredSkins.map((skin) => (
                  <Card
                    key={skin.id}
                    className={`bg-black/60 border-purple-500/30 hover:border-purple-400 transition-all duration-300 overflow-hidden ${
                      !skin.isActive ? "opacity-60" : ""
                    }`}
                  >
                    <div className="relative">
                      <Image
                        src={skin.imageUrl || "/placeholder.svg"}
                        alt={`${skin.hero} - ${skin.skinName}`}
                        width={400}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getRarityColor(skin.rarity)} text-white border-0`}>
                        {skin.rarity}
                      </Badge>
                      {!skin.isActive && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary" className="bg-gray-600 text-white">
                            Inactive
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-white text-lg">{skin.hero}</CardTitle>
                      <CardDescription className="text-purple-300">{skin.skinName}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {skin.category}
                        </Badge>
                        <span className="text-yellow-400 font-bold">
                          <Diamond className="w-4 h-4 inline mr-1" />
                          {skin.price}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm line-clamp-2">{skin.description}</p>

                      <div className="text-xs text-gray-500">
                        Uploaded: {new Date(skin.uploadedAt).toLocaleDateString()}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSkinStatus(skin.id)}
                          className={`flex-1 ${
                            skin.isActive
                              ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/20"
                              : "border-green-500 text-green-400 hover:bg-green-500/20"
                          }`}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {skin.isActive ? "Hide" : "Show"}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSkin(skin.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSkins.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <p className="text-gray-400 text-lg">No skins found</p>
                  <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
