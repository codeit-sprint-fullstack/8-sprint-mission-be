import Link from 'next/link';

const searchIcon = '/images/items/ic_search.svg';

import styles from './Headline.module.css';
import { Dropdown } from '../Dropdown/Dropdown.jsx';
import Button from '@/components/Atoms/Button';

function Headline({
    title = '',
    registerName = '',
    registerUrl = '',
    order = '',
    onChangeOrder = null,
    search = '',
    onChangeSearch = null,
}) {
    const deviceType = 'desktop';
    const isUseRegistBtn = registerName !== '' && registerUrl !== '';
    const design = title === '게시글' || deviceType == 'mobile';

    const titleGap =
        title === '게시글'
            ? {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
              }
            : {};

    // 1) 디바이스 타입
    // 2) 게시글 or 상품
    // 3) 타이틀만 사용 / 버튼 검색창도 사용
    // 구분 디자인 적용
    return (
        <div className={`${styles.headline} ${design ? styles.columDiv : styles.rowDiv}`}>
            <div className={styles.title} style={titleGap}>
                <p>{title}</p>
                {isUseRegistBtn && design && (
                    <Button to={registerUrl} className={styles.button}>{registerName}</Button>
                )}
            </div>
            {isUseRegistBtn && (
            <div className={`${styles.div} ${styles.row}`}>
                <div className={design ? styles.searchBoxWide : styles.searchBoxDefault}>
                    <img className={styles.searchIcon} src={searchIcon} />
                    <input
                        className={styles.searchInput}
                        name="search-input"
                        placeholder="검색할 상품을 입력해주세요"
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                {!design && (
                    <Button to={registerUrl} className={styles.button}>{registerName}</Button>
                )}
                <Dropdown order={order} onChangeOrder={onChangeOrder} />
            </div>
            )}
        </div>
    );
}

export default Headline;
