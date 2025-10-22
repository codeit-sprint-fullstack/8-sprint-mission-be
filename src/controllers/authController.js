import { registerUser, loginUser } from "../services/authService.js";

// 회원가입
export const register = async (req, res) => {
  try {
    const { email, nickname, password } = req.body;

    const user = await registerUser({ email, nickname, password });
    res.status(201).json({ message: "회원가입 완료", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 로그인
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });
    res.status(200).json({ message: "로그인 성공", token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
