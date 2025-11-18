/**
 * [에러 메시지 상수]
 *
 * 에러 메시지가 반복적으로 사용되는 경우, 상수로 관리하는 것이 효율적입니다.
 *
 * 여러 장점들:
 * - 오타 방지
 * - 추후 에러메시지 변경에 유리
 * - ...
 */
export const ExceptionMessage = {
    ARTICLE_NOT_FOUND: '게시글을 찾을 수 없습니다',
    PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다',
    COMMENT_NOT_FOUND: '댓글을 찾을 수 없습니다',
    USER_NOT_FOUND: '사용자를 찾을 수 없습니다',
    PASSWORD_CONFIRMATION_NOT_MATCH: '비밀번호 확인이 일치하지 않습니다',
    CURRENT_PASSWORD_NOT_MATCH: '현재 비밀번호가 일치하지 않습니다',
    ALREADY_REGISTERED_EMAIL: '이미 등록된 이메일입니다',
    FORBIDDEN: '접근이 금지되었습니다',
    INVALID_REFRESH_TOKEN: '유효하지 않은 리프레시 토큰입니다',
    GOOGLE_LOGIN_FAILED: '구글 로그인에 실패하였습니다',
};
