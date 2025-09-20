'use client';

import Link from 'next/link';
import Image from 'next/image';

import Button from '../../Atoms/Button';
import logoImg from './logo.svg';
import logoMobileImg from './logo_mobile.svg';
import { deviceStyle } from '../Device/Device';
import styles from './Header.module.css';

function HomeHeader({ isHome = false }) {
    return (
        <header>
            <div>
                <Link href="/">
                    <Image src={logoMobileImg} className={deviceStyle.mobile} alt="판다마켓 로고" width='81px' />
                    <Image src={logoImg}  className={deviceStyle.tablet} alt="판다마켓 로고" width='153px' />
                    <Image src={logoImg}  className={deviceStyle.desktop} alt="판다마켓 로고" width='153px' />
                </Link>
                {/* 랜딩 페이지에서는 네비게이션 목록이 안나오도록 설정 */}

                {isHome && (
                    <div>
                        <Link href="/articles">
                            <p>자유게시판</p>
                        </Link>
                        <Link href="/items">
                            <p>중고마켓</p>
                        </Link>
                    </div>
                )}
            </div>
            <Link href="/">
                <Button className={styles.button}>
                    로그인
                </Button>
            </Link>
        </header>
    );
}

export default HomeHeader;
