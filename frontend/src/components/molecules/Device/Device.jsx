import styles from './Device.module.css';
export const deviceStyle = {
    mobile: styles.mobile, 
    tablet: styles.tablet, 
    desktop: styles.desktop,
    notMobile: styles.notMobile, 
    notTablet: styles.notTablet, 
    notDesktop: styles.notDesktop,
};

export function Mobile({children}){
    return (
        <div className={styles.mobile}>
            {children}
        </div>  
    )
}

export function Tablet({children}){
    return (
        <div className={styles.tablet}>
            {children}
        </div>  
    )
}

export function Desktop({children}){
    return (
        <div className={styles.desktop}>
            {children}
        </div>  
    )
}