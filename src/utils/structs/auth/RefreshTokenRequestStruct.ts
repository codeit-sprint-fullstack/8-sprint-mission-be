import { object, nonempty, string } from 'superstruct';

export const RefreshTokenRequestStruct = object({
    refreshToken: nonempty(string()),
});
