"use client"

import { useContext } from 'react';
import Link from 'next/link';
import LocaleContext from '../contexts/LocaleContext';
import Image from 'next/image';

import logoImg from '../../public/images/logo/logo.svg';
import logoMobileImg from '../../public/images/logo/logo_mobile.svg';


function HomeHeader({isHome=false}){
    const deviceType = useContext(LocaleContext);

    const logo = deviceType == 'mobile' ? logoMobileImg : logoImg;
    const logoWidth = deviceType == 'mobile' ? '81px' : '153px';


    return (
        <header>
            <div>
                <Link href="/"><Image src={logo} alt="판다마켓 로고" width={logoWidth}/></Link>
                {/* 랜딩 페이지에서는 네비게이션 목록이 안나오도록 설정 */}
                
                {isHome && 
                    <div>
                        <Link href="/articles"><p>자유게시판</p></Link>
                        <Link href="/items"><p>중고마켓</p></Link>
                    </div>
                }
            </div>
            <Link href="/"><button id="loginLink" className="button">로그인</button></Link>
        </header>
    )
}

export default HomeHeader;
