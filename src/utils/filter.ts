import { User } from '../generated/client';

export type SafeUser = Omit<User, 'encryptedPassword' | 'refreshToken'>;

export const filterSensitiveData = (user: User | null): SafeUser | null => {
  if (!user) return null;

  const { encryptedPassword, ...safeUserData } = user;

  return safeUserData;
};
