'use client';

import Link from 'next/link';

function Banner({ bgImg, btnUrl = '', btnText = '', children }) {
    const style = {
        backgroundImage: `url(${bgImg})`,
    };

    return (
        <section style={style} className="banner">
            <div className="wrapper">
                {children}
                {btnUrl && (
                    <Link href={btnUrl}>
                        <button className="button pill-button">{btnText}</button>
                    </Link>
                )}
            </div>
        </section>
    );
}

export default Banner;
