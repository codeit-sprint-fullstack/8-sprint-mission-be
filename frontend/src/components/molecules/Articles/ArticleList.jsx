import heartIcon from '/images/items/ic_heart.svg';
import notebook from '/images/articles/notebook.png';
import userPanda from '/images/articles/userPanda.svg';
import bestIcon from '/images/articles/bestIcon.svg';

import article_st from './Article.module.css';
import list_st from './ArticleList.module.css';

function Article({data}){
    const {
        title,
        mainImg,
        userIcon,
        userName,
        uploadDate,
        favoriteCnt,
    } = data

    const mainImgStyle = {
        backgroundImage: `url(${mainImg})`,
        backgroundRepeat: 'no-repeat',  
        backgroundSize: '70%',
        backgroundPosition: 'center',
    } 

    return (
        <div className={article_st.article}>
            <div className={article_st.headline}>
                <p>{title}</p>
                <div className={article_st.mainImg} style={mainImgStyle}></div>
            </div>
            <div className={article_st.detail}>
                <div>
                    <img className={article_st.userIcon} src={userIcon}/>
                    <p className={article_st.username}>{userName}</p>
                    <p className={article_st.date}>{uploadDate}</p>
                </div>
                <div className={article_st.favoriteCnt}>
                    <img src={heartIcon}/>
                    <p>{favoriteCnt > 9999 ? '9999+' : favoriteCnt}</p>
                </div>
            </div>
            <div class={article_st.divider}></div>
        </div>
    );
}

function BestArticle({data}){
    const {
        title,
        mainImg,
        userName,
        uploadDate,
        favoriteCnt,
    } = data

    const mainImgStyle = {
        backgroundImage: `url(${mainImg})`,
        backgroundRepeat: 'no-repeat',  
        backgroundSize: '70%',
        backgroundPosition: 'center',
    } 

    return (
        <div className={article_st.bestArticle}>
            <div className={article_st.titleDiv}>
                <div className={article_st.bestTag}>
                    <img src={bestIcon}/>
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
                        <img src={heartIcon}/>
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
        title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
        mainImg: notebook,
        userIcon: userPanda,
        userName: "총명한 판다",
        uploadDate: "2024. 04. 16",
        favoriteCnt: 0,
    },
    {
        title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
        mainImg: notebook,
        userIcon: userPanda,
        userName: "총명한 판다",
        uploadDate: "2024. 04. 16",
        favoriteCnt: 10000,
    },
    {
        title: "맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?",
        mainImg: notebook,
        userIcon: userPanda,
        userName: "총명한 판다",
        uploadDate: "2024. 04. 16",
        favoriteCnt: 0,
    },
]

export function ArticleList({}){
    return (
        <ul className={ list_st.columList}>
            {mockList.map(data=> <li>
                <Article data={data}/>
            </li>)}
        </ul>
    );
}

export function BestArticleList({}){
    return (
        <ul className={list_st.rowList}>
            {mockList.map(data=> <li>
                <BestArticle data={data}/>
            </li>)}
        </ul>
    );
}