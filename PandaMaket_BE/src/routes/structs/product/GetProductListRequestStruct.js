import {
    coerce,
    optional,
    object,
    integer,
    string,
    min,
    max,
    enums,
    nonempty,
    defaulted,
} from 'superstruct';

export const GetProductListRequestStruct = object({
    skip: defaulted(
        coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
        0,
    ),
    take: defaulted(
        coerce(max(min(integer(), 1), 10), string(), (value) => Number.parseInt(value, 10)),
        10,
    ),
    orderBy: optional(enums(['recent'])),
    word: optional(nonempty(string())),
});
