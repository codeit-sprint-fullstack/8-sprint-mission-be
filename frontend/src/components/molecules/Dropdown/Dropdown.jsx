"use client";

import { useState } from 'react';
import styles from './Dropdown.module.css';

export function Dropdown({ order, onChangeOrder }) {
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

export function DropdownList({list=[], children}){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdownBox}>
            <button 
                className={styles.button}
                onClick={()=>setIsOpen(!isOpen)}
            >
                {children}
            </button>
            {isOpen && <div className={styles.listBox}>
                <ul className={styles.list}>
                    {list.map((e=><li className={styles.element} key={list.indexOf(e)}>
                            <button onClick={e.onClick}>{e.name}</button>
                    </li>))}
                </ul>
            </div>}
        </div>
    )
}

export function DropdownSelect({value, list, onChange, children}){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.dropdownBox}>
            <button 
                className={styles.button}
                onClick={()=>setIsOpen(!isOpen)}
            >
                {children}
            </button>
            {isOpen && <div className={styles.listBox}>
                <ul className={styles.list}>
                    {list.map((e=><li className={styles.element}>
                            <button onClick={onChange}>{e}</button>
                    </li>))}
                </ul>
            </div>}
        </div>
    )
}