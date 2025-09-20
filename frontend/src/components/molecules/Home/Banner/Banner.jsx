import Link from 'next/link';
import styles from './Banner.module.css';
import Button from '@/components/Atoms/Button';
import Image from 'next/image';

function Banner({ bgImg, btnUrl = '', btnText = '', children }) {
    const style = {
        backgroundImage: `url(${bgImg})`,
    };

    return (
        <section className={styles.banner}>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {children}
                    {btnUrl && (
                        <Link href={btnUrl}>
                            <Button className={styles.button}>{btnText}</Button>
                        </Link>
                    )}
                </div>
                <Image
                    src={bgImg}
                    className={styles.img}
                    alt="배경 이미지"
                />
            </div>
        </section>
    );
}

export default Banner;
