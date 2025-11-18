import { UserPasswordBuilder } from '../../src/auth/UserPasswordBuilder';
import { User } from '@prisma/client';

interface userMock {
    email: User['email'],
    password: User['password'],
    nickname: User['nickname'],
    image: User['image'] | null,
}

export const UserMocks: userMock[] = [
    {
        email: 'firstUser@pandamarket.com',
        password: UserPasswordBuilder.hashPassword('password'),
        nickname: 'firstUser',
        image: null,
    },
];
