import { User } from "@prisma/client";
import {
  createUserInput,
  ErrorWithCode,
  updateUserInput,
} from "../../config/config";
import {
  ERROR_ALREADY_USED_EMAIL,
  ERROR_DATA_NONE,
  ERROR_UNKNOWN,
  ERROR_USER_NOTFOUND,
} from "../../config/errorTemplate";
import repo from "./auth.repository";
import { hashPassword, verifyPassword } from "./utils/hash";

export async function createUser(user: createUserInput) {
  try {
    const existedUser = await repo.findByEmail(user.email);
    if (existedUser) {
      throw ERROR_ALREADY_USED_EMAIL;
    } //중복되는 이메일이 있으면 에러(이미 존재하는 유저)

    const hashedPassword = await hashPassword(user.password); //해시화
    const createdUser = await repo.save({
      ...user,
      password: hashedPassword,
    });
    return filterSensitiveUserData(createdUser);
  } catch (error) {
    const e = error as ErrorWithCode;
    if (e.code === 400) throw error;
    throw ERROR_UNKNOWN;
  }
}

export async function getUser(email: string, password: string) {
  try {
    const user = await repo.findByEmail(email);
    if (!user) {
      throw ERROR_USER_NOTFOUND;
    }
    if (!user.password) {
      throw ERROR_DATA_NONE;
    }
    await verifyPassword(password, user.password);
    return filterSensitiveUserData(user);
  } catch (error) {
    const e = error as ErrorWithCode;
    if (e.code === 400) throw error;
    throw ERROR_UNKNOWN;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await repo.findById(id);
    if (!user) {
      throw ERROR_USER_NOTFOUND;
    }

    return filterSensitiveUserData(user);
  } catch (error) {
    const e = error as ErrorWithCode;
    if (e.code === 400) throw error;
    throw ERROR_UNKNOWN;
  }
}

export async function updateUser(userId: string, data: updateUserInput) {
  const user = await repo.update(userId, data);
  return filterSensitiveUserData(user);
}

export async function oauthCreateOrUpdate(
  provider: string,
  providerId: string,
  email: string,
  name: string
) {
  const user = await repo.createOrUpdate(provider, providerId, email, name);
  return filterSensitiveUserData(user);
}

function filterSensitiveUserData(user: Partial<User>) {
  const { id, provider, email, name, createdAt } = user;
  return { id, provider, email, name, createdAt };
}
