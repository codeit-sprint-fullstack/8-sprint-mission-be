import { useContext } from 'react';
import LocaleContext from '../../../contexts/LocaleContext';

const arrowDownIcon = '/images/items/ic_arrow_down.svg';
import styles from './Dropdown.module.css';

export default function Dropdown({ order, onChangeOrder }) {
    const deviceType = useContext(LocaleContext);

    return (
        <div className={styles.dropdown}>
            <select className={styles.select} value={order} name="order" onChange={onChangeOrder}>
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
            </select>
            {deviceType !== 'mobile' && <img className={styles.dropdownIcon} src={arrowDownIcon} />}
        </div>
    );
}
