import { coerce, defaulted, object, string, min, max, integer } from 'superstruct';

export const GetCommentListRequestStruct = object({
    cursor: defaulted(
        coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
        0,
    ),
    limit: defaulted(
        coerce(max(min(integer(), 1), 10), string(), (value) => Number.parseInt(value, 10)),
        10,
    ),
});
