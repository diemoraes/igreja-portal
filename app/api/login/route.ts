import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Dados inválidos" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findFirst({
    where: { email },
    include: { church: true },
  });

  if (!user || user.password !== password) {
    return NextResponse.json(
      { error: "Email ou senha inválidos" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    id: user.id,
    name: user.name,
    churchId: user.churchId,
    churchName: user.church.name,
  });

  // Cookies de autenticação
  response.cookies.set("auth", "true", { path: "/" });
  response.cookies.set("userName", user.name, { path: "/" });
  response.cookies.set("churchId", user.churchId, { path: "/" });

  return response;
}
