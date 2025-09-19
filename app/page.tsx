"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { MainMenu } from "@/components/main-menu"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"login" | "register" | "menu">("login")
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData)
    setCurrentView("menu")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("login")
  }

  if (currentView === "menu" && user) {
    return <MainMenu user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentView === "login" ? (
          <LoginForm onLogin={handleLogin} onSwitchToRegister={() => setCurrentView("register")} />
        ) : (
          <RegisterForm onRegister={handleLogin} onSwitchToLogin={() => setCurrentView("login")} />
        )}
      </div>
    </div>
  )
}
