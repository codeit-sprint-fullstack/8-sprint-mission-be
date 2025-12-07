import {
  createUserInput,
  updateUserInput,
  userType,
} from "../../config/config";
import prisma from "../../config/db";
import { User } from "@prisma/client";

//유저 테이블 CRUD 함수들.

async function findById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function findByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function save(user: createUserInput) {
  return prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
}

async function update(id: string, data: updateUserInput) {
  return prisma.user.update({
    where: {
      id,
    },
    data: data,
  });
}

async function createOrUpdate(
  provider: string,
  providerId: string,
  email: string,
  name: string
) {
  return prisma.user.upsert({
    where: { provider, providerId },
    update: { email, name },
    create: { provider, providerId, email, name },
  });
}

export default {
  findById,
  findByEmail,
  save,
  update,
  createOrUpdate,
};
