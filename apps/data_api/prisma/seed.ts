import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = "123456";
  var salt = bcrypt.genSaltSync(10);
  const pwd_hash = bcrypt.hashSync(password, salt);
  const admin = await prisma.user.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      password: pwd_hash,
      role: "ADMIN",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
