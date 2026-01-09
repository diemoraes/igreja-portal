"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();          // ✅ dentro do componente
  const [email, setEmail] = useState("");     // ✅ dentro do componente
  const [password, setPassword] = useState(""); // ✅ dentro do componente

  async function handleLogin() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      alert("Email ou senha inválidos");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Portal da Igreja</CardTitle>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
