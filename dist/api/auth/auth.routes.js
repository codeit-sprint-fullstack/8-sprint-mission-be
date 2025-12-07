"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("./utils/passport"));
const authGuard_1 = require("../../middlewares/authGuard");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
/* 일반 (이메일/패스워드) 회원가입/로그인 ---*/
router.post("/signup", auth_controller_1.signup);
router.post("/login", auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.post("/refresh", authGuard_1.verifyRefreshToken, auth_controller_1.refresh); //리프레쉬 토큰 인증 필요.
router.post("/check", auth_controller_1.check);
/* --- 구글 소셜 로그인(회원가입) --- */
//구글 로그인 페이지로 이동시키는 라우터
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
}) // 구글 인증 미들웨어 - 세션을 사용하지 않도록 명시
);
//로그인 성공시 리디렉션 라우터
router.get("/google/callback", passport_1.default.authenticate("google", { session: false }), // 구글 인증 미들웨어 - 세션을 사용하지 않도록 명시
auth_controller_1.oauthLogin);
//테스트용 엔드포인트
router.get("/test", (req, res) => {
    return res.json({ test: "테스트" });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map