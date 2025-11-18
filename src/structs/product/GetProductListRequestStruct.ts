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
    page: defaulted(
        coerce(min(integer(), 1), string(), (value) => Number.parseInt(value, 10)),
        1
    ),
    pageSize: defaulted(
        coerce(max(min(integer(), 1), 12), string(), (value) =>
            Number.parseInt(value, 10)
        ),
        10
    ),
    orderBy: defaulted(enums(['recent', 'favorite']), 'recent'),
    keyword: optional(nonempty(string())),
});
