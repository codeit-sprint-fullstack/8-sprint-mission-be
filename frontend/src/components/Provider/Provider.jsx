"use client"

import { useState, useEffect, createContext, useContext } from "react";

const Context = createContext();

export function Provider({children}){
    const [deviceType, setDeviceType] = useState('mobile');

    // 창 크기에 따라 deviceType 계산
    function getDeviceType(width) {
        if (width >= 1200) return 'desktop';
        if (width >= 744) return 'tablet';
        return 'mobile';
    }

    // 창 크기 변경 감지
    useEffect(() => {
        const newType = getDeviceType(window.innerWidth);
        setDeviceType((prev) => (prev !== newType ? newType : prev));

        const handleResize = () => {
            const newType = getDeviceType(window.innerWidth);
            setDeviceType((prev) => (prev !== newType ? newType : prev));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Context.Provider value={deviceType}>
            {children}
        </Context.Provider>
    )
}

export function useProvider() {
  return useContext(Context);
}