"use client"
//라이브러리
import { useRouter } from 'next/navigation';

//컴포넌트
import MainFrame from '@/components/organism/mainFrame';
import { DropdownList } from '@/components/molecules/Dropdown/Dropdown';

//이미지
import Image from 'next/image';
import moreImg from './ic_more.svg';
import userPanda from '@/images/userPanda.svg';
import heartIcon from './ic_heart.svg';
import noComment from './ic_noComment.svg';

//스타일
import styles from './articlePage.module.css';
import InputForm from '@/components/molecules/Articles/InputForm/InputForm';
import Button from '@/components/Atoms/Button';
import { useState } from 'react';

const notebook = '/images/articles/notebook.png';

function Comment(){

}

const mockList = [
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        content: "제곧내",
        favoriteCnt: 0,
    },
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        content: "제곧내",
        favoriteCnt: 10000,
    },
    {
        title: '맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?',
        mainImg: notebook,
        userIcon: userPanda,
        userName: '총명한 판다',
        uploadDate: '2024. 04. 16',
        content: "제곧내",
        favoriteCnt: 0,
    },
];

const commentList = [
    // {   
    //     id: 1,
    //     content: "사용 기간이 어떻게 되시나요?",
    //     userName: '총명한 판다',
    //     uploadDate: '2024. 04. 16',
    // },
    // {
    //     id: 2,
    //     content: "사용 기간이 어떻게 되시나요?",
    //     userName: '총명한 판다',
    //     uploadDate: '2024. 04. 16',
    // },
    // {
    //     id: 3,
    //     content: "사용 기간이 어떻게 되시나요?",
    //     userName: '총명한 판다',
    //     uploadDate: '2024. 04. 16',
    // }
]

function CommentList({list}) {
    return (
        <ul className={styles.commentList}>
            {list.map(comment=><li className={styles.comment} key={comment.id}>
                <div className={styles.commentContentDiv}>
                    <p>{comment.content}</p>
                    <DropdownList list={[
                        {
                            name: '수정하기',
                            onClick: null
                        },
                        {
                            name: '삭제하기',
                            onClick: null
                        }
                    ]}>
                        <Image src={moreImg} alt="more_button_icon"/>
                    </DropdownList>
                </div>
                <div className={styles.commentInfoDiv}>
                    <Image src={userPanda} alt='profile' className={styles.commentUserProfile}></Image>
                    <div>
                        <p className={styles.commentuserName}>{comment.userName}</p>
                        <p className={styles.commentDate}>{comment.uploadDate}</p>
                    </div>
                </div>
                <div className={styles.dividerH}></div>
            </li>)}
        </ul>
    )
}

export default function ArticlePage({id}){
    const article = mockList.find(e=>e.id===id);
    const router = useRouter();

    const [comment, setCommnet] = useState('');

    return(
        <MainFrame>
            <div className={styles.frame}>
                <div className={styles.headline}>
                    <div className={styles.titleDiv}>
                        <p className={styles.title}>{article.title}</p>   
                        <DropdownList list={[
                            {
                                name: '수정하기',
                                onClick: () => {}
                            }, 
                            {
                                name: '삭제하기',
                                onClick: () => {}
                            }
                        ]}>
                            <Image src={moreImg} alt="more_button_icon"/>
                        </DropdownList>             
                    </div>
                    <div className={styles.infoDiv}>
                        <div className={styles.userDiv}>
                            <Image 
                                src={userPanda} 
                                alt='profile_image'
                                className={styles.articleUserProfile}
                            />
                            <div className={styles.userNameDiv}>
                                <p className={styles.userName} >{article.userName}</p>
                                <p className={styles.date}>{article.uploadDate}</p>
                            </div>
                        </div>
                        <div className={styles.dividerV}></div>
                        <div className={styles.favoriteDiv}>
                            <Image src={heartIcon} alt='favoriteIcon' className={styles.heartIcon}/>
                            <p className={styles.favoriteCntText}>{article.favoriteCnt}</p>
                        </div>
                    </div>
                    <div className={styles.dividerH}></div>
                </div>
                <div className={styles.content}>
                    <p>{article.content}</p>
                </div>
                <form className={styles.commnetForm}>
                    <InputForm
                        label='댓글달기'
                        placeholder='댓글을 입력해주세요.'
                        rows={3}
                        value={comment}
                        onChange={(e)=>setCommnet(e.target.value)}
                    />       
                    <div className={styles.buttonDiv}>
                        <Button 
                            className={styles.button} 
                            disabled={comment.length <= 0}
                        >
                            등록
                        </Button> 
                    </div>
                </form>
                {commentList.length > 0 
                    ? <CommentList list={commentList}/>
                    : <div className={styles.noComment}>
                        <Image src={noComment} alt="no_comment" className={styles.noCommentImg}/>
                        <p>아직 댓글이 없어요.<br/>지금 댓글을 달아보세요!</p>
                    </div>
                }

            </div>
        </MainFrame>
    )
}