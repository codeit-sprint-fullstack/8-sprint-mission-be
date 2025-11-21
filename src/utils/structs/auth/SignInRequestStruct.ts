import { object, nonempty, string, define } from 'superstruct';
import isEmail from 'is-email';

export const SignInRequestStruct = object({
    email: define('Email', (value): value is string =>
        typeof value === 'string' && isEmail(value)
    ),
    password: nonempty(string()),
});
