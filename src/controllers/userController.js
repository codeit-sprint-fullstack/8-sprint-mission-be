import { userRepository } from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRES_IN = '30m';
const ACCESS_TOKEN_MAX_AGE = 30 * 60 * 1000; // 30분

// Access Token 생성 헬퍼 함수
const generateAccessToken = user => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN },
  );
};

// Refresh Token 생성 헬퍼 함수
const generateRefreshToken = userId => {
  return jwt.sign({ id: userId }, JWT_SECRET);
};

// Access Token 쿠키 설정 헬퍼 함수
const setAccessTokenCookie = (res, accessToken) => {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
};

export const userController = {
  // 사용자 등록
  async createUser(req, res) {
    const { email, nickname, password } = req.body;

    // 이메일 중복 체크
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await userRepository.create({
      email,
      nickname,
      password: hashedPassword,
    });
    res.status(201).json(user);
  },

  // 로그인
  async login(req, res) {
    const { email, password } = req.body;

    // 사용자 조회
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 토큰 생성
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    // Access Token 쿠키 설정
    setAccessTokenCookie(res, accessToken);

    // 비밀번호 제외한 사용자 정보 반환
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      refreshToken,
    });
  },

  // 로그아웃
  async logout(req, res) {
    res.clearCookie('accessToken');
    res.json({ message: 'Logout successful' });
  },

  // 토큰 갱신
  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    try {
      // Refresh Token 검증
      const decoded = jwt.verify(refreshToken, JWT_SECRET);

      // 사용자 존재 확인
      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // 새로운 Access Token 생성 및 쿠키 설정
      const newAccessToken = generateAccessToken(user);
      setAccessTokenCookie(res, newAccessToken);

      // 비밀번호 제외한 사용자 정보 반환
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: 'Token refreshed successfully',
        user: userWithoutPassword,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: 'Invalid or expired refresh token' });
    }
  },

  // 사용자 단건 조회
  async getUserById(req, res) {
    const { id } = req.params;
    const user = await userRepository.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  },

  // 사용자 수정
  async updateUser(req, res) {
    const { id } = req.params;
    const { email, nickname } = req.body;

    // 이메일 변경 시 중복 체크
    if (email) {
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    const user = await userRepository.update(id, { email, nickname });
    res.json(user);
  },

  // 사용자 삭제 (soft delete)
  async deleteUser(req, res) {
    const { id } = req.params;
    await userRepository.delete(id);
    res.sendStatus(204);
  },
};
