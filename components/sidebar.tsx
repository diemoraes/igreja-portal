"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function Sidebar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [userName, setUserName] = useState("Usuário");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const match = document.cookie.match(/userName=([^;]+)/);
    if (match) {
      setUserName(decodeURIComponent(match[1]));
    }
  }, []);

  function logout() {
    document.cookie = "auth=; Max-Age=0; path=/";
    document.cookie = "userName=; Max-Age=0; path=/";
    router.push("/login");
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  if (!mounted) return null;

  return (
    <aside className="w-64 min-h-screen bg-background border-r flex flex-col justify-between">
      
      {/* TOPO */}
      <div>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold text-primary">
            ⛪ Portal Igreja
          </span>
        </div>

        {/* Bem-vindo */}
        <div className="px-6 py-4">
          <p className="text-sm text-muted-foreground">Bem-vindo,</p>
          <p className="font-semibold">{userName}</p>
        </div>

        {/* Menu */}
        <nav className="px-4 space-y-1">
          <Link
            href="/dashboard"
            className="block rounded-md px-4 py-2 text-sm hover:bg-muted transition"
          >
            📊 Dashboard
          </Link>

          <Link
            href="/membros"
            className="block rounded-md px-4 py-2 text-sm hover:bg-muted transition"
          >
            👤 Membros
          </Link>
        </nav>
      </div>

      {/* RODAPÉ */}
      <div className="p-4 border-t space-y-2">
        
        {/* Botão de Tema */}
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "🌙 Modo escuro" : "☀️ Modo claro"}
        </Button>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </aside>
  );
}
