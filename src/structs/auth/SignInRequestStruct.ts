import { object, nonempty, string, define } from 'superstruct';
import isEmail from 'is-email';

export const SignInRequestStruct = object({
    email: define('Email', isEmail),
    password: nonempty(string()),
});
