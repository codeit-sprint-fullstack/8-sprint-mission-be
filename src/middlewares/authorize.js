/**
 * 리소스 소유자인지 권한 확인 미들웨어
 * @params getResourceOwnerId - 리소스 소유자 ID 가져오는 함수
 * @returns {Promise<void>}
 * @throws {Error} 인증 실패 시 401 상태 코드와 함께 에러 메시지 반환
 * @throws {Error} 권한 확인 실패 시 403 상태 코드와 함께 에러 메시지 반환
 */
export const authorize = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "인증이 필요합니다.",
        });
      }

      // 리소스 소유자 ID 가져오기
      const resourceOwnerId = await getResourceOwnerId(req);

      // 현재 사용자와 리소스 소유자 비교
      if (req.user.userId !== resourceOwnerId) {
        return res.status(403).json({
          success: false,
          message: "해당 리소스에 대한 권한이 없습니다.",
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: error.message || "권한 확인 중 오류가 발생했습니다.",
      });
    }
  };
};
