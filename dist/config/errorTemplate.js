"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_UNKNOWN = exports.ERROR_DATA_NONE = exports.ERROR_MULTER_IMAGE_NOTFOUND = exports.ERROR_INVALID_MULTER_INPUT = exports.ERROR_PRODUCT_NOTFOUND = exports.ERROR_NOT_OWNER = exports.ERROR_OAUTH_USERID = exports.ERROR_INVALID_ACCESSTOKEN_FORM = exports.ERROR_INVALID_REFRESHTOKEN = exports.ERROR_INVALID_ACCESSTOKEN = exports.ERROR_UNATHORIZED = exports.ERROR_USER_NOTFOUND = exports.ERROR_ALREADY_USED_EMAIL = exports.ERROR_INVALID_LOGIN_FORM = exports.ERROR_INVALID_SIGNUP_FORM = exports.ERROR_INVALID_EMAIL_FORM = void 0;
function CustomError(msg, code) {
    const error = new Error(msg);
    error.code = code;
    return error;
}
exports.ERROR_INVALID_EMAIL_FORM = CustomError("이메일 형식이 올바르지 않습니다.", 400);
exports.ERROR_INVALID_SIGNUP_FORM = CustomError("닉네임, 이메일, 비밀번호 모두 필요합니다.", 400);
exports.ERROR_INVALID_LOGIN_FORM = CustomError("이메일, 비밀번호 모두 필요합니다.", 400);
exports.ERROR_ALREADY_USED_EMAIL = CustomError("이미 사용되고 있는 이메일입니다.", 400);
exports.ERROR_USER_NOTFOUND = CustomError("존재하지 않는 유저입니다.", 400);
exports.ERROR_UNATHORIZED = CustomError("비인가된 유저.", 401);
exports.ERROR_INVALID_ACCESSTOKEN = CustomError("액세스 토큰 권한 없음.", 401);
exports.ERROR_INVALID_REFRESHTOKEN = CustomError("리프레쉬 토큰 권한 없음.", 401);
exports.ERROR_INVALID_ACCESSTOKEN_FORM = CustomError("액세스 토큰 양식 오류.", 400);
exports.ERROR_OAUTH_USERID = CustomError("소셜 로그인 중 유저 정보 오류가 발생했습니다.", 500);
/* 상품, 게시물 */
exports.ERROR_NOT_OWNER = CustomError("해당 게시물의 소유자가 아닙니다. 권한이 없습니다.", 403);
exports.ERROR_PRODUCT_NOTFOUND = CustomError("해당 게시물이 없거나 삭제되었습니다.", 404);
exports.ERROR_INVALID_MULTER_INPUT = CustomError("올바르지 않은 이미지 인풋입니다.", 404);
exports.ERROR_MULTER_IMAGE_NOTFOUND = CustomError("해당 이미지가 없거나 삭제되었습니다.", 404);
exports.ERROR_DATA_NONE = CustomError("데이터 베이스에 특정 필수 데이터가 부재합니다.", 500);
exports.ERROR_UNKNOWN = CustomError("데이터 베이스 작업 중 오류가 발생했습니다.", 500);
//# sourceMappingURL=errorTemplate.js.map