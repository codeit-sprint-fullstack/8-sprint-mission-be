"use client"

import { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext.js';

import HomeHeader from "../components/HomeHeader.jsx";
import HomeFooter from "../components/HomeFooter.jsx";
import Banner from '../components/molecules/Home/Banner.jsx';

import topBannerImg from "../../public/images/home/hero-image.png";
import bottomBannerImg from "../../public/images/home/bottom-banner-image.png";
import Features from '../components/molecules/Home/Features.jsx';

export default function Home() {

    const deviceType = useContext(LocaleContext);
    
    return (
        <>
            <HomeHeader isHome={true}/>
            <main className="with-header">
                <Banner 
                    bgImg={topBannerImg}
                    btnUrl="/items"
                    btnText="구경해보기"
                >
                    <h1>
                        일상의 모든 물건을 {deviceType==='mobile' && <br/>}
                        거래해 보세요
                    </h1>
                </Banner>   
                <Features/>
                <Banner 
                    bgImg={bottomBannerImg}
                >
                    <h1>
                        믿을 수 있는<br/>
                        판다마켓 중고거래
                    </h1>
                </Banner>   
            </main> 
            <HomeFooter />
        </>
    );
}