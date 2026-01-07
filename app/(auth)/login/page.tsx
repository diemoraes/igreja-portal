"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

function handleLogin() {
  const churchId = "igreja-central"; // depois vira select

  document.cookie = "auth=true; path=/; SameSite=Lax";
  document.cookie = "userName=Diego; path=/; SameSite=Lax";
  document.cookie = `churchId=${churchId}; path=/; SameSite=Lax`;

  router.push("/dashboard");
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">Portal Ekklesia
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Acesse sua conta
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Senha" />

          <Button className="w-full" onClick={handleLogin}>
            Entrar
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            Esqueci minha senha
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4">
            Feito por{" "}
            <a
              href="https://www.linkedin.com/in/diego-moraes-51274371/"
              target="_blank"
              className="hover:underline"
            >
              @ddiegomoraes
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
