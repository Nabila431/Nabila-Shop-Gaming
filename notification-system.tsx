"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, CheckCircle, AlertCircle, X, ExternalLink } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "error"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  action?: {
    label: string
    url: string
  }
}

const adminInfo = {
  whatsapp: "085810526151",
  gopay: "0895340205302",
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "✅ Transaksi Berhasil!",
      message: "Top up 344 Diamond berhasil diproses. Diamond sudah masuk ke akun Anda.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
    },
    {
      id: "2",
      type: "info",
      title: "🎉 Promo Spesial!",
      message: "Dapatkan bonus 100 Diamond untuk pembelian 1000+ Diamond hari ini!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      action: {
        label: "Ambil Promo",
        url: "#diamonds",
      },
    },
    {
      id: "3",
      type: "warning",
      title: "⏰ Menunggu Pembayaran",
      message: `Pesanan skin Fanny - Blade Dancer menunggu konfirmasi pembayaran. Transfer ke Gopay: ${adminInfo.gopay}`,
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
      action: {
        label: "Kirim Bukti",
        url: `https://wa.me/${adminInfo.whatsapp}?text=Halo Admin, saya sudah transfer ke Gopay ${adminInfo.gopay} untuk skin Fanny - Blade Dancer`,
      },
    },
    {
      id: "4",
      type: "info",
      title: "💳 Info Pembayaran",
      message: `Pembayaran dapat dilakukan melalui Gopay: ${adminInfo.gopay}. Proses otomatis 1-5 menit setelah transfer.`,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      action: {
        label: "Copy Gopay",
        url: `copy:${adminInfo.gopay}`,
      },
    },
  ])

  const [isOpen, setIsOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.isRead).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Bell className="w-5 h-5 text-blue-400" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "error":
        return "border-red-500/30 bg-red-500/10"
      default:
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Auto-generate transaction notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random transaction notifications
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: "success",
          title: "💎 Top Up Berhasil!",
          message: `Selamat! Top up ${Math.floor(Math.random() * 1000) + 100} Diamond berhasil diproses via Gopay ${adminInfo.gopay}.`,
          timestamp: new Date(),
          isRead: false,
        }
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)])
      }
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const handleActionClick = (action: { label: string; url: string }) => {
    if (action.url.startsWith("copy:")) {
      const textToCopy = action.url.replace("copy:", "")
      navigator.clipboard.writeText(textToCopy)
      alert(`${textToCopy} berhasil disalin!`)
    } else if (action.url.startsWith("http")) {
      window.open(action.url, "_blank")
    } else {
      window.location.href = action.url
    }
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed top-6 right-20 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="relative bg-black/40 border-purple-500/30 text-white hover:bg-purple-500/20"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed top-16 right-6 z-50 w-96">
          <Card className="bg-black/95 border-purple-500/50 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-lg flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-purple-400" />
                  Notifikasi
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs text-purple-300 hover:text-white"
                    >
                      Tandai Semua
                    </Button>
                  )}
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
              <CardDescription className="text-gray-300">
                {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <ScrollArea className="h-96">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-400">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Belum ada notifikasi</p>
                  </div>
                ) : (
                  <div className="space-y-2 p-3">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${getNotificationColor(
                          notification.type,
                        )} ${!notification.isRead ? "ring-1 ring-purple-500/50" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium text-sm mb-1">{notification.title}</h4>
                              <p className="text-gray-300 text-xs leading-relaxed">{notification.message}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">
                                  {notification.timestamp.toLocaleString("id-ID", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </span>
                                {!notification.isRead && <div className="w-2 h-2 bg-purple-400 rounded-full"></div>}
                              </div>
                              {notification.action && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="mt-2 text-xs bg-transparent border-purple-500/50 text-purple-300 hover:bg-purple-500/20"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleActionClick(notification.action!)
                                  }}
                                >
                                  {notification.action.label}
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                            className="text-gray-400 hover:text-white h-6 w-6 p-0 ml-2"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
