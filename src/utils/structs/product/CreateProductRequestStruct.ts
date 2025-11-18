import { coerce, object, nonempty, string, min, integer, array } from 'superstruct';

export const CreateProductRequestStruct = object({
    name: coerce(nonempty(string()), string(), (value) => value.trim()),
    description: nonempty(string()),
    price: min(integer(), 0),
    tags: array(nonempty(string())),
    images: array(nonempty(string())),
});
