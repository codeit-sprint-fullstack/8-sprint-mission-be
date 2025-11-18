import { coerce, object, nonempty, string, define } from 'superstruct';
import isEmail from 'is-email';

export const SignUpRequestStruct = object({
    email: define('Email', isEmail),
    nickname: coerce(nonempty(string()), string(), (value) => value.trim()),
    password: nonempty(string()),
    passwordConfirmation: nonempty(string()),
});
