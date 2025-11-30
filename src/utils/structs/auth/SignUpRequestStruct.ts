import { coerce, object, nonempty, string, define } from 'superstruct';
import isEmail from 'is-email';

export const SignUpRequestStruct = object({
    email: define('Email', (value): value is string =>
        typeof value === 'string' && isEmail(value)
    ),
    nickname: coerce(nonempty(string()), string(), (value) => value.trim()),
    password: nonempty(string()),
    passwordConfirmation: nonempty(string()),
});
