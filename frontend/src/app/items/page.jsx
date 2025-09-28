'use client';

import { useState, useEffect } from 'react';
import useAsync from '../../hooks/useAsync.jsx';

import MainFrame from '@/components/organism/mainFrame.jsx';
import Headline from '../../components/molecules/Headline/Headline.jsx';
import ProductList from '../../components/molecules/Items/ProductList.jsx';
import PageButton from '../../components/molecules/Items/PageButton.jsx';

import productApi from '../../api/ProductService.js';
import { useProvider } from '@/components/Provider/Provider.jsx';

import styles from './Items.module.css';

export default function Items() {
    const [bestProducts, setBestProducts] = useState([]);
    const [commonProducts, setCommonProducts] = useState([]);

    //삼화 미션 - 커스텀 훅 만들기 (GET 리퀘스트 오류, 지연 처리 훅)
    const [isLoading, loadingError, getItemsAsync] = useAsync(productApi.getProductList);
    const [pageIdx, setPageIdx] = useState(1);
    const [order, setOrder] = useState('recent');
    const [search, setSearch] = useState('');

    const deviceType = useProvider();

    //화면 크기에 따라 다시 상품 목록을 받아옵니다.
    //목록 배열 스타일은 이번에는 CSS에서 관리하는 걸로 했습니다.
    useEffect(() => {
        handleCommonProductLoad(deviceType, pageIdx, order, search);
    }, [deviceType, pageIdx, order, search]);

    const handleBestProductLoad = async () => {
        const res1 = await productApi.getProductList(1, 4, 'favorite');
        setBestProducts(res1);
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
        setCommonProducts(res);
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
        <MainFrame isHaveNav={true}>
            <div className={styles.wrapper}>
                {/* 베스트 상품 표시를 임시로 막았습니다. - 요구사항 */}
                {false && (
                    <section>
                        <div className="">
                            <p>베스트 상품</p>
                        </div>
                        <ProductList items={bestProducts} isCommon={false} />
                    </section>
                )}

                <section>
                    <Headline
                        title="판매 중인 상품"
                        registerName="상품 등록하기"
                        registerUrl="/registration"
                        order={order}
                        onChangeOrder={handleDropdown}
                        search={search}
                        onChangeSearch={handleSearchInput}
                    />
                    {loadingError?.massege && <div>{loadingError.message}</div>}
                    <ProductList items={commonProducts} isCommon={true}/>
                    <PageButton
                        pageIdx={pageIdx}
                        onPageChange={handlePagechange}
                        disabled={isLoading}
                    />
                </section>
            </div>
        </MainFrame>
    );
}
