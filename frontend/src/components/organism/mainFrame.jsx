import HomeFooter from "../molecules/Footer/HomeFooter";
import HomeHeader from "../molecules/Header/HomeHeader";

import styles from './mainFrame.module.css';

export default function MainFrame({isHaveNav=true, children}){
    return (
        <div className={styles.page}>
            <HomeHeader isHome={isHaveNav}/>
                <main className={styles.withHeader}>  
                    {children}
                </main> 
            <HomeFooter/>
        </div>
    )
}