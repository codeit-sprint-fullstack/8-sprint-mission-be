import { registerUser, loginUser, refreshAccessTokenService, } from "../services/authService";
// 회원가입
export const register = async (req, res) => {
    try {
        const { email, nickname, password } = req.body;
        const user = await registerUser({ email, nickname, password });
        res.status(201).json({ message: "회원가입 완료", user });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
// 로그인
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, accessToken } = await loginUser({ email, password });
        res.status(200).json({ message: "로그인 성공", accessToken, user });
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
// 토큰
export const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken || null;
        if (!refreshToken)
            return res.status(400).json({ message: "리프레시 토큰이 없습니다." });
        const { accessToken } = await refreshAccessTokenService(refreshToken);
        return res.status(200).json({ accessToken });
    }
    catch (error) {
        return res
            .status(401)
            .json({ message: error.message || "토큰 갱신에 실패했습니다." });
    }
};
