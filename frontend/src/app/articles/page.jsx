"use client"

import { useState, useEffect } from 'react';
import useAsync from '../../hooks/useAsync.jsx';

import Headline from '../../components/molecules/Headline/Headline.jsx';

import { getArticles } from '../../api/ArticleSevice.js';
import { ArticleList, BestArticleList } from '../../components/molecules/Articles/ArticleList.jsx';

import styles from './ArticlePage.module.css';
import { useProvider } from '@/components/Provider/Provider.jsx';
import ArticleHeadline from '@/components/molecules/Headline/ArticleHeadline.jsx';
import MainFrame from '@/components/organism/mainFrame.jsx';

export default function Articles() {
    const [bestArticles, setBestArticles] = useState([]);
    const [commonArticles, setCommonArticles] = useState([]);

    //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
    const [isLoading, loadingError, getItemsAsync] = useAsync(getArticles);
    const [pageIdx, setPageIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [search, setSearch] = useState('');

    const deviceType = useProvider();

    //화면 크기에 따라 다시 상품 목록을 받아옵니다.
    //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
    useEffect(() => {
        handleBestArticleLoad();
    }, []);

    useEffect(() => {   
        handleCommonArticleLoad(deviceType, pageIdx, order, search);
    }, [deviceType, pageIdx, order, search]);

    const handleBestArticleLoad = async () => {
        const res1 = await getArticles(1, 3, 'favorite');
        console.log(res1[1]);
        setBestArticles(res1);
    };

    const handleCommonArticleLoad = async (deviceType, pageIdx, order, search) => {
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
            <MainFrame isHaveNav={true}>
                <div className={styles.wrapper}>
                    <section className={`${styles.section} ${styles.best}`}>
                        <Headline title="베스트 게시글" />
                        <BestArticleList list={bestArticles}/>
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
                        <ArticleList list={commonArticles}/>
                        {loadingError?.massege && <div>{loadingError.message}</div>}
                    </section>
                </div>
            </MainFrame>
        </>
    );
}
