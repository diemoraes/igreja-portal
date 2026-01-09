import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Buscar ou criar igreja
  let church = await prisma.church.findFirst({
    where: { name: "Ekklesia" },
  });

  if (!church) {
    church = await prisma.church.create({
      data: {
        name: "Ekklesia",
        primaryColor: "#2563eb",
        secondaryColor: "#16a34a",
      },
    });

    console.log("Igreja criada:", church);
  } else {
    console.log("Igreja Ekklesia já existe");
  }

  // 2️⃣ Buscar ou criar usuário admin
  const existingUser = await prisma.user.findFirst({
    where: { email: "admin@ekklesia.com" },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: "Administrador",
        email: "admin@ekklesia.com",
        password: "123456", // depois vamos criptografar
        churchId: church.id,
      },
    });

    console.log("Usuário admin criado");
  } else {
    console.log("Usuário admin já existe");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
