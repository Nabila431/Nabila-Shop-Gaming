"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Star,
  Diamond,
  Zap,
  Crown,
  Sparkles,
  FlameIcon as Fire,
  Heart,
  Search,
  TrendingUp,
  Gift,
  Eye,
  ShoppingCart,
  Copy,
  Check,
} from "lucide-react"
import Image from "next/image"
import { skinProducts, type SkinProduct } from "./product-data"
import { useCart } from "./cart-context"

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Mythic":
      return "bg-gradient-to-r from-red-500 to-pink-600"
    case "Legend":
      return "bg-gradient-to-r from-yellow-400 to-orange-500"
    case "Epic":
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "Special":
      return "bg-gradient-to-r from-blue-500 to-cyan-500"
    case "Elite":
      return "bg-gradient-to-r from-green-500 to-emerald-500"
    default:
      return "bg-gradient-to-r from-gray-500 to-gray-600"
  }
}

const getRarityIcon = (rarity: string) => {
  switch (rarity) {
    case "Mythic":
      return <Crown className="w-4 h-4" />
    case "Legend":
      return <Star className="w-4 h-4" />
    case "Epic":
      return <Sparkles className="w-4 h-4" />
    case "Special":
      return <Diamond className="w-4 h-4" />
    default:
      return <Shield className="w-4 h-4" />
  }
}

