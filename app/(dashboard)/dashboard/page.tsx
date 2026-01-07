"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  aniversariosDoMes,
  proximosAniversarios,
} from "@/lib/aniversarios";

type Membro = {
  nome: string;
  nascimento: string;
};

export default function DashboardPage() {
  const [membros, setMembros] = useState<Membro[]>([]);

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("membros") || "[]"
    );
    setMembros(dados);
  }, []);

  const aniversariosMes = aniversariosDoMes(membros);
  const proximos = proximosAniversarios(membros);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Cards */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>🎂 Aniversários do mês</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {aniversariosMes.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>👤 Membros cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {membros.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📅 Próximos 7 dias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {proximos.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de aniversariantes do mês */}
      <Card>
        <CardHeader>
          <CardTitle>🎉 Aniversariantes do mês</CardTitle>
        </CardHeader>

        <CardContent>
          {aniversariosMes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum aniversariante este mês.
            </p>
          ) : (
            <ul className="space-y-2">
              {aniversariosMes.map((m, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{m.nome}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(m.nascimento).toLocaleDateString(
                      "pt-BR",
                      { day: "2-digit", month: "long" }
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Próximos aniversários */}
      <Card>
        <CardHeader>
          <CardTitle>⏳ Próximos aniversários</CardTitle>
        </CardHeader>

        <CardContent>
          {proximos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum aniversário nos próximos dias.
            </p>
          ) : (
            <ul className="space-y-2">
              {proximos.map((m, i) => (
                <li
                  key={i}
                  className="flex justify-between border-b pb-1"
                >
                  <span>{m.nome}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(m.nascimento).toLocaleDateString(
                      "pt-BR",
                      { day: "2-digit", month: "long" }
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
