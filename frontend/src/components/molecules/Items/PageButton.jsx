import { useState } from 'react';
import styles from './PageButton.module.css';
import Image from 'next/image';
import arrowLeft from './arrow_left.svg';
import arrowRight from './arrow_right.svg';

function PageButton({ pageIdx, onPageChange, disabled }) {
    const PageNums = [1, 2, 3, 4, 5];
    const [pageListIdx, setPageListIdx] = useState(0); //페이지 리스트 (1) : 1 ~ 5 페이지, (2) : 6 ~ 10

    const handlePageListChange = (upDown) => {
        switch (upDown) {
            case 'up':
                if (pageListIdx < 20) {
                    const nextPage = pageListIdx + 1;
                    setPageListIdx(nextPage);
                    onPageChange(nextPage * 5 + 1);
                }

                break;
            case 'down':
                if (pageListIdx > 0) {
                    const nextPage = pageListIdx - 1;
                    setPageListIdx(nextPage);
                    onPageChange(nextPage * 5 + 1);
                }
                break;
            default:
                break;
        }
    };

    const handlePageBtn = (e) => {
        onPageChange(e.target.textContent);
    };

    return (
        <div className={styles.pageIndex}>
            <button
                onClick={() => handlePageListChange('down')}
                disabled={disabled}
            >
                <Image src={arrowLeft} alt="pageButtonLeft"/>
            </button>
            {PageNums.map((e) => {
                const pageNum = e + pageListIdx * 5;
                let btnStyle;
                pageNum == pageIdx ? (btnStyle = selectedStyle) : (btnStyle = commonStyle);
                return (
                    <button key={e} style={btnStyle} onClick={handlePageBtn} disabled={disabled}>
                        {pageNum}
                    </button>
                );
            })}
            <button
                onClick={() => handlePageListChange('up')}
                disabled={disabled}
            >
                <Image src={arrowRight} alt="pageButtonRight"/>
            </button>
        </div>
    );
}

const commonStyle = {
    border: '1px solid var(--Cool-Gray-200, #E5E7EB)',
    background: '#FFFFFF',
    /* 글자 속성 */
    color: 'var(--Cool-Gray-500, #6B7280)',
};

const selectedStyle = {
    border: '1px solid var(--Cool-Gray-200, #E5E7EB)',
    background: '#2F80ED',
    /* 글자 속성 */
    color: 'var(--Secondary-100, #F9FAFB)',
};

export default PageButton;
