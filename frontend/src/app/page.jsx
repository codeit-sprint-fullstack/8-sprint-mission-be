'use client';
import HomeHeader from '../components/molecules/Header/HomeHeader.jsx';
import HomeFooter from '../components/molecules/Footer/HomeFooter.jsx';
import Banner from '../components/molecules/Home/Banner/Banner.jsx';

import topBannerImg from '../../public/images/home/hero-image.png';
import bottomBannerImg from '../../public/images/home/bottom-banner-image.png';
import Features from '../components/molecules/Home/Feature/Features.jsx';
import { deviceStyle } from '@/components/molecules/Device/Device.jsx';

export default function Home() {

    return (
        <>
            <HomeHeader isHome={true} />
            <main className="with-header">
                <Banner bgImg={topBannerImg} btnUrl="/items" btnText="구경해보기">
                    <h1>
                        일상의 모든 물건을 <br className={deviceStyle.notTablet}/>
                        거래해 보세요
                    </h1>
                </Banner>
                <Features />
                <Banner bgImg={bottomBannerImg}>
                    <h1>
                        믿을 수 있는
                        <br />
                        판다마켓 중고거래
                    </h1>
                </Banner>
            </main>
            <HomeFooter />
        </>
    );
}
