import Image from 'next/image';
import heartIcon from '../../../../public/images/items/ic_heart.svg';
import userPanda from '@/images/userPanda.svg';
import bestIcon from './images/bestIcon.svg';

import article_st from './Article.module.css';
import list_st from './ArticleList.module.css';

//bg 이미지를 url로 넘기려면, next (ssr)에서는 절대 경로를 사용하는 방법 밖에 없네는 것 같아요.
const notebook = '/images/articles/notebook.png';

function Article({ data }) {
    const { title, mainImg, userIcon, userName, uploadDate, favoriteCnt } = data;

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
                    <p>{favoriteCnt > 9999 ? '9999+' : favoriteCnt}</p>
                </div>
            </div>
            <div className={article_st.divider}></div>
        </div>
    );
}

function BestArticle({ data }) {
    const { title, mainImg, userName, uploadDate, favoriteCnt } = data;

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
                    <p className={article_st.username}>{userName}</p>
                    <div className={article_st.favoriteCnt}>
                        <Image src={heartIcon} alt='heartIcon'/>
                        <p>{favoriteCnt > 9999 ? '9999+' : favoriteCnt}</p>
                    </div>
                </div>
                <p className={article_st.date}>{uploadDate}</p>
            </div>
        </div>
    );
}

const mockList = [
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        favoriteCnt: 0,
    },
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        favoriteCnt: 10000,
    },
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        favoriteCnt: 0,
    },
];

export function ArticleList({}) {
    return (
        <ul className={list_st.columList}>
            {mockList.map((data) => (
                <li key={mockList.indexOf(data)}>
                    <Article data={data} />
                </li>
            ))}
        </ul>
    );
}

export function BestArticleList({}) {
    return (
        <ul className={list_st.rowList}>
            {mockList.map((data) => (
                <li key={mockList.indexOf(data)}>
                    <BestArticle data={data} />
                </li>
            ))}
        </ul>
    );
}
