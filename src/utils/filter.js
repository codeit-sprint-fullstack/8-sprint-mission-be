export const filterSensitiveUserData = (user) => {
  if (!user) return null;

  const { encryptedPassword, ...safeUserData } = user;

  return safeUserData;
};
