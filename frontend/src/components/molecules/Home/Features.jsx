"use client"

import { useContext } from 'react';
import LocaleContext from '../../../contexts/LocaleContext';

import Image from 'next/image';
const feature_1 = "/images/home/feature1-image.png";
const feature_2 = "/images/home/feature2-image.png";
const feature_3 = "/images/home/feature3-image.png";

function Features(){
    const deviceType = useContext(LocaleContext);

    const featureContents = [
        {
            img: feature_1,
            name : "Hot items",
            title : <>인기 상품을 {deviceType==='desktop' && <br/>}확인해 보세요</>,
            description: <>가장 HOT한 중고거래 물품을<br />판다마켓에서 확인해 보세요</>,
        },
        {
            img: feature_2,
            name : "Search",
            title : <>구매를 원하는 {deviceType==='desktop' && <br/>}상품을 검색하세요</>,
            description: <>구매하고 싶은 물품은 검색해서<br/>쉽게 찾아보세요</>,
        },
        {
            img: feature_3,
            name : "Register",
            title : <>판매를 원하는 {deviceType==='desktop' && <br/>}상품을 등록하세요</>,
            description: <>어떤 물건이든 판매하고 싶은 상품을<br/>쉽게 등록하세요</>,
        }
    ];

    return(
        <section id="features" class="wrapper">
            {featureContents.map((contents)=> <Feature key={featureContents.indexOf(contents)} contents={contents}/>)}
        </section>
    )
}

function Feature({contents}){
    return (
        <div class="feature">
            <Image src={contents.img} alt={contents.name} />
            <div class="feature-content">
                <h2>{contents.name}</h2>
                <h1>
                {contents.title}
                </h1>
                <p class="feature-description">
                {contents.description}
                </p>
            </div>
        </div>
    );
}

export default Features;