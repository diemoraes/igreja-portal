"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function NovoMembroPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    telefone: "",
    email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.nome || !form.nascimento) {
      alert("Nome e data de nascimento são obrigatórios");
      return;
    }

    const membros = JSON.parse(
      localStorage.getItem("membros") || "[]"
    );

    membros.push({
      id: crypto.randomUUID(),
      ...form,
    });

    localStorage.setItem("membros", JSON.stringify(membros));

    router.push("/membros");
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Novo membro</h1>

        <Link href="/membros">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de membro</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              name="nome"
              placeholder="Nome completo"
              value={form.nome}
              onChange={handleChange}
            />

            <Input
              type="date"
              name="nascimento"
              value={form.nascimento}
              onChange={handleChange}
            />

            <Input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
            />

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <div className="flex justify-end">
              <Button type="submit">
                Salvar membro
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
