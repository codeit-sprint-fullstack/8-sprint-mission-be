const arrowDownIcon = '/images/items/ic_arrow_down.svg';
import styles from './Dropdown.module.css';

export default function Dropdown({ order, onChangeOrder }) {
    return (
        <div className={styles.dropdown}>
            <select className={styles.select} value={order} name="order" onChange={onChangeOrder}>
                <option value="recent">최신순</option>
                <option value="favorite">좋아요순</option>
            </select>
            {/* <img className={styles.dropdownIcon} src={arrowDownIcon} /> */}
        </div>
    );
}