export function EnhancedSkinGallery() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const { addToCart } = useCart()

  const filteredSkins = skinProducts
    .filter((skin) => {
      const matchesSearch =
        skin.hero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skin.skinName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRarity = selectedRarity === "all" || skin.rarity === selectedRarity
      return matchesSearch && matchesRarity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        default:
          return 0
      }
    })

  const categories = ["all", "Assassin", "Mage", "Marksman", "Fighter", "Tank", "Support"]
  const rarities = ["all", "Mythic", "Legend", "Epic", "Special", "Elite", "Normal"]

  const handleBuySkin = (skin: SkinProduct) => {
    addToCart({
      id: `${skin.id}-${Date.now()}`,
      type: "skin",
      product: skin,
      quantity: 1,
    })

    alert(`${skin.fullName} berhasil ditambahkan ke keranjang!`)
  }

  const copyProductCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section id="skins" className="py-16 px-4 bg-black/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <Shield className="w-10 h-10 inline mr-3 text-purple-400" />
            Galeri Koleksi Skin Hero
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            500+ Koleksi skin hero Mobile Legends terlengkap dan terbaru dengan harga terbaik!
          </p>

          {/* Special Collection Banner */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-purple-300">
              <Crown className="w-6 h-6 animate-pulse" />
              <span className="font-bold text-lg">
                KOLEKSI EKSKLUSIF: Mythic & Legend Skins dengan Diskon hingga 20%!
              </span>
              <Crown className="w-6 h-6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari hero atau nama skin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              {rarities.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity === "all" ? "Semua Rarity" : rarity}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              <option value="popularity">Paling Populer</option>
              <option value="price-low">Harga Terendah</option>
              <option value="price-high">Harga Tertinggi</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="text-center">
              <p className="text-white font-bold">{skinProducts.length}</p>
              <p className="text-gray-400">Total Skins</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{skinProducts.filter((s) => s.isNew).length}</p>
              <p className="text-gray-400">Skin Baru</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{skinProducts.filter((s) => s.discount).length}</p>
              <p className="text-gray-400">Sedang Diskon</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">{skinProducts.filter((s) => s.rarity === "Mythic").length}</p>
              <p className="text-gray-400">Mythic Skins</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-7 max-w-4xl mx-auto bg-black/40">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-purple-600 text-xs md:text-sm"
              >
                {category === "all" ? "Semua" : category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {(category === "all" ? filteredSkins : filteredSkins.filter((skin) => skin.category === category)).map(
                  (skin) => (
                    <Card
                      key={skin.id}
                      className="bg-black/40 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 overflow-hidden group"
                    >
                      <div className="relative">
                        <Image
                          src={skin.image || "/placeholder.svg"}
                          alt={skin.fullName}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Product Code */}
                        <div className="absolute top-2 left-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyProductCode(skin.productCode)}
                            className="bg-black/60 text-white hover:bg-black/80 h-6 px-2 text-xs"
                          >
                            {copiedCode === skin.productCode ? (
                              <Check className="w-3 h-3 mr-1" />
                            ) : (
                              <Copy className="w-3 h-3 mr-1" />
                            )}
                            {skin.productCode}
                          </Button>
                        </div>

                        {/* Rarity Badge */}
                        <Badge
                          className={`absolute top-2 right-2 ${getRarityColor(skin.rarity)} text-white border-0 font-bold`}
                        >
                          {getRarityIcon(skin.rarity)}
                          <span className="ml-1">{skin.rarity}</span>
                        </Badge>

                        {/* Status Badges */}
                        <div className="absolute top-12 right-2 flex flex-col gap-1">
                          {skin.isNew && (
                            <Badge className="bg-green-500 text-white animate-pulse">
                              <Sparkles className="w-3 h-3 mr-1" />
                              NEW
                            </Badge>
                          )}
                          {skin.isHot && (
                            <Badge className="bg-red-500 text-white animate-bounce">
                              <Fire className="w-3 h-3 mr-1" />
                              HOT
                            </Badge>
                          )}
                          {skin.isLimited && (
                            <Badge className="bg-purple-500 text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              LIMITED
                            </Badge>
                          )}
                          {skin.isExclusive && (
                            <Badge className="bg-yellow-500 text-black">
                              <Star className="w-3 h-3 mr-1" />
                              EXCLUSIVE
                            </Badge>
                          )}
                        </div>

                        {/* Discount Badge */}
                        {skin.discount && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-red-500 text-white font-bold">-{skin.discount}%</Badge>
                          </div>
                        )}

                        {/* Popularity Indicator */}
                        <div className="absolute bottom-2 left-2">
                          <Badge className="bg-black/60 text-white border border-white/20">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {skin.popularity}%
                          </Badge>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white text-white hover:bg-white hover:text-black"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-white text-lg">{skin.hero}</CardTitle>
                        <CardDescription className="text-purple-300 font-medium">{skin.skinName}</CardDescription>
                        <p className="text-gray-400 text-sm">{skin.description}</p>
                      </CardHeader>

                      <CardContent className="pb-2">
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {skin.category}
                          </Badge>
                          <div className="text-right">
                            {skin.originalPrice && (
                              <p className="text-gray-500 line-through text-sm">💎 {skin.originalPrice}</p>
                            )}
                            <span className="text-yellow-400 font-bold text-lg">
                              <Diamond className="w-4 h-4 inline mr-1" />
                              {skin.price}
                            </span>
                            {skin.originalPrice && (
                              <p className="text-green-400 text-xs">Hemat 💎{skin.originalPrice - skin.price}</p>
                            )}
                          </div>
                        </div>

                        {/* Effects Preview */}
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 font-medium">Special Effects:</p>
                          {skin.effects.slice(0, 2).map((effect, index) => (
                            <div key={index} className="flex items-center text-xs text-gray-300">
                              <Zap className="w-3 h-3 mr-1 text-yellow-400" />
                              {effect}
                            </div>
                          ))}
                          {skin.effects.length > 2 && (
                            <p className="text-xs text-purple-400">+{skin.effects.length - 2} more effects</p>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="pt-0">
                        <Button
                          onClick={() => handleBuySkin(skin)}
                          className={`w-full ${getRarityColor(skin.rarity)} hover:shadow-lg transition-all duration-300 font-bold`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Beli Skin
                        </Button>
                      </CardFooter>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Bottom Collection Info */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 max-w-6xl mx-auto">
            <h3 className="text-white font-bold text-xl mb-4 text-center flex items-center justify-center">
              <Gift className="w-6 h-6 mr-2 text-purple-400" />
              Koleksi Skin Terlengkap di Nabila Store
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <Crown className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-white font-medium">Mythic Skins</p>
                <p className="text-gray-400">Koleksi terlengkap</p>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-white font-medium">Legend Skins</p>
                <p className="text-gray-400">Harga terbaik</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                <p className="text-white font-medium">Epic Skins</p>
                <p className="text-gray-400">Pilihan terpopuler</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                <p className="text-white font-medium">Special Skins</p>
                <p className="text-gray-400">Value terbaik</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
