"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}

interface ProductGridProps {
  category: string
  onAddToCart: (product: { id: string; name: string; price: number; category: string }) => void
}

// Mock product data
const products: Product[] = [
  // Bebidas
  {
    id: "1",
    name: "Coca-Cola 350ml",
    description: "Refrigerante tradicional gelado",
    price: 4.5,
    image: "/coca-cola.png",
    category: "Bebidas",
    available: true,
  },
  {
    id: "2",
    name: "Suco de Laranja Natural",
    description: "Suco natural da fruta, sem conservantes",
    price: 6.0,
    image: "/suco-laranja.jpg",
    category: "Bebidas",
    available: true,
  },
  {
    id: "3",
    name: "Água Mineral 500ml",
    description: "Água mineral natural sem gás",
    price: 2.5,
    image: "/agua.jpg",
    category: "Bebidas",
    available: true,
  },
  {
    id: "4",
    name: "Café Expresso",
    description: "Café expresso tradicional",
    price: 3.0,
    image: "/espresso.png",
    category: "Bebidas",
    available: false,
  },
  // Lanches
  {
    id: "5",
    name: "Hambúrguer Clássico",
    description: "Pão, carne, queijo, alface e tomate",
    price: 18.0,
    image: "/hamburger.jpg",
    category: "Lanches",
    available: true,
  },
  {
    id: "6",
    name: "Sanduíche Natural",
    description: "Pão integral com peito de peru e salada",
    price: 12.0,
    image: "/sanduiche.jpg",
    category: "Lanches",
    available: true,
  },
  {
    id: "7",
    name: "Batata Frita",
    description: "Porção de batata frita crocante",
    price: 8.0,
    image: "/batata.png",
    category: "Lanches",
    available: true,
  },
  {
    id: "8",
    name: "Coxinha de Frango",
    description: "Coxinha tradicional com frango desfiado",
    price: 5.0,
    image: "/coxinha.jpg",
    category: "Lanches",
    available: true,
  },
  // Sobremesas
  {
    id: "9",
    name: "Pudim de Leite",
    description: "Pudim caseiro com calda de caramelo",
    price: 7.0,
    image: "/pudim.jpg",
    category: "Sobremesas",
    available: true,
  },
  {
    id: "10",
    name: "Brigadeiro",
    description: "Brigadeiro tradicional com granulado",
    price: 3.0,
    image: "/brigadeiro.jpg",
    category: "Sobremesas",
    available: true,
  },
  {
    id: "11",
    name: "Sorvete de Chocolate",
    description: "Sorvete cremoso sabor chocolate",
    price: 9.0,
    image: "/sorvete.png",
    category: "Sobremesas",
    available: true,
  },
  // Pratos Principais
  {
    id: "12",
    name: "Prato Feito Completo",
    description: "Arroz, feijão, carne, salada e batata frita",
    price: 22.0,
    image: "/prato-feito.jpg",
    category: "Pratos Principais",
    available: true,
  },
  {
    id: "13",
    name: "Lasanha à Bolonhesa",
    description: "Lasanha tradicional com molho bolonhesa",
    price: 25.0,
    image: "/lasanha.png",
    category: "Pratos Principais",
    available: true,
  },
  {
    id: "14",
    name: "Frango Grelhado",
    description: "Peito de frango grelhado com legumes",
    price: 20.0,
    image: "/frango-grelhado.png",
    category: "Pratos Principais",
    available: true,
  },
]

export function ProductGrid({ category, onAddToCart }: ProductGridProps) {
  const categoryProducts = products.filter((product) => product.category === category)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {categoryProducts.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                <Badge variant="destructive" className="text-sm">
                  Indisponível
                </Badge>
              </div>
            )}
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base sm:text-lg text-pretty leading-tight">{product.name}</CardTitle>
              <Badge variant="secondary" className="shrink-0 text-sm font-semibold">
                {formatPrice(product.price)}
              </Badge>
            </div>
            <CardDescription className="text-pretty text-sm leading-relaxed">{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              onClick={() =>
                onAddToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  category: product.category,
                })
              }
              disabled={!product.available}
              className="w-full transition-all duration-200 hover:shadow-md"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar ao carrinho
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
