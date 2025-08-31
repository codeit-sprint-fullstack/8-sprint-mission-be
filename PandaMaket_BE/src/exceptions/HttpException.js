/**
 * [일관성있는 에러처리를 위한 HttpException 클래스]
 *
 * 해당 서버에서 발생하는 모든 에러는 HttpException 으로 변환되어 응답되어야 합니다.
 * 자세한 내용은 아래 코드를 참고하세요.
 *
 * @see asyncErrorHandler
 */
export class HttpException extends Error {
    status;
    name;

    constructor(param) {
        const { status, name, message } = param;
        super(message);
        this.status = status;
        this.name = name;
    }
}
