import { useState, useEffect } from 'react';

import HomeHeader from '../components/HomeHeader.jsx';
import HomeFooter from '../components/HomeFooter.jsx';

function NotFound() {
    const [deviceType, setDeviceType] = useState(getDeviceType(window.innerWidth));

    // 창 크기에 따라 deviceType 계산
    function getDeviceType(width) {
        if (width >= 1200) return 'desktop';
        if (width >= 744) return 'tablet';
        return 'mobile';
    }

    // 창 크기 변경 감지
    useEffect(() => {
        const handleResize = () => {
            const newType = getDeviceType(window.innerWidth);
            setDeviceType((prev) => (prev !== newType ? newType : prev));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const style = {
        width: '100%',
        height: '600px',
        fontSize: '20px',
        textAlign: 'center',
    };

    return (
        <>
            <HomeHeader />
            <main className="with-header">
                <p style={style}> 해당 페이지는 없는 페이지입니다. </p>
            </main>
            <HomeFooter />
        </>
    );
}

export default NotFound;
