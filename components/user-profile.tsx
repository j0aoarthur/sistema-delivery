"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"

interface UserProfileProps {
  user: { name: string; email: string }
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo, SP",
  })

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false)
    // In a real app, you would save to backend here
  }

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: "(11) 99999-9999",
      address: "Rua das Flores, 123 - São Paulo, SP",
    })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Perfil do Usuário</h2>
        <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais e preferências</p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Informações Pessoais</span>
              </CardTitle>
              <CardDescription>Suas informações básicas de cadastro</CardDescription>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.name}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.email}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              ) : (
                <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{formData.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas da Conta</CardTitle>
          <CardDescription>Resumo da sua atividade no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Pedidos Realizados</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">R$ 245,80</div>
              <div className="text-sm text-muted-foreground">Total Gasto</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Avaliação Média</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferências</CardTitle>
          <CardDescription>Configure suas preferências de entrega e notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notificações por Email</div>
              <div className="text-sm text-muted-foreground">Receber atualizações sobre pedidos</div>
            </div>
            <Badge variant="secondary">Ativo</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notificações Push</div>
              <div className="text-sm text-muted-foreground">Alertas em tempo real</div>
            </div>
            <Badge variant="secondary">Ativo</Badge>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Ofertas Promocionais</div>
              <div className="text-sm text-muted-foreground">Receber ofertas especiais</div>
            </div>
            <Badge variant="outline">Inativo</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
