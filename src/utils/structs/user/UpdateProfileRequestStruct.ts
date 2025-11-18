import { nullable, object, string } from 'superstruct';

export const UpdateProfileRequestStruct = object({
    image: nullable(string()),
});
