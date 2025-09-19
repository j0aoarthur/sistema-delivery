"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Clock, CheckCircle, XCircle, RotateCcw } from "lucide-react"

interface Order {
  id: string
  date: string
  status: "pending" | "preparing" | "delivered" | "cancelled"
  items: { name: string; quantity: number; price: number }[]
  total: number
}

const mockOrders: Order[] = [
  {
    id: "PED-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      { name: "Hambúrguer Clássico", quantity: 1, price: 18.0 },
      { name: "Batata Frita", quantity: 1, price: 8.0 },
      { name: "Coca-Cola 350ml", quantity: 2, price: 4.5 },
    ],
    total: 35.0,
  },
  {
    id: "PED-002",
    date: "2024-01-12",
    status: "delivered",
    items: [
      { name: "Prato Feito Completo", quantity: 1, price: 22.0 },
      { name: "Suco de Laranja Natural", quantity: 1, price: 6.0 },
    ],
    total: 28.0,
  },
  {
    id: "PED-003",
    date: "2024-01-10",
    status: "preparing",
    items: [
      { name: "Lasanha à Bolonhesa", quantity: 1, price: 25.0 },
      { name: "Pudim de Leite", quantity: 2, price: 7.0 },
    ],
    total: 39.0,
  },
  {
    id: "PED-004",
    date: "2024-01-08",
    status: "cancelled",
    items: [{ name: "Sanduíche Natural", quantity: 2, price: 12.0 }],
    total: 24.0,
  },
]

export function OrderHistory() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "preparing":
        return <RotateCcw className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "preparing":
        return "Preparando"
      case "delivered":
        return "Entregue"
      case "cancelled":
        return "Cancelado"
    }
  }

  const getStatusVariant = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "secondary" as const
      case "preparing":
        return "default" as const
      case "delivered":
        return "secondary" as const
      case "cancelled":
        return "destructive" as const
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Histórico de Pedidos</h2>
        <p className="text-muted-foreground mt-2">Acompanhe todos os seus pedidos realizados</p>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">Pedido {order.id}</CardTitle>
                    <CardDescription>{formatDate(order.date)}</CardDescription>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)} className="flex items-center space-x-1">
                  {getStatusIcon(order.status)}
                  <span>{getStatusLabel(order.status)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(order.total + 5.0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Taxa de entrega</span>
                  <span>{formatPrice(5.0)}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Pedir Novamente
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
