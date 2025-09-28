import Image from 'next/image';
import heartIcon from '../../../../public/images/items/ic_heart.svg';
import userPanda from '@/images/userPanda.svg';
import bestIcon from './images/bestIcon.svg';

import article_st from './Article.module.css';
import list_st from './ArticleList.module.css';
import Link from 'next/link';

//bg 이미지를 url로 넘기려면, next (ssr)에서는 절대 경로를 사용하는 방법 밖에 없네는 것 같아요.
const notebook = '/images/articles/notebook.png';

function Article({ data }) {
    const { title, userName, createdAt: uploadDate, favoriteCount } = data;
    const mainImg = notebook;
    const userIcon = userPanda;

    //bg 이미지를 url로 넘기려면, next (ssr)에서는 절대 경로를 사용하는 방법 밖에 없네는 것 같아요.
    const mainImgStyle = {
        backgroundImage: `url(${mainImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '70%',
        backgroundPosition: 'center',
    };

    return (
        <div className={article_st.article}>
            <div className={article_st.headline}>
                <p>{title}</p>
                <div className={article_st.mainImg} style={mainImgStyle}></div>
            </div>
            <div className={article_st.detail}>
                <div>
                    <Image className={article_st.userIcon} src={userIcon} alt='userIcon'/>
                    <p className={article_st.username}>{userName}</p>
                    <p className={article_st.date}>{uploadDate}</p>
                </div>
                <div className={article_st.favoriteCnt}>
                    <Image src={heartIcon} alt='heartIcon'/>
                    <p>{favoriteCount > 9999 ? '9999+' : favoriteCount}</p>
                </div>
            </div>
            <div className={article_st.divider}></div>
        </div>
    );
}

function BestArticle({ data }) {
    const { title, userName, createdAt: uploadDate, favoriteCount } = data;

    const mainImg = notebook;

    const mainImgStyle = {
        backgroundImage: `url(${mainImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '70%',
        backgroundPosition: 'center',
    };

    return (
        <div className={article_st.bestArticle}>
            <div className={article_st.titleDiv}>
                <div className={article_st.bestTag}>
                    <Image src={bestIcon} alt='bestIcon'/>
                    <p>Best</p>
                </div>
                <div className={article_st.headline}>
                    <p>{title}</p>
                    <div className={article_st.mainImg} style={mainImgStyle}></div>
                </div>
            </div>
            <div className={article_st.detail}>
                <div>
                    <p className={article_st.userName}>{userName}</p>
                    <div className={article_st.favoriteCnt}>
                        <Image src={heartIcon} alt='heartIcon'/>
                        <p>{favoriteCount > 9999 ? '9999+' : favoriteCount}</p>
                    </div>
                </div>
                <p className={article_st.date}>{uploadDate}</p>
            </div>
        </div>
    );
}

export function ArticleList({list=[]}) {
    return (
        <ul className={list_st.columList}>
            {list.map((data) => (
                <li key={data.id}>
                    <Link href={`/articles/${data.id}`}>
                        <Article data={data} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export function BestArticleList({list=[]}) {
    return (
        <ul className={list_st.rowList}>
            {list.map((data) => (
                <li key={data.id}>
                    <Link href={`/articles/${data.id}`}>
                        <BestArticle data={data} />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
