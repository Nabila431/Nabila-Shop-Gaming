"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, FileText, Zap, User, ShoppingCart, Phone, Mail } from "lucide-react"

interface FormData {
  id: string
  type: "purchase" | "registration" | "support" | "feedback"
  customerName: string
  email: string
  phone: string
  gameId: string
  zoneId: string
  item: string
  quantity: number
  paymentMethod: string
  message: string
  status: "pending" | "processing" | "completed" | "failed"
  aiProcessed: boolean
  timestamp: Date
}

interface AIFormProcessor {
  isActive: boolean
  formsProcessed: number
  successRate: number
  averageProcessTime: number
  currentQueue: number
}

export function AutoFormProcessor() {
  const [isOpen, setIsOpen] = useState(false)
  const [forms, setForms] = useState<FormData[]>([])
  const [processor, setProcessor] = useState<AIFormProcessor>({
    isActive: true,
    formsProcessed: 1247,
    successRate: 99.8,
    averageProcessTime: 2.3,
    currentQueue: 5,
  })

  const [newForm, setNewForm] = useState<Partial<FormData>>({
    type: "purchase",
    customerName: "",
    email: "",
    phone: "",
    gameId: "",
    zoneId: "",
    item: "",
    quantity: 1,
    paymentMethod: "Gopay",
    message: "",
  })

  // Auto-generate and process forms
  useEffect(() => {
    const interval = setInterval(() => {
      // Generate random forms
      if (Math.random() > 0.8) {
        const formTypes = ["purchase", "registration", "support", "feedback"] as const
        const items = ["86 Diamond", "344 Diamond", "706 Diamond", "Fanny - Blade Dancer", "Gusion - Cosmic Gleam"]

        const newForm: FormData = {
          id: Date.now().toString(),
          type: formTypes[Math.floor(Math.random() * formTypes.length)],
          customerName: `Customer ${Math.floor(Math.random() * 1000)}`,
          email: `user${Math.floor(Math.random() * 1000)}@email.com`,
          phone: `08${Math.floor(Math.random() * 1000000000)}`,
          gameId: Math.floor(Math.random() * 1000000000).toString(),
          zoneId: Math.floor(Math.random() * 10000).toString(),
          item: items[Math.floor(Math.random() * items.length)],
          quantity: Math.floor(Math.random() * 3) + 1,
          paymentMethod: Math.random() > 0.5 ? "Gopay" : "Bank Transfer",
          message: "Mohon diproses segera, terima kasih!",
          status: "pending",
          aiProcessed: false,
          timestamp: new Date(),
        }

        setForms((prev) => [newForm, ...prev.slice(0, 19)])
      }

      // Auto-process forms
      setForms((prev) =>
        prev.map((form) => {
          if (form.status === "pending" && !form.aiProcessed && Math.random() > 0.3) {
            return {
              ...form,
              status: "processing",
              aiProcessed: true,
            }
          }
          if (form.status === "processing" && Math.random() > 0.4) {
            return {
              ...form,
              status: Math.random() > 0.05 ? "completed" : "failed",
            }
          }
          return form
        }),
      )

      // Update processor stats
      setProcessor((prev) => ({
        ...prev,
        formsProcessed: prev.formsProcessed + Math.floor(Math.random() * 5),
        currentQueue: Math.max(0, prev.currentQueue + Math.floor(Math.random() * 3) - 2),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmitForm = () => {
    if (!newForm.customerName || !newForm.email || !newForm.gameId) {
      alert("Please fill in required fields")
      return
    }

    const formData: FormData = {
      id: Date.now().toString(),
      type: newForm.type as FormData["type"],
      customerName: newForm.customerName,
      email: newForm.email,
      phone: newForm.phone || "",
      gameId: newForm.gameId,
      zoneId: newForm.zoneId || "",
      item: newForm.item || "",
      quantity: newForm.quantity || 1,
      paymentMethod: newForm.paymentMethod || "Gopay",
      message: newForm.message || "",
      status: "pending",
      aiProcessed: false,
      timestamp: new Date(),
    }

    setForms((prev) => [formData, ...prev])

    // Reset form
    setNewForm({
      type: "purchase",
      customerName: "",
      email: "",
      phone: "",
      gameId: "",
      zoneId: "",
      item: "",
      quantity: 1,
      paymentMethod: "Gopay",
      message: "",
    })

    alert("Form submitted! AI will process it automatically.")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-500/20 border-green-500/50"
      case "processing":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50"
      case "failed":
        return "text-red-400 bg-red-500/20 border-red-500/50"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="w-4 h-4" />
      case "registration":
        return <User className="w-4 h-4" />
      case "support":
        return <Phone className="w-4 h-4" />
      case "feedback":
        return <Mail className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed top-20 right-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
        >
          <FileText className="w-4 h-4 mr-2" />
          AI Form Processor
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-20 right-6 z-40 w-96">
      <Card className="bg-black/95 border-blue-500/50 backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <Bot className="w-5 h-5 mr-2 text-blue-400" />
              AI Form Processor
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white h-8 w-8 p-0"
            >
              ×
            </Button>
          </div>
          <CardDescription className="text-gray-300">Automated form processing and customer service</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* AI Processor Status */}
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium flex items-center">
                <Zap className="w-4 h-4 mr-1 text-blue-400" />
                AI Status
              </h4>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                {processor.isActive ? "Active" : "Offline"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Processed:</span>
                <p className="text-white font-medium">{processor.formsProcessed.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Success Rate:</span>
                <p className="text-white font-medium">{processor.successRate}%</p>
              </div>
              <div>
                <span className="text-gray-400">Avg Time:</span>
                <p className="text-white font-medium">{processor.averageProcessTime}s</p>
              </div>
              <div>
                <span className="text-gray-400">Queue:</span>
                <p className="text-white font-medium">{processor.currentQueue}</p>
              </div>
            </div>
          </div>

          {/* Quick Form */}
          <div className="space-y-3">
            <h4 className="text-white font-medium">Quick Submit Form</h4>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="type" className="text-white text-xs">
                  Type
                </Label>
                <Select
                  value={newForm.type}
                  onValueChange={(value) => setNewForm({ ...newForm, type: value as FormData["type"] })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="registration">Registration</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="customerName" className="text-white text-xs">
                  Name *
                </Label>
                <Input
                  id="customerName"
                  value={newForm.customerName}
                  onChange={(e) => setNewForm({ ...newForm, customerName: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                  placeholder="Customer name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="email" className="text-white text-xs">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newForm.email}
                  onChange={(e) => setNewForm({ ...newForm, email: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white text-xs">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={newForm.phone}
                  onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                  placeholder="08xxxxxxxxx"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="gameId" className="text-white text-xs">
                  Game ID *
                </Label>
                <Input
                  id="gameId"
                  value={newForm.gameId}
                  onChange={(e) => setNewForm({ ...newForm, gameId: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                  placeholder="123456789"
                />
              </div>

              <div>
                <Label htmlFor="zoneId" className="text-white text-xs">
                  Zone ID
                </Label>
                <Input
                  id="zoneId"
                  value={newForm.zoneId}
                  onChange={(e) => setNewForm({ ...newForm, zoneId: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white h-8 text-xs"
                  placeholder="1234"
                />
              </div>
            </div>

            {newForm.type === "purchase" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="item" className="text-white text-xs">
                    Item
                  </Label>
                  <Select value={newForm.item} onValueChange={(value) => setNewForm({ ...newForm, item: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-8">
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="86 Diamond">86 Diamond</SelectItem>
                      <SelectItem value="344 Diamond">344 Diamond</SelectItem>
                      <SelectItem value="706 Diamond">706 Diamond</SelectItem>
                      <SelectItem value="Fanny - Blade Dancer">Fanny - Blade Dancer</SelectItem>
                      <SelectItem value="Gusion - Cosmic Gleam">Gusion - Cosmic Gleam</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="paymentMethod" className="text-white text-xs">
                    Payment
                  </Label>
                  <Select
                    value={newForm.paymentMethod}
                    onValueChange={(value) => setNewForm({ ...newForm, paymentMethod: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="Gopay">Gopay</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="DANA">DANA</SelectItem>
                      <SelectItem value="OVO">OVO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="message" className="text-white text-xs">
                Message
              </Label>
              <Textarea
                id="message"
                value={newForm.message}
                onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white text-xs"
                placeholder="Additional message..."
                rows={2}
              />
            </div>

            <Button
              onClick={handleSubmitForm}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Submit Form (AI Will Process)
            </Button>
          </div>

          {/* Recent Forms */}
          <div>
            <h4 className="text-white font-medium mb-2">Recent Forms</h4>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {forms.slice(0, 8).map((form) => (
                  <div key={form.id} className="bg-gray-800/50 rounded p-2 border border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(form.type)}
                        <span className="text-white text-xs font-medium">#{form.id.slice(-4)}</span>
                        <Badge className={`${getStatusColor(form.status)} text-xs`}>{form.status}</Badge>
                      </div>
                      {form.aiProcessed && <Bot className="w-3 h-3 text-blue-400" />}
                    </div>
                    <div className="text-xs text-gray-300">
                      <p>{form.customerName}</p>
                      <p className="text-gray-400">{form.item || form.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
