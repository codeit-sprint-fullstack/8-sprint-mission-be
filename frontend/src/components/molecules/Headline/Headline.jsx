import { useContext } from 'react';
import Link from 'next/link';
import LocaleContext from '../../../contexts/LocaleContext.js';

const searchIcon = '/images/items/ic_search.svg';

import styles from './Headline.module.css';
import Dropdown from '../Dropdown/Dropdown.jsx';

function Headline({ 
    title = '',
    registerName = '',
    registerUrl = '',
    order = '', 
    onChangeOrder = null, 
    search = '', 
    onChangeSearch = null
}){

    const deviceType = useContext(LocaleContext);
    const isUseRegistBtn = (registerName !== '' && registerUrl!=='');
    const design = title === '게시글' || deviceType=='mobile'
    
    const titleGap = title === '게시글' 
    ? {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    } 
    : {};

    // 1) 디바이스 타입
    // 2) 게시글 or 상품 
    // 3) 타이틀만 사용 / 버튼 검색창도 사용 
    // 구분 디자인 적용
    return (
        <div className={styles.headline + ' ' + (design ? styles.columDiv : styles.rowDiv)}>
            <div className={styles.title} style={titleGap}>
                <p>{title}</p>
                {
                isUseRegistBtn && 
                design && 
                    <Link to={registerUrl} className={'button ' + styles.button}>{registerName}</Link>
                }
            </div>  
            {isUseRegistBtn && 
            <div>
                <div className={design ? styles.searchBoxWide : styles.searchBoxDefault}>
                    <img className={styles.searchIcon} src={searchIcon}/>
                    <input 
                        className={styles.searchInput}
                        name="search-input" 
                        placeholder='검색할 상품을 입력해주세요'
                        value={search}  
                        onChange={onChangeSearch}
                    />
                </div>  
                {!design&& <Link href={registerUrl} className={'button ' + styles.button}>{registerName}</Link>}
                <Dropdown order={order} onChangeOrder={onChangeOrder}/>
            </div>
            }
        </div>
    );
}

export default Headline;