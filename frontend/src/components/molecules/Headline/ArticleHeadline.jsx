import Link from 'next/link';

const searchIcon = '/images/items/ic_search.svg';

import styles from './Headline.module.css';
import { Dropdown } from '../Dropdown/Dropdown.jsx';
import Button from '@/components/Atoms/Button';

export default function ArticleHeadline({
    title = '',
    registerName = '',
    registerUrl = '',
    order = '',
    onChangeOrder = null,
    search = '',
    onChangeSearch = null,
}) {

    return (
        <div className={`${styles.headline} ${styles.columDiv}`}>
            <div className={`${styles.title} ${styles.div} ${styles.between}`}>
                <p>{title}</p>
                <Link href={registerUrl}>
                    <Button className={styles.button}>{registerName}</Button>    
                </Link>
            </div>
            <div className={`${styles.div} ${styles.wide}`}>
                <div className={styles.searchBoxWide}>
                    <img className={styles.searchIcon} src={searchIcon} />
                    <input
                        className={styles.searchInput}
                        name="search-input"
                        placeholder="검색할 게시글을 입력해주세요"
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                <Dropdown order={order} onChangeOrder={onChangeOrder} />
            </div>
        </div>
    );
}