"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Membro = {
  id: string;
  nome: string;
  nascimento: string;
  telefone?: string;
};

export default function MembrosPage() {
  const [membros, setMembros] = useState<Membro[]>([]);

  useEffect(() => {
    const dados = JSON.parse(
      localStorage.getItem("membros") || "[]"
    );
    const churchId = document.cookie.match(/churchId=([^;]+)/)?.[1];

    const filtrados = dados.filter(
      (m: any) => m.churchId === churchId
    );

    setMembros(filtrados);
  }, []);

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Membros</h1>

        <Link href="/membros/novo">
          <Button>+ Novo membro</Button>
        </Link>
      </div>

      {/* Lista */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de membros</CardTitle>
        </CardHeader>

        <CardContent>
          {membros.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum membro cadastrado.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Nome</th>
                  <th>Nascimento</th>
                  <th>Telefone</th>
                </tr>
              </thead>

              <tbody>
                {membros.map((membro) => (
                  <tr
                    key={membro.id}
                    className="border-b hover:bg-muted/50 transition"
                  >
                    <td className="py-2 font-medium">{membro.nome}</td>
                    <td>
                      {new Date(membro.nascimento).toLocaleDateString("pt-BR")}
                    </td>
                    <td>{membro.telefone || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
