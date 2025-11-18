import { nonempty, object, string } from 'superstruct';

export const UpdatePasswordRequestStruct = object({
    password: nonempty(string()),
    passwordConfirmation: nonempty(string()),
    currentPassword: nonempty(string()),
});
