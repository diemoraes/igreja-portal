"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const backgrounds = [
  "/login/church1.jpg",
  "/login/church2.jpg",
  "/login/church3.jpg",
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  // 🔁 Troca imagem a cada 20s
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  async function handleLogin() {
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError(
        "Não conseguimos entrar com esses dados. Confira seu email e senha com carinho 🙏"
      );
      return;
    }

    router.push("/dashboard");
  }

  function handleForgotPassword() {
    alert(
      "🔐 Recuperação de senha\n\nEm breve você poderá redefinir sua senha por email."
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl">Portal da Igreja</CardTitle>
            <p className="text-sm text-muted-foreground">
              Seja bem-vindo(a). Entre com seus dados.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <Button className="w-full" onClick={handleLogin}>
              Entrar
            </Button>

            <button
              onClick={handleForgotPassword}
              className="w-full text-sm text-muted-foreground hover:underline"
            >
              Esqueci minha senha
            </button>

            <div className="pt-4 text-center text-xs text-muted-foreground">
              Feito com ❤️ por{" "}
              <a
                href="https://instagram.com/ddiegomoraes"
                target="_blank"
                className="hover:underline"
              >
                @ddiegomoraes
              </a>{" "}
              e{" "}
              <a
                href="https://instagram.com/ericmassarioli"
                target="_blank"
                className="hover:underline"
              >
                @ericmassarioli
              </a>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
