import Image from 'next/image';
import feature_1 from './feature1-image.png';
import feature_2 from './feature2-image.png';
import feature_3 from './feature3-image.png';

import styles from './Featrue.module.css';

export default function Features() {

    const featureContents = [
        {
            img: feature_1,
            name: 'Hot items',
            title: <>인기 상품을 <br />확인해 보세요</>,
            description: (
                <>
                    가장 HOT한 중고거래 물품을
                    <br />
                    판다마켓에서 확인해 보세요
                </>
            ),
        },
        {
            img: feature_2,
            name: 'Search',
            title: <>구매를 원하는 <br />상품을 검색하세요</>,
            description: (
                <>
                    구매하고 싶은 물품은 검색해서
                    <br />
                    쉽게 찾아보세요
                </>
            ),
        },
        {
            img: feature_3,
            name: 'Register',
            title: <>판매를 원하는 <br />상품을 등록하세요</>,
            description: (
                <>
                    어떤 물건이든 판매하고 싶은 상품을
                    <br />
                    쉽게 등록하세요
                </>
            ),
        },
    ];

    return (
        <section className={`${styles.features} ${styles.wrapper}`}>
            {featureContents.map((contents) => (
                <Feature key={featureContents.indexOf(contents)} contents={contents} />
            ))}
        </section>
    );
}

function Feature({ contents }) {
    return (
        <div className={styles.feature}>
            <Image src={contents.img} className={styles.img} alt={contents.name} />
            <div className={styles.featureContent}>
                <h2>{contents.name}</h2>
                <h1>{contents.title}</h1>
                <p className={styles.featureDescription}>{contents.description}</p>
            </div>
        </div>
    );
}