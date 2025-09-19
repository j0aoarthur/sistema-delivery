"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Home, Package, LogOut, Menu } from "lucide-react"
import { ProductGrid } from "@/components/product-grid"
import { CartSidebar } from "@/components/cart-sidebar"
import { UserProfile } from "@/components/user-profile"
import { OrderHistory } from "@/components/order-history"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MainMenuProps {
  user: { name: string; email: string }
  onLogout: () => void
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

export function MainMenu({ user, onLogout }: MainMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState("Bebidas")
  const [currentView, setCurrentView] = useState<"home" | "profile" | "orders">("home")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const categories = [
    { name: "Bebidas", icon: "🥤", description: "Refrigerantes, sucos e águas" },
    { name: "Lanches", icon: "🍔", description: "Hambúrgueres, sanduíches e petiscos" },
    { name: "Sobremesas", icon: "🍰", description: "Doces, bolos e sorvetes" },
    { name: "Pratos Principais", icon: "🍽️", description: "Refeições completas" },
  ]

  const addToCart = (product: { id: string; name: string; price: number; category: string }) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const NavigationMenu = ({ isMobile = false }) => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Menu</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={currentView === "home" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setCurrentView("home")
              if (isMobile) setIsMobileMenuOpen(false)
            }}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button
            variant={currentView === "profile" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setCurrentView("profile")
              if (isMobile) setIsMobileMenuOpen(false)
            }}
          >
            <User className="h-4 w-4 mr-2" />
            Perfil
          </Button>
          <Button
            variant={currentView === "orders" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => {
              setCurrentView("orders")
              if (isMobile) setIsMobileMenuOpen(false)
            }}
          >
            <Package className="h-4 w-4 mr-2" />
            Pedidos
          </Button>
        </CardContent>
      </Card>

      {currentView === "home" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Categorias</span>
            </CardTitle>
            <CardDescription>Escolha uma categoria para ver os produtos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => {
                  setSelectedCategory(category.name)
                  if (isMobile) setIsMobileMenuOpen(false)
                }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.description}</div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <NavigationMenu isMobile />
                </SheetContent>
              </Sheet>

              <h1 className="text-xl sm:text-2xl font-bold text-card-foreground">Sistema de Delivery</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Olá, {user.name}!
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Carrinho</span>
                {getTotalItems() > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                <span className="ml-2 hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Desktop Navigation Menu */}
          <div className="hidden lg:block lg:col-span-1">
            <NavigationMenu />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentView === "home" && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-balance">{selectedCategory}</h2>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    {categories.find((cat) => cat.name === selectedCategory)?.description}
                  </p>
                </div>
                <ProductGrid category={selectedCategory} onAddToCart={addToCart} />
              </>
            )}

            {currentView === "profile" && <UserProfile user={user} />}

            {currentView === "orders" && <OrderHistory />}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  )
}
