import { userRepository } from '../repositories/userRepository.js';

export const userController = {
  // 사용자 등록
  async createUser(req, res) {
    const { email, nickname, password } = req.body;

    // 이메일 중복 체크
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await userRepository.create({ email, nickname, password });
    res.status(201).json(user);
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

  // 사용자 목록 조회
  async getUsers(req, res) {
    const { page = 1, limit = 10, search = '', sort = 'recent' } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const orderBy = sort === 'recent' ? { createdAt: 'desc' } : { id: 'asc' };

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { nickname: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [total, users] = await Promise.all([
      userRepository.count(where),
      userRepository.findMany({
        where,
        orderBy,
        skip,
        take: Number(limit),
      }),
    ]);

    res.json({ total, users });
  },
};
