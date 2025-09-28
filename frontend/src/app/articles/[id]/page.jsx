"use client"

//라이브러리
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getArticle, deleteArticle, getComments, createComment, updateComment, deleteComment } from '@/api/ArticleSevice';

//컴포넌트
import MainFrame from '@/components/organism/mainFrame';
import { DropdownList } from '@/components/molecules/Dropdown/Dropdown';

//이미지
import Image from 'next/image';
import moreImg from './ic_more.svg';
import userPanda from '@/images/userPanda.svg';
import heartIcon from './ic_heart.svg';
import noComment from './ic_noComment.svg';
import backIcon from './ic_back.svg';

//스타일
import styles from './articlePage.module.css';
import InputForm from '@/components/molecules/Articles/InputForm/InputForm';
import Button from '@/components/Atoms/Button';
import useAsync from '@/hooks/useAsync';

const notebook = '/images/articles/notebook.png';

function CommentList({list, handlePatch, handleDelete}) {
    const [ editId, setEditId ] = useState('');
    const [ commentEdit, setCommentEdit ] = useState('');

    return (
        <ul className={styles.commentList}>
            {list.map(comment=><li key={comment.id}>
                {editId===comment.id 
                ? <div>
                    <textarea 
                        className={styles.editCommentInput} 
                        value={commentEdit} 
                        onChange={(e)=>{setCommentEdit(e.target.value)}} 
                        rows={3}
                    />
                    <div className={styles.editInfoDiv}>
                        <div className={styles.commentInfoDiv}>
                            <Image src={userPanda} alt='profile' className={styles.commentUserProfile}></Image>
                            <div className={styles.editBtnDiv}>
                                <p className={styles.commentuserName}>{comment.userName}</p>
                                <p className={styles.commentDate}>{comment.createdAt}</p>
                            </div>
                        </div>
                        <button 
                            className={styles.cancle} 
                            onClick={()=>{
                                setCommentEdit(''); 
                                setEditId('');
                        }}>취소</button>
                        <Button 
                            className={styles.edit} 
                            onClick={()=>{
                                handlePatch(comment.id, commentEdit); 
                                setEditId('');
                        }}>수정 완료</Button>
                    </div>
                </div>
                : <div className={styles.comment}>
                    <div className={styles.commentContentDiv}>
                        <p>{comment.content}</p>
                        <DropdownList list={[
                            {
                                name: '수정하기',
                                onClick: () => {
                                    setCommentEdit(comment.content); 
                                    setEditId(comment.id);
                                }
                            },
                            {
                                name: '삭제하기',
                                onClick: () => {handleDelete(comment.id)}
                            }
                        ]}>
                            <Image src={moreImg} alt="more_button_icon"/>
                        </DropdownList>
                    </div>
                    <div className={styles.commentInfoDiv}>
                        <Image src={userPanda} alt='profile' className={styles.commentUserProfile}></Image>
                        <div>
                            <p className={styles.commentuserName}>{comment.userName}</p>
                            <p className={styles.commentDate}>{comment.createdAt}</p>
                        </div>
                    </div>
                    <div className={styles.dividerH}></div>
                </div>
                }
            </li>)}
        </ul>
    )
}

export default function ArticlePage({}){
    const router = useRouter();

    const { id } = useParams();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        createdAt: '',
        userName: '',
        favoriteCount: 0
    });
    const [commentInput, setCommnetInput] = useState('');
    const [comments, setCommnets] = useState([]);

    const [isLoading, error, write] = useAsync(createComment);

    useEffect(()=>{
        const handleLoad = async() => {
            setArticle(await getArticle(id));
            setCommnets(await getComments(id));
        }
        handleLoad();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(commentInput.length > 0 && !isLoading){
            const body = {
                content: commentInput,
                userName: "댓글판다"
            }
            const res = await write(id, body);
            console.log(res);
            setCommnets([res, ...comments]);
            setCommnetInput('');
        }
    }

    const handleDeleteArticle = () => {
        deleteArticle(id);
        router.push('/articles');
    }

    const handlePatchComment = async(commentId, content) => {
        const body = {
            content: content
        }
        const res = await updateComment(commentId, body);
        setCommnets(comments.map(e=>{return e.id===commentId ? {...e, content} : e}));
    }

    const handleDeleteComment = async(commentId) => {
        await deleteComment(commentId);
        setCommnets(comments.filter(e=>e.id!==commentId));
    }

    return(
        <MainFrame>
            <div className={styles.frame}>
                <div className={styles.headline}>
                    <div className={styles.titleDiv}>
                        <p className={styles.title}>{article.title}</p>   
                        <DropdownList list={[
                            {
                                name: '수정하기',
                                onClick: () => {router.push(`/articles/${id}/edit`)}
                            }, 
                            {
                                name: '삭제하기',
                                onClick: () => {handleDeleteArticle();}
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
                                <p className={styles.date}>{article.createdAt}</p>
                            </div>
                        </div>
                        <div className={styles.dividerV}></div>
                        <div className={styles.favoriteDiv}>
                            <Image src={heartIcon} alt='favoriteIcon' className={styles.heartIcon}/>
                            <p className={styles.favoriteCntText}>{article.favoriteCount}</p>
                        </div>
                    </div>
                    <div className={styles.dividerH}></div>
                </div>
                <div className={styles.content}>
                    <p>{article.content}</p>
                </div>
                <form className={styles.commnetForm} onSubmit={handleSubmit}>
                    <InputForm
                        label='댓글달기'
                        placeholder='댓글을 입력해주세요.'
                        rows={3}
                        value={commentInput}
                        onChange={(e)=>setCommnetInput(e.target.value)}
                    />       
                    <div className={styles.buttonDiv}>
                        <Button 
                            className={styles.button} 
                            disabled={commentInput.length <= 0 || isLoading}
                        >
                            {isLoading ? "등록 중.." : "등록"}
                        </Button> 
                    </div>
                </form>
                {comments.length > 0 
                    ? <CommentList list={comments} handlePatch={handlePatchComment} handleDelete={handleDeleteComment}/>
                    : <div className={styles.noComment}>
                        <Image src={noComment} alt="no_comment" className={styles.noCommentImg}/>
                        <p>아직 댓글이 없어요.<br/>지금 댓글을 달아보세요!</p>
                    </div>
                }
                <div className={styles.backButtonDiv}>
                    <Button to='/articles' className={styles.backButton}>
                        <p>목록으로 돌아가기</p>
                        <Image src={backIcon} alt='back_button'/>
                    </Button>
                </div>
            </div>
        </MainFrame>
    )
}