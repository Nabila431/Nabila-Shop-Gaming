"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  Phone,
  CreditCard,
  ShoppingCart,
  Diamond,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  isTyping?: boolean
  actions?: Array<{
    label: string
    action: string
    data?: any
  }>
}

interface QuickAction {
  icon: React.ReactNode
  label: string
  action: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    icon: <Diamond className="w-4 h-4" />,
    label: "Top Up Diamond",
    action: "topup_diamond",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    icon: <ShoppingCart className="w-4 h-4" />,
    label: "Beli Skin",
    action: "buy_skin",
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Hubungi Admin",
    action: "contact_admin",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    icon: <CreditCard className="w-4 h-4" />,
    label: "Cek Pembayaran",
    action: "check_payment",
    color: "bg-orange-600 hover:bg-orange-700",
  },
]

const adminInfo = {
  whatsapp: "085810526151",
  gopay: "0895340205302",
  name: "Admin ML Store",
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: `🎮 Halo! Saya AI Assistant ML Store yang super canggih! 

Saya siap membantu Anda dengan:
✨ Top Up Diamond Mobile Legends
🎨 Pembelian Skin Hero
💳 Proses Pembayaran
📱 Kontak Admin Langsung
🔔 Notifikasi Transaksi

Bagaimana saya bisa membantu Anda hari ini?`,
      timestamp: new Date(),
      actions: [
        { label: "Mulai Top Up", action: "topup_diamond" },
        { label: "Lihat Skin", action: "buy_skin" },
        { label: "Hubungi Admin", action: "contact_admin" },
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [unreadCount, setUnreadCount] = useState(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setUnreadCount((prev) => prev + 1)
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const generateBotResponse = async (userMessage: string): Promise<Message> => {
    const lowerMessage = userMessage.toLowerCase()

    // Advanced AI responses based on keywords and context
    if (lowerMessage.includes("diamond") || lowerMessage.includes("topup") || lowerMessage.includes("top up")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: `💎 Paket Diamond Mobile Legends Tersedia:

🔥 PROMO HARI INI:
• 86 Diamond - Rp 15.000
• 172 Diamond - Rp 30.000  
• 344 Diamond - Rp 60.000 ⭐ POPULER
• 706 Diamond + 50 Bonus - Rp 120.000
• 1412 Diamond + 150 Bonus - Rp 240.000

📱 Cara Order:
1. Berikan User ID & Zone ID
2. Pilih paket diamond
3. Transfer ke Gopay: ${adminInfo.gopay}
4. Kirim bukti transfer

Mau order paket yang mana?`,
        timestamp: new Date(),
        actions: [
          { label: "Order 344 Diamond", action: "order_diamond", data: { package: "344", price: "60000" } },
          { label: "Order 706 Diamond", action: "order_diamond", data: { package: "706", price: "120000" } },
          { label: "Hubungi Admin", action: "contact_admin" },
        ],
      }
    }

    if (lowerMessage.includes("skin") || lowerMessage.includes("hero")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: `🎨 Koleksi Skin Hero Terbaru:

🔥 SKIN POPULER:
• Fanny - Blade Dancer (Epic) - 899 💎
• Gusion - Cosmic Gleam (Legend) - 1899 💎
• Kagura - Cherry Witch (Epic) - 899 💎
• Granger - Lightborn (Legend) - 1899 💎

✨ KATEGORI TERSEDIA:
• Assassin Skins
• Mage Skins  
• Marksman Skins
• Fighter Skins

Skin hero mana yang Anda inginkan?`,
        timestamp: new Date(),
        actions: [
          { label: "Lihat Semua Skin", action: "view_skins" },
          { label: "Skin Epic", action: "filter_skins", data: { rarity: "epic" } },
          { label: "Skin Legend", action: "filter_skins", data: { rarity: "legend" } },
        ],
      }
    }

    if (lowerMessage.includes("bayar") || lowerMessage.includes("payment") || lowerMessage.includes("transfer")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: `💳 METODE PEMBAYARAN:

🏦 GOPAY (Recommended):
📱 ${adminInfo.gopay}
a.n. ${adminInfo.name}

📋 LANGKAH PEMBAYARAN:
1. Transfer sesuai nominal
2. Screenshot bukti transfer
3. Kirim ke WhatsApp Admin
4. Tunggu konfirmasi (1-5 menit)
5. Diamond/Skin otomatis masuk

⚡ PROSES SUPER CEPAT!
✅ Garansi 100% Aman
🔄 Refund jika gagal

Sudah transfer? Kirim bukti sekarang!`,
        timestamp: new Date(),
        actions: [
          { label: "Kirim Bukti Transfer", action: "send_proof" },
          { label: "Copy No. Gopay", action: "copy_gopay" },
          { label: "Hubungi Admin", action: "contact_admin" },
        ],
      }
    }

    if (lowerMessage.includes("admin") || lowerMessage.includes("cs") || lowerMessage.includes("bantuan")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: `👨‍💼 KONTAK ADMIN ML STORE:

📱 WhatsApp: ${adminInfo.whatsapp}
💰 Gopay: ${adminInfo.gopay}
💬 Klik tombol di bawah untuk chat langsung!

⏰ JAM OPERASIONAL:
🌅 Pagi: 08.00 - 12.00 WIB
🌞 Siang: 13.00 - 17.00 WIB  
🌙 Malam: 19.00 - 23.00 WIB

🚀 RESPON SUPER CEPAT:
• Chat langsung dijawab
• Proses order 1-5 menit
• Support 24/7 via bot

Ada yang bisa saya bantu lagi?`,
        timestamp: new Date(),
        actions: [
          { label: "Chat WhatsApp", action: "whatsapp_admin" },
          { label: "Copy Nomor WA", action: "copy_whatsapp" },
          { label: "Copy Gopay", action: "copy_gopay" },
        ],
      }
    }

    if (lowerMessage.includes("promo") || lowerMessage.includes("diskon") || lowerMessage.includes("murah")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content: `🎉 PROMO SPESIAL HARI INI!

🔥 FLASH SALE:
• Beli 2 Skin Epic = Diskon 10%
• Top Up 1000+ Diamond = Bonus 100 Diamond
• Member Baru = Cashback 5%

⚡ PROMO TERBATAS:
• Berlaku sampai 23:59 WIB
• Stok terbatas!
• First come, first served

🎁 BONUS EKSKLUSIF:
• Gratis konsultasi hero build
• Tips ranking push
• Update skin terbaru

💳 Pembayaran via Gopay: ${adminInfo.gopay}

Mau ambil promo sekarang?`,
        timestamp: new Date(),
        actions: [
          { label: "Ambil Promo", action: "claim_promo" },
          { label: "Lihat Syarat", action: "promo_terms" },
          { label: "Order Sekarang", action: "order_now" },
        ],
      }
    }

    // Default intelligent response
    return {
      id: Date.now().toString(),
      type: "bot",
      content: `🤖 Saya AI Assistant ML Store yang canggih!

Saya bisa membantu dengan:
• 💎 Top Up Diamond (Proses 1-5 menit)
• 🎨 Pembelian Skin Hero (Koleksi lengkap)
• 💳 Panduan Pembayaran (Gopay: ${adminInfo.gopay})
• 📱 Kontak Admin Langsung
• 🎉 Info Promo & Diskon Terbaru

Ketik kata kunci seperti:
"diamond", "skin", "bayar", "admin", "promo"

Atau pilih menu cepat di bawah! 👇`,
      timestamp: new Date(),
      actions: [
        { label: "Top Up Diamond", action: "topup_diamond" },
        { label: "Beli Skin", action: "buy_skin" },
        { label: "Hubungi Admin", action: "contact_admin" },
      ],
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      async () => {
        const botResponse = await generateBotResponse(inputValue)
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickAction = async (action: string, data?: any) => {
    let actionMessage = ""

    switch (action) {
      case "topup_diamond":
        actionMessage = "Saya ingin top up diamond"
        break
      case "buy_skin":
        actionMessage = "Saya ingin beli skin hero"
        break
      case "contact_admin":
        actionMessage = "Saya ingin hubungi admin"
        break
      case "check_payment":
        actionMessage = "Saya ingin cek status pembayaran"
        break
      case "order_diamond":
        actionMessage = `Saya ingin order ${data?.package} diamond`
        break
      case "whatsapp_admin":
        window.open(
          `https://wa.me/${adminInfo.whatsapp}?text=Halo Admin ML Store, saya ingin bertanya tentang produk Anda`,
          "_blank",
        )
        return
      case "copy_gopay":
        navigator.clipboard.writeText(adminInfo.gopay)
        alert(`Nomor Gopay ${adminInfo.gopay} berhasil disalin!`)
        return
      case "copy_whatsapp":
        navigator.clipboard.writeText(adminInfo.whatsapp)
        alert("Nomor WhatsApp berhasil disalin!")
        return
      case "send_proof":
        window.open(
          `https://wa.me/${adminInfo.whatsapp}?text=Halo Admin, saya sudah transfer ke Gopay ${adminInfo.gopay}. Berikut bukti transfernya:`,
          "_blank",
        )
        return
      default:
        actionMessage = action
    }

    if (actionMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: actionMessage,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsTyping(true)

      setTimeout(async () => {
        const botResponse = await generateBotResponse(actionMessage)
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      }, 800)
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className={`bg-black/95 border-purple-500/50 backdrop-blur-md transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        <CardHeader className="pb-2 border-b border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-white text-sm">AI Assistant ML Store</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Online 24/7</span>
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
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-gray-800 text-gray-100 border border-purple-500/30"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "bot" && <Bot className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                            {message.actions && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {message.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuickAction(action.action, action.data)}
                                    className="text-xs bg-transparent border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 border border-purple-500/30 rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t border-purple-500/30">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.action)}
                    className={`${action.color} border-0 text-white text-xs`}
                  >
                    {action.icon}
                    <span className="ml-1 truncate">{action.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-purple-500/30">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ketik pesan Anda..."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
