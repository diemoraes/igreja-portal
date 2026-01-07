"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function getChurchId() {
  const match = document.cookie.match(/churchId=([^;]+)/);
  return match ? match[1] : "default";
}


export default function ConfiguracoesPage() {
  const [nome, setNome] = useState("Igreja");
  const [logo, setLogo] = useState<string | null>(null);
  const [primary, setPrimary] = useState("#2563eb"); // azul
  const [secondary, setSecondary] = useState("#16a34a"); // verde

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem(`igreja_${getChurchId()}`) || "{}"
    );

    if (data.nome) setNome(data.nome);
    if (data.logo) setLogo(data.logo);
    if (data.primary) setPrimary(data.primary);
    if (data.secondary) setSecondary(data.secondary);

    applyColors(data.primary || primary, data.secondary || secondary);
  }, []);

  function applyColors(p: string, s: string) {
    document.documentElement.style.setProperty("--primary", hexToHsl(p));
    document.documentElement.style.setProperty("--secondary", hexToHsl(s));
  }

  function handleSave() {
    const data = { nome, logo, primary, secondary };
    localStorage.setItem(
      `igreja_${getChurchId()}`,
      JSON.stringify(data)
    );
    applyColors(primary, secondary);
    alert("Configurações salvas!");
  }

  function handleLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">Configurações da Igreja</h1>

      <Card>
        <CardHeader>
          <CardTitle>Identidade visual</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Nome da igreja"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-sm">Logo</label>
            <Input type="file" accept="image/*" onChange={handleLogo} />

            {logo && (
              <img
                src={logo}
                alt="Logo"
                className="h-20 mt-2 rounded"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Cor primária</label>
              <Input
                type="color"
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Cor secundária</label>
              <Input
                type="color"
                value={secondary}
                onChange={(e) => setSecondary(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Salvar alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* Utilitário HEX → HSL (Tailwind usa HSL) */
function hexToHsl(hex: string) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
