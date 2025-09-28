import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({className, to=null, disabled=false, children}){
    return (
        <div >
            { !to && <button 
                className={`${styles.button} ${disabled ? styles.disabled : styles.default} ${className}`}
                disabled={disabled}
            >
                {children}
            </button>}
            { to && <Link href={to} className={`${styles.button} ${disabled ? styles.disabled : styles.default} ${className}`}>
                {children}
            </Link>}
        </div>
    )
}