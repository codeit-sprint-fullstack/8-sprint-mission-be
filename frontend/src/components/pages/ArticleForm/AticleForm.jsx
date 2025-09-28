"use client"
import Link from 'next/link';

import MainFrame from '../../organism/mainFrame';
import Button from '../../Atoms/Button';
import useArticle from '@/hooks/useArticle';
import InputForm from '../../molecules/Articles/InputForm/InputForm';

import styles from './ArticleForm.module.css';

export default function ArticleForm({isCreate=true}) {
    //입력값, 유효성 검사, 입력값을 다루는 함수 묶어서 커스텀 훅으로 만들었습니다.
    //유효성 검사 커스텀 훅(요구사항)은 이 커스텀 훅 안에 있습니다.
    const [
        values, //입력값
        errors, //유효성 메세지
        isSubmitActive, //등록 버튼 활성화 여부
        onChange, //입력폼 onChange
        register
    ] = useArticle();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSubmitActive) {
            if(isCreate) {register(values);}
            else{}
        }
    }

    //이번에 배운 사실: 리액트 JSX는 객체를 {}표현식에 넣어도 그대로 출력할 수 없다.
    return (
        <MainFrame>
            <form className={styles.wrapper} onSubmit={handleSubmit}>
                <div className={styles.headline}>
                    <h1>게시글 쓰기</h1>
                    <Button className={styles.button} disabled={!isSubmitActive}>
                        등록
                    </Button>
                </div>
                <div className={styles.inputDiv}>
                    <InputForm
                        label="제목"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                        placeholder="제목을 입력해 주세요."
                        rows={1}
                        validErrorMsg={errors.title}
                    />
                    <InputForm
                        label="내용"
                        name="content"
                        value={values.content}
                        onChange={onChange}
                        placeholder="내용을 입력해 주세요."
                        rows={10}
                        validErrorMsg={errors.content}
                    />
                </div>
            </form>
        </MainFrame>
    );
}
