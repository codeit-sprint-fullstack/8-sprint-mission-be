"use client"

import { useState, useEffect } from 'react';
import useAsync from '../../hooks/useAsync.jsx';

import HomeHeader from '../../components/molecules/Header/HomeHeader.jsx';
import HomeFooter from '../../components/molecules/Footer/HomeFooter.jsx';
import Headline from '../../components/molecules/Headline/Headline.jsx';

import productApi from '../../api/ProductService.js';
import { ArticleList, BestArticleList } from '../../components/molecules/Articles/ArticleList.jsx';

import styles from './ArticlePage.module.css';
import { useProvider } from '@/components/Provider/Provider.jsx';
import ArticleHeadline from '@/components/molecules/Headline/ArticleHeadline.jsx';

export default function Articles() {
    const [bestArticles, setBestArticles] = useState([]);
    const [commonArticles, setCommonArticles] = useState([]);

    //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
    const [isLoading, loadingError, getItemsAsync] = useAsync(productApi.getProductList);
    const [pageIdx, setPageIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [search, setSearch] = useState('');

    const deviceType = useProvider();

    //화면 크기에 따라 다시 상품 목록을 받아옵니다.
    //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
    useEffect(() => {
        handleBestProductLoad();
    }, []);

    useEffect(() => {
        handleCommonProductLoad(deviceType, pageIdx, order, search);
    }, [deviceType, pageIdx, order, search]);

    const handleBestProductLoad = async () => {
        const res1 = await productApi.getProductList(1, 4, 'favorite');
        setBestArticles(res1);
    };

    const handleCommonProductLoad = async (deviceType, pageIdx, order, search) => {
        const setPageSize = {
            mobile: 4,
            tablet: 6,
            desktop: 10,
        };
        //페이지 로딩이 끝날 때까지 페이지 이동이 안되도록 막았습니다.
        const res = await getItemsAsync(pageIdx, setPageSize[deviceType], order, search);
        if (!res) return;
        setCommonArticles(res);
    };

    const handlePagechange = (idx) => {
        setPageIdx(idx);
    };

    const handleDropdown = (e) => {
        setOrder(e.target.value);
    };

    const handleSearchInput = (e) => {
        setSearch(e.target.value);
    };

    return (
        <>
            <HomeHeader isHome={true}/>
            <main className={'with-header ' + styles.main}>
                <div className={styles.wrapper}>
                    <section className={`${styles.section} ${styles.best}`}>
                        <Headline title="베스트 게시글" />
                        <BestArticleList />
                        {/* <ProductList items={bestProducts}/> */}
                    </section>

                    <section className={`${styles.section} ${styles.common}`}>
                        <ArticleHeadline
                            title="게시글"
                            registerName="글쓰기"
                            registerUrl="/articles/upload"
                            order={order}
                            onChangeOrder={handleDropdown}
                            search={search}
                            onChangeSearch={handleSearchInput}
                        />
                        <ArticleList />
                        {loadingError?.massege && <div>{loadingError.message}</div>}
                    </section>
                </div>
            </main>
            <HomeFooter />
        </>
    );
}
