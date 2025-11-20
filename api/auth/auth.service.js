import repo from './auth.repository.js';
import { hashPassword, verifyPassword } from './utils/hash.js';

export async function createUser(user) {
  try {
    const existedUser = await repo.findByEmail(user.email);
    if (existedUser) {
      const error = new Error('User already exists');
      error.code = 422;
      error.data = { email: user.email };
      throw error;
    } //중복되는 이메일이 있으면 에러(이미 존재하는 유저)

    const hashedPassword = await hashPassword(user.password); //해시화
    const createdUser = await repo.save({
      ...user,
      password: hashedPassword,
    });
    return filterSensitiveUserData(createdUser);
  } catch (error) {
    if (error.code === 422) throw error; // 기존의 중복 체크 에러는 그대로 전달

    // Prisma 에러를 애플리케이션에 맞는 형식으로 변환
    const customError = new Error('데이터베이스 작업 중 오류가 발생했습니다');
    customError.code = 500;
    throw customError;
  }
}

export async function getUser(email, password) {
  try {
    const user = await repo.findByEmail(email);
    if (!user) {
      const error = new Error('존재하지 않는 이메일입니다.');
      error.code = 401;
      throw error;
    }
    await verifyPassword(password, user.password);
    return filterSensitiveUserData(user);
  } catch (error) {
    if (error.code === 401) throw error;
    const customError = new Error('데이터베이스 작업 중 오류가 발생했습니다');
    customError.code = 500;
    throw customError;
  }
}

export async function getUserById(id) {
  try {
    const user = await repo.findById(id);
    if (!user) {
      const error = new Error('존재하지 않는 유저입니다.');
      error.code = 401;
      throw error;
    }

    return filterSensitiveUserData(user);
  } catch (error) {
    if (error.code === 401) throw error;
    const customError = new Error('데이터베이스 작업 중 오류가 발생했습니다');
    customError.code = 500;
    throw customError;
  }
}

export async function updateUser(userId, data) {
  const user = repo.update(userId, data);
  return filterSensitiveUserData(user);
}

export async function oauthCreateOrUpdate(provider, providerId, email, name) {
  const user = await repo.createOrUpdate(provider, providerId, email, name);
  return filterSensitiveUserData(user);
}

function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}
