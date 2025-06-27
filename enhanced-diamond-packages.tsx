"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Diamond,
  Star,
  Zap,
  Gift,
  Crown,
  Sparkles,
  ShoppingCart,
  TrendingUp,
  FlameIcon as Fire,
  Heart,
  Shield,
  Copy,
  Check,
} from "lucide-react"
import Image from "next/image"
import { diamondProducts, type DiamondProduct } from "./product-data"
import { useCart } from "./cart-context"

const getCategoryColor = (category: string) => {
  switch (category) {
    case "starter":
      return "from-blue-500 to-cyan-500"
    case "popular":
      return "from-purple-500 to-pink-500"
    case "premium":
      return "from-orange-500 to-red-500"
    case "ultimate":
      return "from-yellow-400 to-orange-500"
    default:
      return "from-gray-500 to-gray-600"
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "starter":
      return <Diamond className="w-6 h-6" />
    case "popular":
      return <Star className="w-6 h-6" />
    case "premium":
      return <Crown className="w-6 h-6" />
    case "ultimate":
      return <Sparkles className="w-6 h-6" />
    default:
      return <Diamond className="w-6 h-6" />
  }
}

export function EnhancedDiamondPackages() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [userID, setUserID] = useState("")
  const [zoneID, setZoneID] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const { addToCart } = useCart()

  const filteredPackages =
    selectedCategory === "all" ? diamondProducts : diamondProducts.filter((pkg) => pkg.category === selectedCategory)

  const categories = [
    { id: "all", name: "Semua Paket", icon: <Sparkles className="w-4 h-4" /> },
    { id: "starter", name: "Starter", icon: <Diamond className="w-4 h-4" /> },
    { id: "popular", name: "Popular", icon: <Star className="w-4 h-4" /> },
    { id: "premium", name: "Premium", icon: <Crown className="w-4 h-4" /> },
    { id: "ultimate", name: "Ultimate", icon: <Fire className="w-4 h-4" /> },
  ]

  const handleBuyNow = (product: DiamondProduct) => {
    if (!userID || !zoneID) {
      alert("Mohon isi User ID dan Zone ID terlebih dahulu!")
      return
    }

    addToCart({
      id: `${product.id}-${Date.now()}`,
      type: "diamond",
      product,
      quantity: 1,
      userID,
      zoneID,
    })

    alert(`${product.name} berhasil ditambahkan ke keranjang!`)
  }

  const copyProductCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <section id="diamonds" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <Diamond className="w-10 h-10 inline mr-3 text-blue-400" />
            Top Up Diamond Mobile Legends
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Pilih paket diamond terbaik dengan bonus melimpah dan harga termurah!
          </p>

          {/* Special Offers Banner */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 text-yellow-300">
              <Gift className="w-6 h-6 animate-bounce" />
              <span className="font-bold text-lg">PROMO HARI INI: Bonus Diamond hingga 500 + Cashback 5%!</span>
              <Gift className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>

        {/* User ID Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-center flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Masukkan Data Akun Mobile Legends
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                Pastikan User ID dan Zone ID benar untuk proses yang lancar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userID" className="text-white mb-2 block">
                    User ID *
                  </Label>
                  <Input
                    id="userID"
                    placeholder="Contoh: 123456789"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="zoneID" className="text-white mb-2 block">
                    Zone ID *
                  </Label>
                  <Input
                    id="zoneID"
                    placeholder="Contoh: 1234"
                    value={zoneID}
                    onChange={(e) => setZoneID(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">💡 Tips: User ID dan Zone ID bisa dilihat di profil game Anda</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Diamond Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative bg-black/40 border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:scale-105 overflow-hidden ${
                pkg.popular ? "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20" : ""
              }`}
            >
              {/* Product Code */}
              <div className="absolute top-2 right-2 z-10">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyProductCode(pkg.productCode)}
                  className="bg-black/60 text-white hover:bg-black/80 h-6 px-2 text-xs"
                >
                  {copiedCode === pkg.productCode ? (
                    <Check className="w-3 h-3 mr-1" />
                  ) : (
                    <Copy className="w-3 h-3 mr-1" />
                  )}
                  {pkg.productCode}
                </Button>
              </div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                {pkg.popular && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                    <Star className="w-3 h-3 mr-1" />
                    POPULER
                  </Badge>
                )}
                {pkg.hot && (
                  <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                    <Fire className="w-3 h-3 mr-1" />
                    HOT
                  </Badge>
                )}
                {pkg.new && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <Sparkles className="w-3 h-3 mr-1" />
                    NEW
                  </Badge>
                )}
                {pkg.limited && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce">
                    <Crown className="w-3 h-3 mr-1" />
                    LIMITED
                  </Badge>
                )}
              </div>

              {/* Discount Badge */}
              {pkg.discount && (
                <div className="absolute top-12 right-2 z-10">
                  <Badge className="bg-red-500 text-white font-bold text-lg">-{pkg.discount}%</Badge>
                </div>
              )}

              {/* Product Image */}
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <CardHeader className="text-center pb-4">
                <div
                  className={`w-20 h-20 mx-auto bg-gradient-to-r ${getCategoryColor(pkg.category)} rounded-full flex items-center justify-center mb-4 shadow-lg`}
                >
                  {getCategoryIcon(pkg.category)}
                </div>

                <CardTitle className="text-white text-2xl mb-2">
                  {pkg.diamonds.toLocaleString()}
                  {pkg.bonus > 0 && <span className="text-yellow-400 text-lg ml-1">+{pkg.bonus}</span>}
                </CardTitle>

                <CardDescription className="text-purple-300 font-medium">Diamond</CardDescription>

                <p className="text-gray-400 text-sm mt-2">{pkg.description}</p>
              </CardHeader>

              <CardContent className="text-center pb-4">
                <div className="mb-4">
                  {pkg.originalPrice && (
                    <p className="text-gray-500 line-through text-sm">Rp {pkg.originalPrice.toLocaleString("id-ID")}</p>
                  )}
                  <p className="text-3xl font-bold text-white mb-2">Rp {pkg.price.toLocaleString("id-ID")}</p>
                  {pkg.originalPrice && (
                    <p className="text-green-400 text-sm font-medium">
                      Hemat Rp {(pkg.originalPrice - pkg.price).toLocaleString("id-ID")}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center text-xs text-gray-300">
                      <Heart className="w-3 h-3 mr-1 text-pink-400" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  onClick={() => handleBuyNow(pkg)}
                  className={`w-full bg-gradient-to-r ${getCategoryColor(pkg.category)} hover:shadow-lg transition-all duration-300 font-bold`}
                  disabled={!userID || !zoneID}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {!userID || !zoneID ? "Isi User ID & Zone ID" : "Beli Sekarang"}
                </Button>
              </CardFooter>

              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-white font-bold text-xl mb-4 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-400" />
              Mengapa Pilih Nabila Store?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                <p className="text-white font-medium">Proses Super Cepat</p>
                <p className="text-gray-400">1-5 menit langsung masuk</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <p className="text-white font-medium">100% Aman & Terpercaya</p>
                <p className="text-gray-400">Garansi uang kembali</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                <p className="text-white font-medium">Customer Service 24/7</p>
                <p className="text-gray-400">Siap membantu kapan saja</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
