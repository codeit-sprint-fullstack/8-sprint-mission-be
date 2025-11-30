import { coerce, nullable, object, nonempty, string } from 'superstruct';

export const CreateArticleRequestStruct = object({
    /**
     * [데이터 전처리 - 데이터 변환]
     *
     * coerce 메서드는 데이터 변환을 같이 수행합니다.
     *
     * 파라미터로 (struct, condition, transformer) 를 받으며, 아래와 같이 동작합니다.
     * 1. condition 에 일치한 경우 transformer 를 실행하여 값을 변환합니다.
     * 2. 변환된 값이 struct 에 맞는지 검사합니다.
     *
     * 아래 코드는 title 의 앞뒤 공백을 제거합니다.
     *
     * @see https://docs.superstructjs.org/api-reference/coercions#custom-coercions
     */
    title: coerce(nonempty(string()), string(), (value) => value.trim()), // 또는 trimmed() 를 사용하여 구현할 수 있습니다.
    content: nonempty(string()),
    image: nullable(string()),
});
