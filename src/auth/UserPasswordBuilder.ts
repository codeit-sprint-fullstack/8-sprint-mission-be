import crypto from 'crypto';

export class UserPasswordBuilder {
    /**
     * 보안상의 이유로 사용자 비밀번호를 해싱합니다.
     */
    static hashPassword(password: string): string {
        return crypto.createHash('sha512').update(password).digest('base64');
    }
}
