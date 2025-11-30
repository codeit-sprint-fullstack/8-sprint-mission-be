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

export const GetArticleListRequestStruct = object({
    /**
     * [데이터 전처리 - 기본값 설정]
     *
     * defaulted 메서드는 기본값을 설정하기 위해 사용됩니다.
     *
     * 파라미터로는 (struct, defaultValue) 를 받으며, 아래와 같이 동작합니다.
     * 1. 값이 undefined 인 경우, defaultValue 를 반환합니다.
     * 2. 값이 undefined 가 아닌 경우, struct 에 맞는지 검사합니다. 추가적인 변환이 수행될 수 있습니다.
     *
     * 아래 코드는 cursor 가 undefined 인 경우, 0 을 반환합니다.
     *
     * @see https://docs.superstructjs.org/api-reference/coercions#defaulted
     */
    cursor: defaulted(
        coerce(min(integer(), 0), string(), (value) => Number.parseInt(value, 10)),
        0
    ),
    limit: defaulted(
        coerce(max(min(integer(), 1), 10), string(), (value) =>
            Number.parseInt(value, 10)
        ),
        10
    ),
    orderBy: defaulted(enums(['recent', 'favorite']), 'recent'),
    keyword: optional(nonempty(string())),
});
