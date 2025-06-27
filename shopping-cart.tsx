"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ShoppingCart, X, Plus, Minus, CreditCard, Trash2 } from "lucide-react"
import { useCart } from "./cart-context"
import Image from "next/image"

export function ShoppingCartModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getItemCount } = useCart()

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Mohon lengkapi nama dan nomor WhatsApp")
      return
    }

    setIsCheckingOut(true)

    // Simulate checkout process
    setTimeout(() => {
      const orderDetails = cartItems
        .map(
          (item) =>
            `• ${item.product.name || `${(item.product as any).hero} - ${(item.product as any).skinName}`} (${item.quantity}x) - Rp ${(item.product.price * item.quantity).toLocaleString()}`,
        )
        .join("\n")

      const message = `🛒 *PESANAN BARU DARI NABILA STORE*

👤 *Data Customer:*
Nama: ${customerInfo.name}
Email: ${customerInfo.email || "-"}
WhatsApp: ${customerInfo.phone}

📦 *Detail Pesanan:*
${orderDetails}

💰 *Total: Rp ${getTotalPrice().toLocaleString()}*

📝 *Catatan:* ${customerInfo.notes || "-"}

💳 *Pembayaran:* Gopay 0895340205302

Mohon konfirmasi pesanan ini. Terima kasih! 🙏`

      const whatsappUrl = `https://wa.me/085810526151?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      clearCart()
      setIsOpen(false)
      setIsCheckingOut(false)
      setCustomerInfo({ name: "", email: "", phone: "", notes: "" })

      alert("Pesanan berhasil dikirim ke WhatsApp! Silakan lanjutkan pembayaran.")
    }, 2000)
  }

  if (!isOpen) {
    return (
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Keranjang
          {getItemCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white min-w-5 h-5 rounded-full flex items-center justify-center text-xs">
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-6 right-6 z-50 w-96">
      <Card className="bg-black/95 border-green-500/50 backdrop-blur-md max-h-[80vh] flex flex-col">
        <CardHeader className="pb-3 border-b border-green-500/30">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-green-400" />
              Keranjang Belanja
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          {cartItems.length > 0 && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{getItemCount()} item(s)</span>
              <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-400 hover:text-red-300 text-xs">
                <Trash2 className="w-3 h-3 mr-1" />
                Kosongkan
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-0 flex-1 overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">Keranjang belanja kosong</p>
              <p className="text-gray-500 text-sm mt-2">Tambahkan produk untuk mulai berbelanja</p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-64 p-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="flex items-start space-x-3">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name || `${(item.product as any).hero} - ${(item.product as any).skinName}`}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-medium text-sm truncate">
                            {item.product.name || `${(item.product as any).hero} - ${(item.product as any).skinName}`}
                          </h4>
                          <p className="text-gray-400 text-xs">
                            {item.type === "diamond" ? "Diamond Package" : (item.product as any).rarity + " Skin"}
                          </p>
                          <p className="text-yellow-400 font-bold text-sm">Rp {item.product.price.toLocaleString()}</p>
                          {item.userID && (
                            <p className="text-gray-500 text-xs">
                              ID: {item.userID}({item.zoneID})
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-6 w-6 p-0 border-gray-600"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0 border-gray-600"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-white font-bold text-sm">
                          Rp {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Customer Info Form */}
              <div className="p-4 border-t border-gray-700 space-y-3">
                <h4 className="text-white font-medium text-sm">Data Pembeli</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="name" className="text-white text-xs">
                      Nama *
                    </Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white text-xs">
                      WhatsApp *
                    </Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                      placeholder="08xxxxxxxxx"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-white text-xs">
                    Email (opsional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-white text-xs">
                    Catatan (opsional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white text-xs"
                    placeholder="Catatan tambahan..."
                    rows={2}
                  />
                </div>
              </div>

              {/* Total and Checkout */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-bold">Total:</span>
                  <span className="text-yellow-400 font-bold text-lg">Rp {getTotalPrice().toLocaleString()}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || !customerInfo.name || !customerInfo.phone}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Memproses...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Checkout via WhatsApp
                    </>
                  )}
                </Button>
                <p className="text-gray-400 text-xs text-center mt-2">💳 Pembayaran: Gopay 0895340205302</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
