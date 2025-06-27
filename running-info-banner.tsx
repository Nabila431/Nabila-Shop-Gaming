"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Gift, Clock, CreditCard, Package, TrendingUp, Heart } from "lucide-react"

interface InfoItem {
  id: string
  type: "promo" | "service" | "stock" | "payment" | "announcement"
  icon: React.ReactNode
  text: string
  color: string
  bgColor: string
}

const infoItems: InfoItem[] = [
  {
    id: "1",
    type: "promo",
    icon: <Sparkles className="w-4 h-4" />,
    text: "🔥 FLASH SALE! Beli 2 Skin Epic Gratis 1 Skin Special - Berlaku sampai 23:59 WIB!",
    color: "text-yellow-300",
    bgColor: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20",
  },
  {
    id: "2",
    type: "service",
    icon: <Zap className="w-4 h-4" />,
    text: "⚡ PROSES SUPER CEPAT! Top Up Diamond hanya 1-5 menit langsung masuk akun Anda",
    color: "text-blue-300",
    bgColor: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "3",
    type: "stock",
    icon: <Package className="w-4 h-4" />,
    text: "📦 STOK MELIMPAH! 500+ Koleksi Skin Hero Terlengkap - Semua Hero Tersedia!",
    color: "text-green-300",
    bgColor: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
  },
  {
    id: "4",
    type: "payment",
    icon: <CreditCard className="w-4 h-4" />,
    text: "💳 PEMBAYARAN MUDAH! Gopay: 0895340205302 - Transfer Langsung Proses Otomatis",
    color: "text-purple-300",
    bgColor: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
  },
  {
    id: "5",
    type: "promo",
    icon: <Gift className="w-4 h-4" />,
    text: "🎁 BONUS DIAMOND! Top Up 1000+ Diamond Bonus 100 Diamond GRATIS hari ini!",
    color: "text-rose-300",
    bgColor: "bg-gradient-to-r from-rose-500/20 to-pink-500/20",
  },
  {
    id: "6",
    type: "service",
    icon: <Clock className="w-4 h-4" />,
    text: "🕐 BUKA 24/7! Customer Service siap melayani Anda kapan saja tanpa libur",
    color: "text-indigo-300",
    bgColor: "bg-gradient-to-r from-indigo-500/20 to-blue-500/20",
  },
  {
    id: "7",
    type: "announcement",
    icon: <TrendingUp className="w-4 h-4" />,
    text: "📈 TRENDING NOW! Skin Fanny Blade Dancer & Gusion Cosmic Gleam paling laris!",
    color: "text-amber-300",
    bgColor: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
  },
  {
    id: "8",
    type: "promo",
    icon: <Heart className="w-4 h-4" />,
    text: "💝 MEMBER BARU! Daftar sekarang dapat cashback 5% untuk pembelian pertama",
    color: "text-pink-300",
    bgColor: "bg-gradient-to-r from-pink-500/20 to-rose-500/20",
  },
]

export function RunningInfoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % infoItems.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const currentItem = infoItems[currentIndex]

  if (!isVisible) return null

  return (
    <div className={`${currentItem.bgColor} border-b border-white/10 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>

      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Badge className={`${currentItem.color} bg-white/10 border-white/20 animate-bounce`}>
              {currentItem.icon}
            </Badge>

            <div className="flex-1 overflow-hidden">
              <p className={`${currentItem.color} font-medium text-sm md:text-base animate-pulse`}>
                {currentItem.text}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-1">
              {infoItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white transition-colors ml-4"
            >
              ×
            </button>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
    </div>
  )
}
